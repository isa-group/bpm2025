import { defineConfig } from 'eslint/config';
import { getBaseConfig, getTSVueConfig, getNodeFiles } from '@bpm2025-website/configs/lint';
import pkg from './package.json' with { type: 'json' };

export default defineConfig([
  ...getBaseConfig(pkg.name),
  ...getTSVueConfig(pkg.name, true, import.meta.dirname),
  // ...unocss,
  ...getNodeFiles(pkg.name),
  // Temporary override to fix import-x resolver error and other problematic rules
  {
    name: 'conferia-frontend - temporary overrides',
    rules: {
      'import-x/named': 'off',
      'import-x/no-extraneous-dependencies': 'off' // Temporarily disable due to false positives
    }
  }
]);
