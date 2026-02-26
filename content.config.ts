import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/*.md',
    }),
    me: defineCollection({
      type: 'page',
      source: 'info/*.md',
    }),
  },
}) as ReturnType<typeof defineContentConfig>
