import antfu from '@antfu/eslint-config'
import tsParser from '@typescript-eslint/parser'
// @ts-check

export default antfu().append({
  files: ['scripts/**/*.ts'],
  languageOptions: {
    parser: tsParser,
  },
})
