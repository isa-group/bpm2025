import { defineEventHandler, getQuery, readBody } from 'h3';
import { router } from '../app.ts';
import { isEmpty } from '@bpm2025-website/shared/validation';

// TODO: Implement this once credit card payment is implemented.

/**
 * Gets the payment result from Redsys TPV. Is valid for both
 * the DS_MERCHANT_MERCHANTURL (POST) and DS_MERCHANT_URLOK (GET) endpoints.
 *
 * The availability of either of those depends on the configuration of your
 * TPV in the merchant panel. The best one is to use the POST one, as it
 * is sent by Redsys automatically as soon as there are updates to the payment,
 * while the DS_MERCHANT_URLOK is only called when the user clicks on the "Continue"
 * button in Redsys's screen and it's called by the user's browser.
 */
const handler = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const body = await readBody(event);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const payload = isEmpty(body) ? query : body;

  console.log('body', body);
  console.log('query', query);

  /**
   * We use void so we return rightaway, but the promise is queued
   * to run in the next tick of the JS event loop.
   */
  // void postPaymentConfirm();

  return new Response(null, { status: 200 });
});

router.use('/payment', handler, ['get', 'post']);
