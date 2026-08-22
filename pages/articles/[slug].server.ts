import type { RenderedArticle } from '~/articles'
import { defineHandler, defineHead } from 'void'
import { createArticleHead } from '~/article-head'
import { getPublishedArticleSlugs, renderPublishedArticle } from '~/articles'

export const prerender = true

export type Props = RenderedArticle

export function getPrerenderPaths() {
  return getPublishedArticleSlugs()
}

export const loader = defineHandler((c) => {
  const { slug } = c.req.param()
  return renderPublishedArticle(slug) ?? c.notFound()
})

export const head = defineHead<Props>((c, article) => createArticleHead(c.req.path, article))
