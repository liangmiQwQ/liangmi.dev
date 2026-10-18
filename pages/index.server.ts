import { defineHead } from 'void'

import {
  absoluteUrl,
  author,
  avatarImage,
  createPageHead,
  person,
  personDescription
} from '~/seo.ts'

export const head = defineHead(() =>
  createPageHead({
    path: '/',
    title: 'Liang (liangmiQwQ)',
    socialTitle: 'Liang (liangmiQwQ)',
    description: personDescription,
    type: 'website',
    image: avatarImage,
    graph: [
      { '@type': 'WebSite', url: absoluteUrl('/'), name: 'Liang', inLanguage: 'en', author },
      person
    ]
  })
)
