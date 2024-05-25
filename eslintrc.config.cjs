// @ts-check
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint', 'import', 'tsdoc'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'tsdoc/syntax': 'warn',
      },
    },
    {
      files: ['test', '__test__', '*.{spec,test}.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'tsdoc/syntax': 'off',
      },
    },
  ],
  ignorePatterns: ['dist'],
});
