import { db } from '../db';
import { processors } from '../../app.ts';

type MapValue<T> = T extends Map<unknown, infer U> ? U : never;

/**
 * Pass an order object (as defined in the Prisma schema) as the first parameter.
 * The second and subsequent parameters will be passed through to the discount processor
 * functions.
 *
 * @param order - Order payload as defined in the Prisma schema
 * @param processor_parameters - Parameters to pass to the discount processors
 */
export async function createOrderAndDiscounts(
  order: Parameters<typeof db.order.create>[0]['data'],
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
