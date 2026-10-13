import { defineHandler, defineHead } from 'void'
import { getPublishedArticleSlugs, renderPublishedArticle } from '~/articles'
import { absoluteUrl, author, avatarImage, createPageHead, person } from '~/seo'

export interface Props {
  articles: { slug: string, title: string, date?: string }[]
}

export const loader = defineHandler<Props>(() => {
  const articles = getPublishedArticleSlugs()
    .flatMap(({ slug }) => renderPublishedArticle(slug) ?? [])
    .map(({ slug, title, date }) => ({ slug, title, date }))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

  return { articles }
})

export const head = defineHead(() => createPageHead({
  path: '/about',
  title: 'About · Liang',
  socialTitle: 'About Liang',
  description: 'About Liang (liangmiQwQ): open-source work on Vite+, Oxc and Vite DevTools, personal projects, writing, and profiles elsewhere.',
  type: 'profile',
  image: avatarImage,
  graph: [
    { '@type': 'ProfilePage', 'url': absoluteUrl('/about'), 'name': 'About Liang', 'mainEntity': { '@id': author['@id'] } },
    person,
  ],
}))
