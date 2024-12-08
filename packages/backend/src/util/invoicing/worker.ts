import type { Prisma } from '@prisma/client';
import { parentPort, workerData, isMainThread } from 'node:worker_threads';
// @ts-expect-error - The module doesn't have types
import MicroInvoice from 'microinvoice';

if (workerData.isDev) {
  await import('dotenv/config');
}

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
        name: 'Invoice',
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
            label: 'Billed To',
            value: getUserBillingDetails(inputs.order.user)
          }
          // {
          //   label: 'Tax Identifier',
          //   value: '352352342333'
          // }
        ],
        seller: [
          {
            label: 'Bill From',
            value: process.env.BILLING_DETAILS?.split(':') || []
          },
          ...(process.env.BILLING_VAT_NUMBER
            ? [
                {
                  label: 'Tax Identifier',
                  value: process.env.BILLING_VAT_NUMBER
                }
              ]
            : [])
        ],
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
              label: 'Total (without VAT)',
              value: (total_paid / (1 + inputs.vat_rate)).toFixed(2),
              price: true
            },
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
        }
      }
    }
  });

  const targetPath
    = `${workerData.target_path}/${inputs.order.user.email.replace('.', '_')}-${inputs.order.id}.pdf`;

  await pdf.generate(targetPath);
  parentPort?.postMessage({
    success: true,
    order_id: inputs.order.id,
    path: targetPath
  });
});
