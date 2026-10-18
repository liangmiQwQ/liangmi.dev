import { defineHandler, defineHead } from 'void'

import { createArticleHead } from '~/article-head.ts'
import type { RenderedArticle } from '~/articles.ts'
import { getPublishedArticleSlugs, renderPublishedArticle } from '~/articles.ts'

export const prerender = true

export type Props = RenderedArticle

export function getPrerenderPaths() {
  return getPublishedArticleSlugs()
}

export const loader = defineHandler(c => {
  const { slug } = c.req.param()
  if (!slug) {
    return c.notFound()
  }
  return renderPublishedArticle(slug) ?? c.notFound()
})

export const head = defineHead<Props>((_c, article) => createArticleHead(article))
