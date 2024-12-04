import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

export function getTypeScriptConfig(tsconfigRootDir = import.meta.dirname) {
  return [
    // @ts-expect-error - typescript-eslint type mismatch with ESLint package
    ...tseslint.configs.recommended,
    // @ts-expect-error - typescript-eslint type mismatch with ESLint package
    tseslint.configs.eslintRecommended,
    {
    // Define the configuration for `<script>` tag.
    // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ['**/*.{ts,tsx}', '**/*.astro/*.js'],
      // @ts-expect-error - typescript-eslint type mismatch with ESLint package
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          tsconfigRootDir
        }
      },
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    }
  ] satisfies Linter.Config[];
}
