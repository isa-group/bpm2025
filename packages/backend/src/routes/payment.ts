import { defineEventHandler, readBody } from 'h3';
import { validateRedsysResponse } from '@bpm2025-website/shared/validation/data';
import { postHooks, router } from '../app.ts';
import { validateTransactionResponse } from '../redsys.ts';
import { db } from '../util/db.ts';
import { getFullOrder } from '../util/order_helpers.ts';

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
      const final_order = await getFullOrder(validation.orderId);

      for (const fn of postHooks) {
        void fn(final_order);
      }

      return new Response(null, { status: 200 });
    }
  }

  return new Response(null, { status: 400 });
}));

/**
 * Marks an specific order as paid manually.
 *
 * THIS ROUTE DOESN'T HAVE ANY AUTHENTICATION/AUTHORIZATION AS IMPLEMENTED HERE,
 * HENCE IS PROBABLY NOT SECURE TO EXPOSE AS IS TO PRODUCTION.
 *
 * YOU MUST PROTECT THIS WITH A REVERSE PROXY!!!
 *
 * @see ../../README.md
 */
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
      const final_order = await getFullOrder(order_id);

      /**
       * We need to pass custom parameters to the mailing post hook,
       * so we don't use the handling defined in the non-manual handler.
       */
      await (await import('../hooks/post/send_mail.ts')).default(final_order, false);
      await (await import('../hooks/post/conferia.ts')).default(final_order);

      return new Response(null, { status: 200 });
    } catch {
      return new Response(null, { status: 404 });
    }
  }
}));
