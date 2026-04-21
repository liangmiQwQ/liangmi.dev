import { fileURLToPath } from 'node:url'
import { voidVue } from '@void/vue/plugin'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { voidPlugin } from 'void'

export default defineConfig({
  plugins: [
    voidPlugin(),
    voidVue(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '~/': fileURLToPath(new URL('./src/', import.meta.url)),
      '@app/': fileURLToPath(new URL('./app/', import.meta.url)),
    },
  },
})
