import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'
// @ts-check

export default antfu().append(nuxt())
