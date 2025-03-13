import type { ProcessorSignature } from '#/types';
import type { OrderPayload } from '@bpm2025-website/shared';

export default (): ProcessorSignature => {
  const res: ProcessorSignature = {};

  for (const env in process.env) {
    /**
     * Finds environment variables with the following schema: DISCOUNT_CODE_8 (where 8 is the id of the discount
     * specified in #/seeds/items.json, see README.md for more information about that file).
     *
     * The value of that environment variable is strictly compared with the `discount_body` field of the
     * request body.
     */
    if (env.startsWith('DISCOUNT_CODE_')) {
      const id = Number(env.split('DISCOUNT_CODE_')[1]);

      res[id] = (req_body: OrderPayload): boolean => req_body.discount_code === String(process.env[env]).trim();
    }
  }

  return res;
};
