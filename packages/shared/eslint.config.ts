import { getBaseConfig, getImportAliasConfig, getTypeScriptConfig } from '@bpm2025-website/configs/lint';

export default [
  ...getBaseConfig('@bpm2025-website/shared'),
  ...getImportAliasConfig(),
  ...getTypeScriptConfig()
];
