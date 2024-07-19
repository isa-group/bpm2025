import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import fileProgress from 'eslint-plugin-file-progress';
import gitignore from 'eslint-config-flat-gitignore';

const CI_environment = process.env.CI ? 0 : 1;

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  tseslint.configs.eslintRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false
      }
    }
  },
  {
    ...stylistic.configs.customize({
      quotes: 'single',
      semi: true,
      commaDangle: 'never',
      braceStyle: '1tbs',
      arrowParens: false,
      blockSpacing: true
    }),
    name: '(@stylistic) Extended config from plugin'
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro']
      }
    }
  },
  {
    // Define the configuration for `<script>` tag.
    // Script in `<script>` is assigned a virtual file name with the `.js` extension.
    files: ['**/*.{ts,tsx}', '**/*.astro/*.js'],
    languageOptions: {
      parser: tseslint.parser
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  {
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/jsx-indent-props': 'off',
      '@stylistic/jsx-closing-bracket-location': 'off'
    }
  },
  {
    ...stylistic.configs['disable-legacy'],
    name: 'Environment config - Disable legacy rules'
  },
  {
    ignores: [
      '**/.git',
      ...gitignore().ignores
    ]
  },
  /** File progress plugin */
  {
    name: '(eslint) Linting progress report',
    settings: {
      progress: {
        successMessage: 'Linting done!'
      }
    },
    plugins: {
      'file-progress': fileProgress
    },
    rules: {
      'file-progress/activate': CI_environment
    }
  }
];
