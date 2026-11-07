import { defineHandler, defineHead } from 'void'

import type { ArticleSummary } from '~/articles.ts'
import { getArticleList } from '~/articles.ts'
import { absoluteUrl, author, avatarImage, createPageHead, person } from '~/seo.ts'

export const prerender = true

export interface Props {
  articles: ArticleSummary[]
}

export const loader = defineHandler<Props>(() => ({ articles: getArticleList() }))

export const head = defineHead(() =>
  createPageHead({
    path: '/articles',
    title: 'Writing · Liang',
    socialTitle: 'Writing by Liang',
    description:
      'Articles by Liang (liangmiQwQ) on the things I love and what I learn along the way.',
    type: 'website',
    image: avatarImage,
    graph: [
      {
        '@type': 'CollectionPage',
        url: absoluteUrl('/articles'),
        name: 'Writing by Liang',
        author
      },
      person
    ]
  })
)
