import { getBaseConfig, getImportAliasConfig, getTypeScriptConfig } from './lint';
import pkg from './package.json' with { type: 'json' };

export default [
  ...getBaseConfig(pkg.name),
  ...getImportAliasConfig(),
  ...getTypeScriptConfig()
];
