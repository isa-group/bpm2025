import { readFile } from 'node:fs/promises';
import { PrismaClient } from '@prisma/client';
import { destr } from 'destr';
import { logger } from './logger';

export const db = new PrismaClient();

/**
 * Seeds the DB with the initial data from the seed JSON file
 */
export async function seedDb(itemsPath: string) {
  const promises = [];
  const items = destr<Record<string, Record<string, string>>>((await readFile(itemsPath)).toString());
  const currentProductIds = new Set((await db.product.findMany({
    select: { id: true }
  })).map(({ id }) => id));
  const currentDiscountIds = new Set((await db.discount.findMany({
    select: { id: true }
  })).map(({ id }) => id));

  for (const key in items.products) {
    // @ts-expect-error - The JSON is not typed
    if (!currentProductIds.has(items.products[key].id)) {
      logger.info(`Seeding product ${key} to DB`);
      promises.push(db.product.create({
        data: {
          // @ts-expect-error - The JSON is not typed
          id: items.products[key].id,
          name: key,
          // @ts-expect-error - The JSON is not typed
          price: items.products[key].price
        }
      }));
    }
  }

  for (const key in items.discounts) {
    // @ts-expect-error - The JSON is not typed
    if (!currentDiscountIds.has(items.discounts[key].id)) {
      logger.info(`Seeding discount ${key} to DB`);
      promises.push(db.discount.create({
        data: {
          // @ts-expect-error - The JSON is not typed
          id: items.discounts[key].id,
          name: key,
          // @ts-expect-error - The JSON is not typed
          reduction: items.discounts[key].reduction,
          // @ts-expect-error - The JSON is not typed
          is_percentage: items.discounts[key].is_percentage
        }
      }));
    }
  }

  logger.info('Saving changes to database...');
  await db.$transaction(promises);
}

/**
 * Runs closing database operations before finishing the application
 * process.
 */
async function onExit() {
  await db.$executeRawUnsafe('PRAGMA optimize;');
  await db.$disconnect();
}

process.on('SIGTERM', () => void onExit());
process.on('SIGINT', () => void onExit());
process.on('exit', () => void onExit());
process.on('unhandledRejection', () => void onExit());
process.on('uncaughtException', () => void onExit());

// Source: https://sqlite.org/lang_analyze.html
await db.$executeRawUnsafe('PRAGMA optimize=0x10002;');
await db.$executeRawUnsafe('VACUUM;');

setInterval(() => {
  void db.$executeRawUnsafe('PRAGMA optimize;');
}, 864e5); // 24 hours
