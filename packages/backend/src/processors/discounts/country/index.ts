import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { join } from 'node:path';
import type { ProcessorSignature } from '#/types';
import type { OrderPayload } from '@bpm2025-website/shared';

const gni_map = new Map<string, number>();

/**
 * We wrap this in an IIFE so the read stream can be garbage collected
 */
await (async () => {
  const fsStream = createReadStream(join(import.meta.dirname, 'GNIs.csv'));
  const rl = createInterface({
    input: fsStream,
    crlfDelay: Infinity
  });

  let isFirstLine = true;
  for await (const line of rl) {
    if (!isFirstLine) {
      const [country,, raw_gni] = line.split(';');
      const gni = Number.parseInt(raw_gni);
      if (gni < 18_000) {
        gni_map.set(country, gni);
      }
    } else {
      isFirstLine = false;
    }
  }

  rl.close();
  fsStream.close();
})();

export default (): ProcessorSignature => {
  return {
    6: (req_body: OrderPayload): boolean =>
      (gni_map.get(req_body.country) ?? Number.MAX_SAFE_INTEGER) < 9_000,
    7: (req_body: OrderPayload): boolean =>
      (gni_map.get(req_body.country) ?? Number.MAX_SAFE_INTEGER) < 18_000,
  };
};
