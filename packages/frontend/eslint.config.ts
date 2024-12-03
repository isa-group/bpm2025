import { getBaseConfig, getImportAliasConfig, getTypeScriptConfig, getAstroConfig } from '@bpm2025-website/configs/lint';

export default [
  ...getBaseConfig('@bpm2025-website/frontend'),
  ...getImportAliasConfig(),
  ...getTypeScriptConfig(),
  ...getAstroConfig()
];
