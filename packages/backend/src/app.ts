import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { seedDb } from './util/db.ts';
import { createApp, createRouter, handleCors, sendNoContent } from 'h3';
import { isDev } from './util/logger.ts';
import { registerDynamicModules } from './util/dynamic-modules.ts';
import { destr } from 'destr';
import { registerInvoicing } from './util/invoicing';
import { registerMailing } from './util/mailing';

if (isDev) {
  await import('dotenv/config');
}

/**
 * == DATA FOLDER CREATION ==
 * This folder will contains all the artifacts produced during operation:
 * - The SQLite database
 * - The invoices
 */
const data_folder = join(import.meta.dirname, '..', 'data');
export const invoices_folder = join(data_folder, 'invoices');
await mkdir(invoices_folder, { recursive: true });

/**
 * == SEED FOLDER ==
 * This folder contains the items.json file that will be used to seed the database
 * and the header image for the invoices
 */
const seed_folder = join(import.meta.dirname, '..', 'seeds');
await seedDb(join(seed_folder, 'items.json'));
await registerInvoicing(invoices_folder, seed_folder);
registerMailing();

/**
 * export is needed for listhen to work
 */
export const app = createApp({
  debug: isDev,
  onError: (_, event) => sendNoContent(event, 500),
  onRequest: (event) => {
    handleCors(event, {
      origin: isDev || Boolean(process.env.ALLOW_ALL_CORS) ? '*' : destr(process.env.CORS_ORIGINS),
      methods: '*',
      allowHeaders: '*',
      credentials: false,
      maxAge: false
    });
  }
});
export const router = createRouter({
  preemptive: true
});
export const processors = await registerDynamicModules(import.meta.dirname);

app.use(router);
