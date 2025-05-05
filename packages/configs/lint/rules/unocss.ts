import { defineConfig } from 'eslint/config';
import UnoPlugin from '@unocss/eslint-config/flat';

export const unocss = defineConfig([
// @ts-expect-error - UnoCSS typings are incorrect at this time
  {
    ...UnoPlugin,
    name: '(unocss) Extended config from plugin'
  }
]);
