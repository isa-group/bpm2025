import type { Prisma } from '@prisma/client';
// @ts-expect-error - workerData is redeclared for types only, but TS doesn't know
import { parentPort, workerData } from 'node:worker_threads';
// @ts-expect-error - The module doesn't have types
import MicroInvoice from 'microinvoice';
import { getInvoicePath } from '../../../util/index.ts';

export interface WorkerData {
  target_path: string;
  header_image?: {
    path: string;
    width: number;
    height: number;
  };
  billing_details: string[];
  billing_vat_number?: string;
  invoice_name?: string;
}

declare const workerData: WorkerData;

type OrderWithRelations = Prisma.orderGetPayload<{
  include: {
    user: true;
    product: true;
    discount_order: {
      include: {
        discount: true;
      };
    };
  };
}>;

export interface Inputs {
  order: OrderWithRelations;
  vat_rate: number;
}

/**
 * Generates the customer billing details in a format suitable for MicroInvoice.
 *
 * @param user
 * @returns - The customer billing details
 */
function getUserBillingDetails(user: OrderWithRelations['user']) {
  return [
    user.name,
    ...(user.institution ? [user.institution] : []),
    user.email,
    user.billing_address
  ];
}

/**
 * Gets an array of invoice parts for the given order.
 */
function getInvoiceParts(order: OrderWithRelations) {
  const discounts = order.discount_order.map(discount => ([
    { value: `Discount - ${discount.discount.name}` },
    { value: ' ' },
    { value: `-${discount.discount.reduction}`, price: true }
  ]));

  return [
    [
      {
        value: order.product.name
      },
      // We need this because the micro-invoice library merges the options passed automatically
      {
        value: ' '
      },
      {
        value: `${order.product.price}`,
        price: true
      }
    ],
    ...discounts
  ];
}

/**
 * Get the total amount paid in the order
 */
function getTotalPaid(order: OrderWithRelations) {
  return order.product.price - order.discount_order.reduce((acc, discount) => acc + discount.discount.reduction, 0);
}

parentPort?.on('message', async (inputs: Inputs) => {
  try {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const total_paid = getTotalPaid(inputs.order);

    const pdf = new MicroInvoice({
      ...(workerData.header_image
        ? {
            style: {
              header: {
                image: workerData.header_image
              }
            }
          }
        : {}),
      data: {
        invoice: {
          name: workerData.invoice_name ?? 'Invoice',
          header: [{
            label: 'Order number',
            value: inputs.order.id
          }, {
            label: 'Status',
            value: inputs.order.paid ? 'Paid' : 'Unpaid'
          }, {
            label: 'Date',
            value: `${day}/${month}/${year} ${hours}:${minutes}`
          }],
          currency: 'EUR',
          customer: [
            {
              label: 'Billed to',
              value: getUserBillingDetails(inputs.order.user)
            }
          // {
          //   label: 'Tax Identifier',
          //   value: '352352342333'
          // }
          ],
          ...(workerData.billing_details.length > 0 && workerData.billing_vat_number
            ? {
                seller: [
                  {
                    label: 'Bill From',
                    value: workerData.billing_details
                  },
                  {
                    label: 'Tax Identifier',
                    value: workerData.billing_vat_number
                  }
                ]
              }
            : {}),
          // legal: [{
          //   value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          //   weight: 'bold',
          //   color: 'primary'
          // }, {
          //   value: 'sed do eiusmod tempor incididunt ut labore et dolore magna.',
          //   weight: 'bold',
          //   color: 'secondary'
          // }],
          details: {
            header: [
              {
                value: 'Description'
              },
              // We need this because the micro-invoice library merges the options passed automatically
              {
                value: ' '
              },
              {
                value: 'Subtotal'
              }
            ],
            parts: getInvoiceParts(inputs.order),
            total: [
              {
                label: inputs.vat_rate > 0 ? 'Total (without VAT)' : 'Total paid',
                value: (total_paid / (1 + inputs.vat_rate)).toFixed(2),
                price: true
              },
              ...(inputs.vat_rate > 0
                ? [
                    {
                      label: 'VAT Rate',
                      value: `${(inputs.vat_rate * 100).toFixed(0)}%`
                    },
                    {
                      label: 'VAT Paid',
                      value: (total_paid - (total_paid / (1 + inputs.vat_rate))).toFixed(2),
                      price: true
                    },
                    {
                      label: 'Total paid (with VAT)',
                      value: total_paid.toFixed(2),
                      price: true
                    }
                  ]
                : [])
            ]
          }
        }
      }
    });

    /**
     * The library we use merges the default options automatically, so no matter what we
     * do they will be appended when they're merged. We forcefully overwrite this
     */
    if (!(workerData.billing_details.length > 0 && workerData.billing_vat_number)) {
      pdf.options.data.invoice.seller = [];
    }

    const targetPath = getInvoicePath(workerData.target_path, inputs.order.user.email, inputs.order.id);

    await pdf.generate(targetPath);
    parentPort?.postMessage({
      success: true,
      order_id: inputs.order.id,
      path: targetPath
    });
  } catch (e) {
    console.error(e);
    parentPort?.postMessage({
      success: false,
      order_id: inputs.order.id,
      error: e
    });
  }
});
