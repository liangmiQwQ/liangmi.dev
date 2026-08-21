import type { RenderedArticle } from '~/articles'
import { defineHandler } from 'void'
import { getPublishedArticlePaths, renderPublishedArticle } from '~/articles'

export const prerender = true

export type Props = RenderedArticle

export async function getPrerenderPaths() {
  return getPublishedArticlePaths()
}

export const loader = defineHandler(async (c) => {
  const { slug, lang } = c.req.param()
  return await renderPublishedArticle(slug, lang) ?? c.notFound()
})
