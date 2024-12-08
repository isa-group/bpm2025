import { join } from 'node:path';
import { Worker } from 'node:worker_threads';
import { readdir } from 'node:fs/promises';
import type { Inputs } from './worker';
import { isDev } from '../logger';
import imageSize from 'image-size';

let worker: Worker;
let is_registered = false;

export async function register(target_path: string, seed_folder: string) {
  if (!is_registered) {
    /**
     * Find possible invoice header images and import them
     */
    const files = await readdir(seed_folder);
    const possible_file = files.filter(name => !name.endsWith('.json') || !name.endsWith('.md'))[0];
    const dimensions = imageSize(join(seed_folder, possible_file));

    worker = new Worker(join(import.meta.dirname, 'worker.ts'), {
      workerData: {
        target_path,
        isDev,
        /**
         * We assume the first match is the header image for the invoices.
         *
         * We are not responsible for the user throwing other garbage
         * to the seed folde and not reading the docs.
         */
        header_image: {
          path: join(seed_folder, possible_file),
          /**
           * There are some blurrinnes, so we scale them down a little
           */
          width: Math.ceil((dimensions.width ?? 100) / 1.5),
          height: Math.ceil((dimensions.height ?? 100) / 1.5)
        }
      }
    });

    is_registered = true;
  }
}

/**
 * Generates the invoice PDF for the given order, discounts and user.
 * @returns - The path to the generated PDF.
 */
export async function generate_order_invoice(inputs: Inputs): Promise<string> {
  return new Promise((resolve) => {
    worker.postMessage(inputs);
    worker.once('message', (result) => {
      if (result.success && result.order_id === inputs.order.id) {
        resolve(result.path);
      }
    });
  });
}
