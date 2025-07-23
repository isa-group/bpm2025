import { getPackagePath } from '@bpm2025-website/shared/node/utils';
import { defineConfig } from 'eslint/config';
import eslintImportX from 'eslint-plugin-import-x';
import globals from 'globals';

/**
 * Gets the ESLint config from Node.js and development related files
 * @param files - Defaults to `*config.*` and files under `scripts` folder
 */
export function getNodeFiles(packageName: string, files = ['*.config.*', 'scripts/**/*.ts']) {
  return defineConfig([{
    name: '(@bpm2025-website/configs/lint/env) Node.js and development-related files',
    files,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.nodeBuiltin
      }
    },
    plugins: {
      // @ts-expect-error - Missing types from package
      'import-x': eslintImportX
    },
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          packageDir: [getPackagePath('bpm2025-website'), getPackagePath(packageName)]
        }
      ],
      'import-x/no-nodejs-modules': 'off',
      'unicorn/no-process-exit': 'off'
    }
  }
  ]);
}

/**
 * Gets the rules config for WebWorker files
 * @param files - Defaults to `*.worker.ts` files
 */
export function getWorkerFiles(files = ['**/*.worker.ts']) {
  return defineConfig([{
    name: '(@bpm2025-website/configs/lint/env) WebWorkers',
    files,
    languageOptions: {
      globals: {
        ...globals.worker
      }
    }
  }]);
}
