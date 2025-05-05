import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';

export function getAstroConfig() {
  return defineConfig([
    ...eslintPluginAstro.configs['flat/recommended'],
    {
      files: ['**/*.astro'],
      languageOptions: {
        parser: astroEslintParser,
        parserOptions: {
          parser: tseslint.parser,
          extraFileExtensions: ['.astro']
        },
        globals: {
          ...globals.browser
        }
      }
    }
  ]);
}
