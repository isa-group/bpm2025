import globals from 'globals';
import tseslint from 'typescript-eslint';
import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import type { Linter } from 'eslint';

export function getAstroConfig() {
  return [
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
  ] satisfies Linter.Config[];
}
