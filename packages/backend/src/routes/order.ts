import { db } from '../util/db.ts';
import { validateOrderBody } from '@bpm2025-website/shared/validation/data';
import { logger } from '../util/logger.ts';
import { invoices_folder, processors } from '../constants.ts';
import { generateOrderId, getBaseMerchantParameters, getTPVOperationData } from '../redsys.ts';
import type { TPVOperation } from '@bpm2025-website/shared';
import { generateTableMarkup } from '../util/listing.ts';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { getInvoicePath } from '../util/index.ts';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

async function isFile(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);
    return stats.isFile();
  } catch {
    return false;
  }
}

export default function (fastify: FastifyInstance) {
  /**
 * Gets a form data object from the event body for creating an
 * order
 */
  fastify.post(
    '/order',
    async (request: FastifyRequest, reply: FastifyReply): Promise<TPVOperation> => {
      const body = request.body;

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
          return reply.status(404).send();
        }

        const order_paid = await db.order.findFirst({
          where: {
            user_id: user.id,
            paid: true,
            product_id: body.product_id
          },
          select: {
            id: true
          }
        });

        if (order_paid) {
          return reply.status(409).send();
        }

        const transaction_promises = [];
        const order_id = generateOrderId();

        transaction_promises.push(db.order.create({
          data: {
            id: order_id,
            user_id: user.id,
            product_id: body.product_id,
            notes: body.notes
          }
        }));

        /**
       * Applies discount processors to the order
       */
        for (const [discount_id, func] of processors) {
          if (await func(body)) {
            transaction_promises.push(
              db.discount_order.create({
                data: {
                  order_id: order_id,
                  discount_id
                }
              })
            );
          }
        }

        await db.$transaction(transaction_promises);
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

        return reply.status(200).send({
          ...getTPVOperationData(merchant_params),
          price: final_order.price_paid_with_discounts
        });
      } else {
        return reply.status(400).send();
      }
    });

  /**
   * Lists the orders for a user
   */
  fastify.get(
    '/order/show',
    async (_, reply: FastifyReply) => {
      const final_orders = await db.full_order_details.findMany({
        orderBy: {
          created_at: 'desc'
        }
      });

      return reply
        .header('Content-Type', 'text/html')
        .status(200)
        .send(
          generateTableMarkup({
            name: 'Transacciones',
            rows: final_orders.map(order => ({
              ...order,
              Recibo:
                order.paid
                  ? `<a href="show/download/${encodeURIComponent(order.user_email)}/${encodeURIComponent(order.order_ID)}">Descargar</a>`
                  : undefined
            }))
          })
        );
    }
  );

  /**
   * Downloads the invoice for an order
   */
  fastify.get(
    '/order/show/download/:email/:order_id',
    async (
      request: FastifyRequest<{
        Params: {
          email: string;
          order_id: string;
        };
      }>,
      reply: FastifyReply
    ) => {
      const { order_id, email } = request.params;
      const path = getInvoicePath(
        invoices_folder,
        decodeURIComponent(email),
        decodeURIComponent(order_id)
      );

      if (!order_id || !email || !(await isFile(path))) {
        return reply.status(400).send();
      } else {
        const fileStream = createReadStream(path);

        return reply
          .status(200)
          .header('Content-Type', 'application/pdf')
          .header('Content-Disposition', 'inline')
          .send(fileStream);
      }
    });
}
