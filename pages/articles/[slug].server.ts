import type { RenderedArticle } from '~/articles'
import { defineHandler } from 'void'
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
