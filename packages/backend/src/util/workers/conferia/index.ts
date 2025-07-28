import { Worker } from 'node:worker_threads';
import { join } from 'node:path';
import type { Inputs } from './worker';

let worker: Worker | null = null;
let is_registered = false;

/**
 * Registers the CONFERIA integration capabilities at application startup
 */
export function registerConferiaIntegration() {
  if (!is_registered) {
    worker = new Worker(join(import.meta.dirname, 'worker.ts'));
    is_registered = true;
  }
}

/**
 * Registers a user with CONFERIA using the provided user data
 */
export async function registerUserWithConferia(inputs: Inputs): Promise<void> {
  if (!worker) {
    return;
  }

  return new Promise((resolve) => {
    worker!.postMessage(inputs);
    worker!.once('message', (result) => {
      if (result.success) {
        resolve();
      } else {
        throw result.error;
      }
    });
  });
}
