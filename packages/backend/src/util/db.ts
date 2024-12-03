import { PrismaClient } from '@prisma/client';
import { destr } from 'destr';
import { logger } from './logger';
import { readFile } from 'node:fs/promises';

export const db = new PrismaClient();

export async function seedDb(itemsPath: string) {
  const promises = [];
  const items = destr<Record<string, string>>((await readFile(itemsPath)).toString());
  const currentProductIds = new Set((await db.product.findMany({
    select: { id: true }
  })).map(({ id }) => id));
  const currentDiscountIds = new Set((await db.discount.findMany({
    select: { id: true }
  })).map(({ id }) => id));

  // @ts-expect-error - The JSON is not typed and validations should throw rightaway regardless
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

  // @ts-expect-error - The JSON is not typed and validations should throw rightaway regardless
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
          reduction: items.discounts[key].reduction
        }
      }));
    }
  }

  await db.$transaction(promises);
}

function onExit() {
  db.$disconnect();
}

process.on('SIGTERM', onExit);
process.on('SIGINT', onExit);
process.on('exit', onExit);
process.on('unhandledRejection', onExit);
process.on('uncaughtException', onExit);
