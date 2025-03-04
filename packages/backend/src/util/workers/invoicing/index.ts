import { join } from 'node:path';
import { Worker } from 'node:worker_threads';
import { readdir, readFile } from 'node:fs/promises';
import type { Inputs, WorkerData } from './worker';
import imageSize from 'image-size';

let worker: Worker;
let is_registered = false;

/**
 * Registers the invoicing capabilities at application startup
 * (spawns the worker thread and sets the appropiate variables).
 *
 * @param target_path - The path to the folder where the invoices will be stored.
 * @param seed_folder - The folder that contains the image for the invoice headers.
 */
export async function registerInvoicing(target_path: string, seed_folder: string) {
  if (!is_registered) {
    /**
     * Find possible invoice header images and import them
     */
    const files = await readdir(seed_folder);
    const possible_file = files.filter(name => !name.endsWith('.json') || !name.endsWith('.md'))[0];
    const dimensions = imageSize(await readFile(join(seed_folder, possible_file)));

    worker = new Worker(join(import.meta.dirname, 'worker.ts'), {
      workerData: {
        target_path,
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
        },
        billing_details: process.env.BILLING_DETAILS?.split(':') ?? [],
        billing_vat_number: process.env.BILLING_VAT_NUMBER,
        invoice_name: process.env.BILLING_INVOICE_NAME
      } satisfies WorkerData
    });

    is_registered = true;
  }
}

/**
 * Generates the invoice PDF for the given order, discounts and user.
 * @returns - The path to the generated PDF.
 */
export async function generateOrderInvoice(inputs: Inputs): Promise<string> {
  return new Promise((resolve) => {
    worker.postMessage(inputs);
    worker.once('message', (result) => {
      const belongs_to_order = result.order_id === inputs.order.id;

      if (belongs_to_order) {
        if (result.success) {
          resolve(result.path);
        } else {
          throw result.error;
        }
      }
    });
  });
}
