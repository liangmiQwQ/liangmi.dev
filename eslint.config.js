import antfu from '@antfu/eslint-config'
import tsParser from '@typescript-eslint/parser'
// @ts-check

export default antfu()
  .append({
    files: ['scripts/**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
  })
  .append({
    files: ['pages/**/*.vue'],
    rules: {
      // Void pages opt into layouts via `export const layout = ...`,
      // which the framework reads from the page module.
      'vue/no-export-in-script-setup': 'off',
    },
  })
