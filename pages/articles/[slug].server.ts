import type { RenderedArticle } from '~/articles'
import { defineHandler } from 'void'
import { getPublishedArticleSlugs, renderPublishedArticle } from '~/articles'

export const prerender = true

export type Props = RenderedArticle

export async function getPrerenderPaths() {
  return getPublishedArticleSlugs()
}

export const loader = defineHandler(async (c) => {
  const { slug } = c.req.param()
  return await renderPublishedArticle(slug) ?? c.notFound()
})
