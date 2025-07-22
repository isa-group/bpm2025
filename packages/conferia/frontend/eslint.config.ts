import { defineConfig } from 'eslint/config';
import { getBaseConfig, getTSVueConfig, getNodeFiles, unocss } from '@bpm2025-website/configs/lint';
import pkg from './package.json' with { type: 'json' };

export default defineConfig([
  ...getBaseConfig(pkg.name),
  ...getTSVueConfig(pkg.name, true, import.meta.dirname),
  // ...unocss,
  ...getNodeFiles(pkg.name)
]);
