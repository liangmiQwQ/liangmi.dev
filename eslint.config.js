import antfu from '@antfu/eslint-config'
import tsParser from '@typescript-eslint/parser'
import nuxt from './.nuxt/eslint.config.mjs'
// @ts-check

export default antfu().append(nuxt()).append({
  files: ['scripts/**/*.ts'],
  languageOptions: {
    parser: tsParser,
  },
})
