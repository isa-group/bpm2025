import { join } from 'node:path';
import { Worker } from 'node:worker_threads';
import { isNil } from '@bpm2025-website/shared/validation';
import { isDev } from '../../logger';
import type { Inputs, WorkerData } from './worker';

const is_available = Boolean(process.env.SMTP_HOST)
  && !isNil(process.env.SMTP_PORT)
  && !isNil(process.env.SMTP_SECURE)
  && Boolean(process.env.SMTP_USER)
  && Boolean(process.env.SMTP_PASSWORD)
  && Boolean(process.env.MAIL_FROM);
let worker: Worker;
let is_registered = false;

if (!is_available) {
  const msg = 'Mailing configuration not set in the environment variables';

  if (isDev) {
    console.warn(`${msg}.\nContinuing without mailing capabilities, but make sure to set those in production`);
  } else {
    console.error(`${msg}.\nPlease set those in the environment variables.\n\nHalting...`);
    process.exit(1);
  }
}

/**
 * Registers the mailing capabilities at application startup
 * (spawns the worker thread and sets the appropiate variables).
 */
export function registerMailing() {
  if (!is_registered && is_available) {
    worker = new Worker(join(import.meta.dirname, 'worker.ts'), {
      workerData: {
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: Number(process.env.SMTP_PORT),
        SMTP_SECURE: Boolean(process.env.SMTP_SECURE),
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        MAIL_FROM: process.env.MAIL_FROM,
        MAIL_REPLY_TO: process.env.MAIL_REPLY_TO,
        MAIL_SUBJECT: process.env.MAIL_SUBJECT
      } as WorkerData
    });

    is_registered = true;
  }
}

/**
 * Sends an email to the user with the invoice attached,
 * following the environment variables set in the application.
 */
export async function sendConfirmationEmail(inputs: Inputs): Promise<void> {
  /**
   * If in development, the mailing capabilities might not be available,
   * as described in the conditions above this file.
   */
  if (!worker) {
    return;
  }

  return new Promise((resolve) => {
    worker.postMessage(inputs);
    worker.once('message', (result) => {
      const belongs_to_order = result.order_id === inputs.order_id;

      if (belongs_to_order) {
        if (result.success) {
          resolve();
        } else {
          throw result.error;
        }
      }
    });
  });
}
