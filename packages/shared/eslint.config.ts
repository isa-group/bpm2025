import { getBaseConfig, getTypeScriptConfig } from '@bpm2025-website/configs/lint';

export default [
  ...getBaseConfig('@bpm2025-website/shared'),
  ...getTypeScriptConfig()
];
