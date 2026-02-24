// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
  ],
  devtools: { enabled: true },

  eslint: {
    config: {
      standalone: false,
    },
  },

  colorMode: {
    classSuffix: '',
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Liang',
      meta: [
        { name: 'description', content: 'Liang\'s Growth Timeline' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  nitro: {
    preset: 'static',
  },

  compatibilityDate: '2024-04-03',
})
