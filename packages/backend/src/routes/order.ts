import { defineEventHandler, readBody } from 'h3';
import { db } from '../util/db.ts';
import { validateOrderBody } from '@bpm2025-website/shared/validation/data';
import { logger } from '../util/logger.ts';
import { invoices_folder, router } from '../app.ts';
import { generateOrderId, getBaseMerchantParameters, getTPVOperationData } from '../redsys.ts';
import type { TPVOperation } from '@bpm2025-website/shared';
import { generateTableMarkup } from '../util/listing.ts';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { getInvoicePath } from '../util';
import type { full_order_details } from '@prisma/client';
import { createOrderAndDiscounts } from '../util/hooks/pre.ts';

/**
 * Gets a form data object from the event body for creating an
 * order
 */
router.post(
  '/order',
  defineEventHandler(async (event): Promise<Response | TPVOperation> => {
    const body = await readBody(event);

    if (validateOrderBody(body)) {
      body.email = body.email.toLowerCase();

      const [user, product] = await db.$transaction([
        db.user.findUnique({
          where: {
            email: body.email
          }, select: {
            id: true,
            name: true
          }
        }),
        db.product.findUnique({
          where: {
            id: body.product_id
          },
          select: {
            id: true
          }
        })
      ]);

      if (!user || !product) {
        return new Response(null, { status: 404 });
      }

      const order_paid = await db.order.findFirst({
        where: {
          user_id: user.id,
          paid: { not: null },
          product_id: body.product_id
        },
        select: {
          id: true
        }
      });

      if (order_paid) {
        return new Response(null, { status: 409 });
      }

      const order_id = generateOrderId();

      await createOrderAndDiscounts(
        {
          id: order_id,
          user_id: user.id,
          product_id: body.product_id,
          notes: body.country ? `COUNTRY: ${body.country}${body.notes ? `\n\n${body.notes}` : ''}` : body.notes
        },
        body
      );
      logger.info(`Order created: ${order_id}`);

      const final_order = await db.full_order_details.findUniqueOrThrow({
        where: { order_ID: order_id },
        select: {
          price_paid_with_discounts: true,
          applied_discounts: true,
          product_name: true
        }
      });
      const merchant_params = getBaseMerchantParameters({
        amount: final_order.price_paid_with_discounts,
        name: user.name,
        productName: `${final_order.product_name}${final_order.applied_discounts ? ` (${final_order.applied_discounts})` : ''}`,
        orderId: order_id
      });

      return {
        ...getTPVOperationData(merchant_params),
        price: final_order.price_paid_with_discounts
      };
    } else {
      return new Response(null, { status: 400 });
    }
  })
);

function createOrderPage(
  orders: full_order_details[],
  name: string,
  description?: string
) {
  const colors: Record<number, string> = {};
  const rows: Record<string, unknown>[] = [];

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const email = encodeURIComponent(order.user_email);
    const order_id = encodeURIComponent(order.order_ID);

    switch (order.paid) {
      case 'REDSYS':
        colors[i] = 'aquamarine';
        break;
      case 'TRANSFER':
        colors[i] = 'dodgerblue';
        break;
    }

    rows.push({
      ...order,
      'Recibo': order.paid ? `<a href="/order/show/download/${email}/${order_id}">Descargar</a>` : undefined,
      'Marcar como pagado':
          !order.paid
            ? `
              <form action="/payment/manual/${order_id}" onsubmit="event.preventDefault(); fetch(this.action, { method: 'POST' }).then(() => location.reload());">
                <button type="submit">Marcar</button>
              </form>
            `
            : undefined
    });
  }

  return new Response(
    generateTableMarkup({
      name,
      description,
      rows,
      colors
    }),
    {
      headers: {
        'Content-Type': 'text/html'
      }
    }
  );
}

/**
 * Lists all the orders that have been made as a basic HTML page
 *
 * THIS ROUTE DOESN'T HAVE ANY AUTHENTICATION/AUTHORIZATION AS IMPLEMENTED HERE,
 * HENCE IS PROBABLY NOT SECURE TO EXPOSE AS IS TO PRODUCTION.
 *
 * YOU MUST PROTECT THIS WITH A REVERSE PROXY!!!
 *
 * @see ../../README.md
 */
router.get(
  '/order/show',
  defineEventHandler(async () => {
    const final_orders = await db.full_order_details.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });

    const final_orders_set = new Set(final_orders);
    const paid_orders = new Set(final_orders.filter(o => Boolean(o.paid)));
    const unpaid_orders = final_orders_set.difference(paid_orders);
    const product_name_grouping = new Map<string, number>();
    const discount_grouping = new Map<string, number>();

    for (const order of paid_orders) {
      product_name_grouping.set(
        order.product_name,
        (product_name_grouping.get(order.product_name) ?? 0) + 1
      );
      if (order.applied_discounts) {
        discount_grouping.set(
          order.applied_discounts,
          (discount_grouping.get(order.applied_discounts) ?? 0) + 1
        );
      }
    }

    return createOrderPage(
      final_orders,
      'Transacciones',
      `Todos los pedidos realizados por los usuarios, incluyendo aquellos incompletos o no pagado.<br /><br />
      Para no mostrar aquellos pedidos que los usuarios han dejado incompletos y ver solo aquellos pagados o los más recientes sin pagar
      agrupados por usuario, acceder a <a href="/order/show/unique">/order/show/unique</a>.
      <br />
      <h2>ESTADÍSTICAS SOBRE LOS DATOS MOSTRADOS EN ESTA PÁGINA:</h2>
      <p><b>Total de registros mostrados:</b> ${final_orders_set.size}</p>
      <p><b>Total de registros NO pagados:</b> ${unpaid_orders.size}</p>
      <p><b>Total de registros pagados:</b> ${paid_orders.size}</p>
      ${product_name_grouping.size > 0 || discount_grouping.size > 0
        ? `
        <h3>AGRUPACIONES DE REGISTROS (PAGADOS):</h3>
        ${product_name_grouping
            .entries()
            .map(([product, count]) =>
              `<p><b>Por producto '${product}':</b> ${count}</p>`
            )
            .toArray()
            .join('\n')
        }
        <hr />
        ${discount_grouping
            .entries()
            .map(([discount, count]) =>
              `<p><b>Por descuentos '${discount}':</b> ${count}</p>`
            )
            .toArray()
            .join('\n')
        }
        `
        : ''}
      `
    );
  })
);

/**
 * Lists all the orders that have been made by unique users
 *
 * THIS ROUTE DOESN'T HAVE ANY AUTHENTICATION/AUTHORIZATION AS IMPLEMENTED HERE,
 * HENCE IS PROBABLY NOT SECURE TO EXPOSE AS IS TO PRODUCTION.
 *
 * YOU MUST PROTECT THIS WITH A REVERSE PROXY!!!
 *
 * @see ../../README.md
 */
router.get(
  '/order/show/unique',
  defineEventHandler(async () => {
    const unique_orders = await db.unique_full_order_details.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });

    const final_orders_set = new Set(unique_orders);
    const paid_orders = new Set(unique_orders.filter(o => Boolean(o.paid)));
    const unpaid_orders = final_orders_set.difference(paid_orders);
    const product_name_grouping = new Map<string, number>();
    const discount_grouping = new Map<string, number>();

    for (const order of paid_orders) {
      product_name_grouping.set(
        order.product_name,
        (product_name_grouping.get(order.product_name) ?? 0) + 1
      );
      if (order.applied_discounts) {
        discount_grouping.set(
          order.applied_discounts,
          (discount_grouping.get(order.applied_discounts) ?? 0) + 1
        );
      }
    }

    return createOrderPage(
      unique_orders,
      'Transacciones únicas',
      `Se muestra: <br />
      · El último pedido realizado por un usuario en caso de que no posea ninguno pagado<br />
      · Todos los pedidos pagados por un usuario (los no pagados se excluyen)<br />
      · other_order_count hace referencia al número de registros que se han excluido de esta vista (y que pueden verse en <a href="/order/show">/order/show</a>).
      <br />
      <h2>ESTADÍSTICAS SOBRE LOS DATOS MOSTRADOS EN ESTA PÁGINA:</h2>
      <p><b>Total de registros mostrados:</b> ${final_orders_set.size}</p>
      <p><b>Total de registros NO pagados:</b> ${unpaid_orders.size}</p>
      <p><b>Total de registros pagados:</b> ${paid_orders.size}</p>
      ${product_name_grouping.size > 0 || discount_grouping.size > 0
        ? `
        <h3>AGRUPACIONES DE REGISTROS (PAGADOS):</h3>
        ${product_name_grouping
            .entries()
            .map(([product, count]) =>
              `<p><b>Por producto '${product}':</b> ${count}</p>`
            )
            .toArray()
            .join('\n')
        }
        <hr />
        ${discount_grouping
            .entries()
            .map(([discount, count]) =>
              `<p><b>Por descuentos '${discount}':</b> ${count}</p>`
            )
            .toArray()
            .join('\n')
        }
        `
        : ''}
      `
    );
  })
);

async function isFile(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);
    return stats.isFile();
  } catch {
    return false;
  }
}

router.get(
  '/order/show/download/:email/:order_id',
  defineEventHandler(async (event) => {
    const order_id = decodeURIComponent(event.context.params?.order_id ?? '');
    const email = decodeURIComponent(event.context.params?.email ?? '');
    const path = getInvoicePath(invoices_folder, email, order_id);

    if (!order_id || !email || !(await isFile(path))) {
      return new Response(null, { status: 400 });
    } else {
      const fileStream = createReadStream(path);

      return new Response(fileStream, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline'
        }
      });
    }
  })
);
