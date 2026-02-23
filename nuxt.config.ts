// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/eslint', '@unocss/nuxt'],
  devtools: { enabled: true },

  eslint: {
    config: {
      standalone: false,
    },
  },

  typescript: {
    typeCheck: true,
  },

  app: {
    head: {
      title: 'Liang',
      meta: [
        { name: 'description', content: 'Liang\'s Growth Timeline' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/avatar.png' },
      ],
    },
  },

  compatibilityDate: '2024-04-03',
})
