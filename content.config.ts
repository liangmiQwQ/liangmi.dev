import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/*',
    }),
    info: defineCollection({
      type: 'page',
      source: 'info/*',
    }),
  },
}) as ReturnType<typeof defineContentConfig>
