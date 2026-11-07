import { defineHandler, defineHead } from 'void'

import type { ArticleSummary } from '~/articles.ts'
import { getArticleList } from '~/articles.ts'
import { absoluteUrl, author, avatarImage, createPageHead, person } from '~/seo.ts'

export interface Props {
  articles: ArticleSummary[]
}

export const loader = defineHandler<Props>(() => ({ articles: getArticleList() }))

export const head = defineHead(() =>
  createPageHead({
    path: '/about',
    title: 'About · Liang',
    socialTitle: 'About Liang',
    description:
      'About Liang (liangmiQwQ): open-source work on Vite+, Oxc and Vite DevTools, projects like mo and vp-config, writing, and profiles elsewhere.',
    type: 'profile',
    image: avatarImage,
    graph: [
      {
        '@type': 'ProfilePage',
        url: absoluteUrl('/about'),
        name: 'About Liang',
        mainEntity: { '@id': author['@id'] }
      },
      person
    ]
  })
)
