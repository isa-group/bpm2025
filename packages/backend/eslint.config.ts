import { 
  getBaseConfig,
  getImportAliasConfig,
  getNodeFiles,
  getTSVueConfig,
  tsFiles
} from '@bpm2025-website/configs/lint';
import pkg from './package.json' with { type: 'json' };

export default [
  ...getBaseConfig(pkg.name),
  ...getImportAliasConfig(),
  ...getTSVueConfig(pkg.name, false, import.meta.dirname),
  ...getNodeFiles(pkg.name, tsFiles)
];
