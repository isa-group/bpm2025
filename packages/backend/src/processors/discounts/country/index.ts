import { createReadStream } from 'node:fs';
import { createInterface, Interface } from 'node:readline/promises';
import { join } from 'node:path';
import type { Awaitable, ProcessorSignature } from '#/types';
import type { OrderPayload } from '@bpm2025-website/shared';

async function linesToSet(rl: Interface) {
  const res = new Set<string>();

  for await (const line of rl) {
    // Skips empty lines
    if (line) {
      res.add(line.trim());
    }
  }

  return res;
}

async function parseFile<T>(fileName: string, callback: (rl: Interface) => Awaitable<T>) {
  const fsStream = createReadStream(join(import.meta.dirname, fileName));
  const rl = createInterface({
    input: fsStream,
    crlfDelay: Infinity
  });

  try {
    return await callback(rl);
  } finally {
    rl.close();
    fsStream.close();
  }
}

const lowest_income = await parseFile('lowest_income.txt', linesToSet);
const lowerMiddle_income = await parseFile('lower-middle_income.txt', linesToSet);

export default (): ProcessorSignature => {
  return {
    6: (): boolean => false,
    7: (): boolean => false,
    16: (req_body: OrderPayload): boolean => lowest_income.has(req_body.country),
    17: (req_body: OrderPayload): boolean => lowerMiddle_income.has(req_body.country)
  };
};
