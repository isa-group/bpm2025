import { validateRedsysResponse } from '@bpm2025-website/shared/validation/data';
import { validateTransactionResponse } from '../redsys.ts';
import { postPaymentConfirm } from '../util/hooks/post.ts';
import { db } from '../util/db.ts';
import type { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance) {
  /**
   * Gets the payment result from Redsys and updates the order status
   * In order for this to work, you must enable the HTTP notification
   * in the Redsys dashboard and set the URL to this endpoint.
   *
   * You may also configure the NOTIFICATION_OK and NOTIFICATION_KO
   * to redirect the user to the appropiate pages when the payment
   * is confirmed.
   */
  fastify.post('/payment', async (request, reply) => {
    const { body } = request;

    if (validateRedsysResponse(body)) {
      const validation = validateTransactionResponse(body);

      if (validation.success && validation.orderId) {
        await db.order.update({
          data: {
            paid: true
          },
          where: {
            id: validation.orderId
          }
        });

        console.log(`Order ${validation.orderId} has been paid!`);
        /**
         * We use void so we return rightaway, but the promise is queued
         * to run in the next tick of the JS event loop.
         */
        void postPaymentConfirm(validation.orderId);

        return reply.status(200).send();
      }
    }

    return reply.status(400).send();
  });
}
