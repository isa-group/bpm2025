import { getBaseConfig, getImportAliasConfig, getTypeScriptConfig, getAstroConfig, unocss } from '@bpm2025-website/configs/lint';
import pkg from './package.json' with { type: 'json' };

export default [
  ...getBaseConfig(pkg.name),
  ...getImportAliasConfig(),
  ...getTypeScriptConfig(),
  ...getAstroConfig(),
  ...unocss
];
