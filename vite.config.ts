import { fileURLToPath } from 'node:url'

import { liangmi } from '@liangmi/vp-config'
import { voidVue } from '@void/vue/plugin'
import UnoCSS from 'unocss/vite'
import { voidPlugin } from 'void'

export default await liangmi({
  plugins: [voidPlugin(), voidVue(), UnoCSS()],
  resolve: {
    alias: {
      '~/': fileURLToPath(new URL('src/', import.meta.url))
    }
  }
})
