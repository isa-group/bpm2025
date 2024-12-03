import { defineEventHandler, readBody } from 'h3';
import { router } from '../app.ts';

/**
 * Gets the payment result from Redsys TPV
 */
const handler = defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log(body);

  return null;
});
router.post(
  '/payment',
  handler
)
  .get(
    '/payment',
    handler
  );
