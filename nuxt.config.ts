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

  css: [
    '~/assets/css/main.css',
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },

  // Since we use SSG, we use @nuxtjs/color-mode instead of VueUse
  colorMode: {
    classSuffix: '',
  },

  app: {
    head: {
      title: 'Liang',
      meta: [
        { name: 'description', content: 'Liang\'s Growth Timeline' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@900&family=Inter:wght@400;500&family=Inter+Tight:wght@500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500&display=swap' },
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
