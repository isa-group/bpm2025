import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import Fastify from 'fastify';
import { db, seedDb } from './util/db.ts';
import { isDev, logger } from './util/logger.ts';
import { registerDynamicModules } from './util/dynamic-modules.ts';
import { destr } from 'destr';
import { registerInvoicing } from './util/workers/invoicing/index.ts';
import { registerMailing } from './util/workers/mailing/index.ts';

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
await registerMailing();

console.log('before registerDynamicModules');
export const { processors, routes } = await registerDynamicModules(import.meta.dirname);
console.log('after registerDynamicModules');
const app = Fastify({
  ignoreDuplicateSlashes: true,
  forceCloseConnections: true
});

// @ts-expect-error - Typechecking cors fail for some reason
await app.register(import('@fastify/cors'), {
  origin: isDev || Boolean(process.env.ALLOW_ALL_CORS) ? '*' : destr(process.env.CORS_ORIGINS),
  methods: '*',
  allowHeaders: '*',
  credentials: false,
  maxAge: false
});
app.register(import('@fastify/formbody'));
app.setErrorHandler((error, _, reply) => {
  if (isDev) {
    logger.error(error.stack);
  }
  reply.status(500).send();
});
console.log('beforeRoutes');
for (const route of routes) {
  console.log('route', route);
  app.register(route.default);
}
app.addHook('onClose', async () => {
  await db.$disconnect();
});
await app.ready();

try {
  await app.listen({
    port: 3000,
    host: '::',
    listenTextResolver: (address: string) => {
      logger.info(`Server listening at ${address}`);
      return address;
    }
  });
} catch (error) {
  logger.error(error);
}
