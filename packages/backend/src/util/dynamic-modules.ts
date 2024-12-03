import type { OrderPayload } from '@bpm2025-website/shared';
import { isFunc } from '@bpm2025-website/shared/validation';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { Awaitable } from '@/types';

/**
 * Imports ESM safely, ignoring any potential errors
 */
async function safeImport(modulePath: string) {
  try {
    if (!modulePath.endsWith('.md')) {
      return await import(modulePath);
    }
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
  const routePath = join(startPath, './routes');
  const processorsPath = join(startPath, './processors');
  const processors = new Map<number, (req_body: OrderPayload) => Awaitable<boolean>>();

  for (const module of await readdir(routePath)) {
    await safeImport(join(routePath, module));
  }

  for (const module of await readdir(processorsPath)) {
    const processor = await safeImport(join(processorsPath, module)) ?? { default: {} };
    const obj = isFunc(processor.default) ? processor.default() : processor.default;

    for (const key in obj) {
      processors.set(Number(key), obj[key]);
    }
  }

  return processors;
}
