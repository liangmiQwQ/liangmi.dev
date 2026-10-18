import type { RenderedArticle } from '~/articles.ts'
import { getArticlePath, getPublishedArticleLangs } from '~/articles.ts'
import { absoluteUrl, author, createPageHead } from '~/seo.ts'

export function createArticleHead(article: RenderedArticle) {
  const path = getArticlePath(article.slug, article.lang)
  const image = {
    url: absoluteUrl(`/social/articles/${article.slug}/${article.lang}.jpg`),
    type: 'image/jpeg',
    width: 1200,
    height: 630,
    alt: `Starry sky preview for ${article.title}`
  }
  const head = createPageHead({
    path,
    title: `${article.title} · Liang`,
    socialTitle: article.title,
    description: article.description,
    type: 'article',
    image,
    graph: [
      {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        image: image.url,
        inLanguage: article.lang,
        url: absoluteUrl(path),
        mainEntityOfPage: absoluteUrl(path),
        datePublished: article.date,
        author
      }
    ]
  })

  return {
    ...head,
    htmlAttrs: { lang: article.lang },
    link: [...head.link, ...createLanguageLinks(article.slug)],
    meta: [
      ...head.meta,
      ...(article.date
        ? [{ property: 'article:published_time', content: `${article.date}T00:00:00.000Z` }]
        : [])
    ]
  }
}

function createLanguageLinks(slug: string) {
  const langs = getPublishedArticleLangs(slug)
  if (langs.length < 2) {
    return []
  }

  return langs.map(lang => ({
    rel: 'alternate',
    hreflang: lang,
    href: absoluteUrl(getArticlePath(slug, lang))
  }))
}
