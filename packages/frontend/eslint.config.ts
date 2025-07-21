import {
  getBaseConfig,
  getImportAliasConfig,
  getTSVueConfig,
  getAstroConfig,
  unocss,
  getNodeFiles,
  tsFiles
} from '@bpm2025-website/configs/lint';
import pkg from './package.json' with { type: 'json' };

export default [
  ...getBaseConfig(pkg.name),
  ...getImportAliasConfig(),
  ...getTSVueConfig(pkg.name, false, import.meta.dirname),
  ...getAstroConfig(),
  ...getNodeFiles(pkg.name, tsFiles),
  ...unocss
];
