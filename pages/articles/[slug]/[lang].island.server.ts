import type { ArticleMetadata } from '~/articles'
import { marked } from 'marked'
import { defineHandler } from 'void'
import { articleFiles, metadataFiles } from '~/articles'

export const prerender = true

export interface Props {
  slug: string
  lang: string
  html: string
  metadata: ArticleMetadata | null
}

export async function getPrerenderPaths() {
  const paths: { slug: string, lang: string }[] = []
  for (const path of Object.keys(articleFiles)) {
    const match = path.match(/\/content\/articles\/([^/]+)\/(en|zh)\.md$/)
    if (match)
      paths.push({ slug: match[1]!, lang: match[2]! })
  }
  return paths
}

export const loader = defineHandler(async (c) => {
  const { slug, lang } = c.req.param()
  const filePath = `/content/articles/${slug}/${lang}.md`
  const rawContent = articleFiles[filePath]

  if (!rawContent)
    throw new Error(`Article ${slug}/${lang} not found`)

  const html = await marked.parse(rawContent, { gfm: true, breaks: true })
  const metadata = metadataFiles[`/content/articles/${slug}/metadata.json`] ?? null

  return { slug, lang, html, metadata }
})
