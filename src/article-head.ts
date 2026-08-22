import type { RenderedArticle } from '~/articles'

const siteUrl = 'https://liangmi.dev'

export function createArticleHead(path: string, article: RenderedArticle) {
  const url = new URL(path, siteUrl).href
  const image = new URL(`/social/articles/${article.slug}/${article.lang}.jpg`, siteUrl).href
  const imageAlt = `Starry sky preview for ${article.title}`

  return {
    title: `${article.title} · Liang`,
    htmlAttrs: { lang: article.lang },
    link: [
      { rel: 'canonical', href: url },
    ],
    meta: [
      { name: 'description', content: article.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:site_name', content: 'Liang' },
      { property: 'og:title', content: article.title },
      { property: 'og:description', content: article.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: imageAlt },
      ...(article.date ? [{ property: 'article:published_time', content: `${article.date}T00:00:00.000Z` }] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@liangmiQwQ' },
      { name: 'twitter:title', content: article.title },
      { name: 'twitter:description', content: article.description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: imageAlt },
    ],
  }
}
