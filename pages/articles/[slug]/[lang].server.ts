import type { RenderedArticle } from '~/articles'
import { defineHandler, defineHead } from 'void'
import { createArticleHead } from '~/article-head'
import { getPublishedArticlePaths, renderPublishedArticle } from '~/articles'

export const prerender = true

export type Props = RenderedArticle

export function getPrerenderPaths() {
  return getPublishedArticlePaths()
}

export const loader = defineHandler((c) => {
  const { slug, lang } = c.req.param()
  return renderPublishedArticle(slug, lang) ?? c.notFound()
})

export const head = defineHead<Props>((c, article) => createArticleHead(c.req.path, article))
