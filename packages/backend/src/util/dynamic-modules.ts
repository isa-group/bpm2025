import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import type { OrderPayload } from '@bpm2025-website/shared';
import { isFunc } from '@bpm2025-website/shared/validation';
import type { Promisable } from 'type-fest';
import type { OrderCreatePayload, OrderWithRelations } from '#/types';

/**
 * Imports ESM safely, ignoring any potential errors
 */
async function safeImport(modulePath: string) {
  try {
    return await import(modulePath);
  } catch (e) {
    console.error(e);
    return;
  }
}

/**
 * Register the different routes and processor modules dynamically
 * @param startPath - The base path to start looking
 */
export async function registerDynamicModules(startPath: string) {
  const promises = [];
  const processors = new Map<number, (req_body: OrderPayload) => Promisable<boolean>>();
  const preHooks: ((order: OrderCreatePayload, body: OrderPayload) => Promisable<void>)[] = [];
  const postHooks: ((full_order: OrderWithRelations) => Promisable<void>)[] = [];

  for await (const module of glob(join(startPath, './routes/**/*.{ts,js}'))) {
    promises.push(safeImport(module));
  }

  for await (const module of glob(join(startPath, './processors/**/*.{ts,js}'))) {
    promises.push((async () => {
      const processor = await safeImport(module) ?? { default: {} };
      const obj = isFunc(processor.default) ? processor.default() : processor.default;

      for (const key in obj) {
        processors.set(Number(key), obj[key]);
      }
    })());
  }

  /**
   * Register pre-hooks
   */
  for await (const module of glob(join(startPath, './hooks/pre/**/*.{ts,js}'))) {
    promises.push((async () => {
      const hook = await safeImport(module);
      const fun = isFunc(hook.default) ? hook.default : (order: OrderCreatePayload) => order;

      preHooks.push(fun);
    })());
  }

  /**
   * Register post-hooks
   */
  for await (const module of glob(join(startPath, './hooks/post/**/*.{ts,js}'))) {
    promises.push((async () => {
      const hook = await safeImport(module);
      const fun = isFunc(hook.default) ? hook.default : (order: OrderCreatePayload) => order;

      postHooks.push(fun);
    })());
  }

  await Promise.all(promises);

  return {
    processors,
    preHooks,
    postHooks
  };
}
