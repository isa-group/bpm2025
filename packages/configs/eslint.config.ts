import { getBaseConfig, getTypeScriptConfig } from './lint';

export default [
  ...getBaseConfig('@bpm2025-website/configs'),
  ...getTypeScriptConfig()
];
