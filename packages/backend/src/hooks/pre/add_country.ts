import type { OrderPayload } from '@bpm2025-website/shared';
import type { OrderCreatePayload } from '#/types';

/**
 * Adds the country to the notes of an order
 */
export default (
  order: OrderCreatePayload,
  body: OrderPayload
) => {
  order.notes = body.country ? `COUNTRY: ${body.country}${body.notes ? `\n\n${body.notes}` : ''}` : body.notes;
  return order;
};
