import { useIInfo } from '~/composables/info'
import { getContactUrls } from '~/social'

interface SocialImage {
  url: string
  type: string
  width: number
  height: number
  alt: string
}

interface PageHead {
  path: string
  title: string
  socialTitle: string
  description: string
  type: 'website' | 'profile' | 'article'
  image: SocialImage
  graph: object[]
}

export const siteUrl = 'https://liangmi.dev'

export const personDescription = 'Liang (liangmiQwQ) is a student open-source developer from Hangzhou, China, and a member of the Vite+ team.'

export const author = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  'name': 'Liang',
  'url': `${siteUrl}/`,
}

export const avatarImage: SocialImage = {
  url: `${siteUrl}/social/avatar.png`,
  type: 'image/png',
  width: 512,
  height: 512,
  alt: 'Liang\'s avatar',
}

export const person = createPerson()

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).href
}

export function createPageHead(page: PageHead) {
  const url = absoluteUrl(page.path)
  const { image } = page

  return {
    title: page.title,
    link: [
      { rel: 'canonical', href: url },
    ],
    meta: [
      { name: 'description', content: page.description },
      { name: 'author', content: author.name },
      { property: 'og:type', content: page.type },
      { property: 'og:site_name', content: 'Liang' },
      { property: 'og:title', content: page.socialTitle },
      { property: 'og:description', content: page.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image.url },
      { property: 'og:image:type', content: image.type },
      { property: 'og:image:width', content: String(image.width) },
      { property: 'og:image:height', content: String(image.height) },
      { property: 'og:image:alt', content: image.alt },
      { name: 'twitter:card', content: image.width > image.height ? 'summary_large_image' : 'summary' },
      { name: 'twitter:creator', content: '@liangmiQwQ' },
      { name: 'twitter:title', content: page.socialTitle },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: image.url },
      { name: 'twitter:image:alt', content: image.alt },
    ],
    script: [
      createJsonLdScript({ '@context': 'https://schema.org', '@graph': page.graph }),
    ],
  }
}

function createPerson() {
  const urls = getContactUrls(useIInfo().contact)

  return {
    ...author,
    alternateName: ['Liang Mi', 'liangmiQwQ', '良米'],
    description: personDescription,
    image: avatarImage.url,
    sameAs: [urls.github, urls.twitter, urls.bsky, urls.youtube, urls.bilibili],
    memberOf: {
      '@type': 'Organization',
      'name': 'Vite+ team',
      'url': 'https://viteplus.dev/team',
    },
  }
}

function createJsonLdScript(data: object) {
  // Void injects innerHTML verbatim, so escape "<" to keep a "</script>" inside a title from closing the tag.
  return { type: 'application/ld+json', innerHTML: JSON.stringify(data).replaceAll('<', '\\u003c') }
}
