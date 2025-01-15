import { getBaseConfig, getImportAliasConfig, getTypeScriptConfig } from './lint';

export default [
  ...getBaseConfig('@bpm2025-website/configs'),
  ...getImportAliasConfig(),
  ...getTypeScriptConfig()
];
