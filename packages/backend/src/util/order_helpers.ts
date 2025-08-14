import { stat } from 'node:fs/promises';
import type { full_order_details } from '@prisma/client';
import { processors } from '../app.ts';
import { generateTableMarkup } from '../util/listing.ts';
import { db } from './db.ts';
import type { OrderCreatePayload, OrderWithRelations } from '#/types';

type MapValue<T> = T extends Map<unknown, infer U> ? U : never;

/**
 * Checks if a file exists at the given path and is a file.
 */
export async function isFile(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);
    return stats.isFile();
  } catch {
    return false;
  }
}

/**
 * Pass an order object (as defined in the Prisma schema) as the first parameter.
 * The second and subsequent parameters will be passed through to the discount processor
 * functions.
 *
 * @param order - Order payload as defined in the Prisma schema
 * @param processor_parameters - Parameters to pass to the discount processors
 */
export async function createOrderAndDiscounts(
  order: OrderCreatePayload,
  ...processor_parameters: Parameters<MapValue<typeof processors>>
) {
  const transaction_promises = [];

  transaction_promises.push(db.order.create({
    data: order
  }));

  /**
   * Applies discount processors to the order
   */
  for (const [discount_id, func] of processors) {
    if (await func(...processor_parameters)) {
      transaction_promises.push(
        db.discount_order.create({
          data: {
            order_id: order.id,
            discount_id
          }
        })
      );
    }
  }

  await db.$transaction(transaction_promises);
}

/**
 * Creates a basic HTML page with a table of all the order details. The columns shown
 * have the same properties that Prisma's generated objects have.
 */
export function createOrderPage(
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
      case 'FREE':
        colors[i] = 'antiquewhite';
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
 * Given an order id, returns the full order, including
 * all the associated relations
 */
export async function getFullOrder(order_id: string): Promise<OrderWithRelations> {
  return await db.order.findUniqueOrThrow({
    where: {
      id: order_id
    },
    include: {
      user: true,
      product: true,
      discount_order: {
        include: {
          discount: true
        }
      }
    }
  });
}
