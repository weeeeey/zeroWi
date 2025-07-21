import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@tanstack/query': pluginQuery,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
      '@tanstack/query/exhaustive-deps': 'error',
    },
  },
];

export default eslintConfig;
