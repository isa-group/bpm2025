import { getBaseConfig, getTypeScriptConfig, getAstroConfig } from '@bpm2025-website/configs/lint';

export default [
  ...getBaseConfig('@bpm2025-website/frontend'),
  ...getTypeScriptConfig(),
  ...getAstroConfig()
];
