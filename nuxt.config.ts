// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/fonts',
  ],
  devtools: { enabled: true },

  eslint: {
    config: {
      standalone: false,
    },
  },

  // Since we use SSG, we use @nuxtjs/color-mode instead of VueUse
  colorMode: {
    classSuffix: '',
  },

  fonts: {
    families: [{ name: 'Playfair Display', provider: 'google' }],
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
      htmlAttrs: { lang: 'en' },
    },
  },

  nitro: {
    preset: 'static',
  },

  content: {
    build: {
      markdown: {
        remarkPlugins: { 'remark-breaks': {} },
      },
    },
  },

  compatibilityDate: '2024-04-03',
})
