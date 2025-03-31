import type { OrderPayload } from '@bpm2025-website/shared';
import { isFunc } from '@bpm2025-website/shared/validation';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { Awaitable } from '#/types.d.ts';
import type { FastifyInstance } from 'fastify';

/**
 * Imports ESM safely, ignoring any potential errors
 */
function safeImport(modulePath: string) {
  try {
    if (!modulePath.endsWith('.md')) {
      const test = import(modulePath);
      debugger;
      return new Promise((resolve) => setTimeout(resolve, 50000));
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
  const routes = new Set<{ default: (fastify: FastifyInstance) => unknown }>();
  const processors = new Map<number, (req_body: OrderPayload) => Awaitable<boolean>>();

  for (const module of await readdir(routePath)) {
    const importedModule = await safeImport(join(routePath, module));
    if (importedModule) {
      routes.add(importedModule);
    }
  }

  for (const module of await readdir(processorsPath)) {
    const processor = await safeImport(join(processorsPath, module)) ?? { default: {} };
    const obj = isFunc(processor.default) ? processor.default() : processor.default;

    for (const key in obj) {
      processors.set(Number(key), obj[key]);
    }
  }

  return { processors, routes };
}
