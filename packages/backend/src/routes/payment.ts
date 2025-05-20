import { defineEventHandler, readBody } from 'h3';
import { router } from '../app.ts';
import { validateRedsysResponse } from '@bpm2025-website/shared/validation/data';
import { validateTransactionResponse } from '../redsys.ts';
import { postPaymentConfirm } from '../util/hooks/post.ts';
import { db } from '../util/db.ts';

/**
 * Gets the payment result from Redsys and updates the order status
 * In order for this to work, you must enable the HTTP notification
 * in the Redsys dashboard and set the URL to this endpoint.
 *
 * You may also configure the NOTIFICATION_OK and NOTIFICATION_KO
 * to redirect the user to the appropiate pages when the payment
 * is confirmed.
 */
router.post('/payment', defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (validateRedsysResponse(body)) {
    const validation = validateTransactionResponse(body);

    if (validation.success && validation.orderId) {
      await db.order.update({
        data: {
          paid: 'REDSYS'
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

      return new Response(null, { status: 200 });
    }
  }

  return new Response(null, { status: 400 });
}));

router.post('/payment/manual/:order_id', defineEventHandler(async (event) => {
  const order_id = decodeURIComponent(event.context.params?.order_id ?? '');
  if (!order_id) {
    return new Response(null, { status: 400 });
  } else {
    try {
      await db.order.findFirstOrThrow({ where: { id: order_id } });
      await db.order.update({
        data: {
          paid: 'TRANSFER'
        },
        where: {
          id: order_id
        }
      });

      /**
       * We use void so we return rightaway, but the promise is queued
       * to run in the next tick of the JS event loop.
       */
      void postPaymentConfirm(order_id);
      
      return new Response(null, { status: 200 });
    } catch {
      return new Response(null, { status: 404 });
    }
  }
}));
