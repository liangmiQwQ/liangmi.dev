import { marked } from 'marked'

export interface ArticleMetadata {
  genre: string
  topic: string
  length: string
  origin: string
  publish?: boolean
}

export interface RenderedArticle {
  html: string
}

interface ArticlePath {
  slug: string
  lang: string
}

const articleFiles = import.meta.glob('/content/articles/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const metadataFiles = import.meta.glob('/content/articles/**/metadata.json', { eager: true, import: 'default' }) as Record<string, ArticleMetadata>

export function getPublishedArticlePaths(): ArticlePath[] {
  return Object.keys(articleFiles).flatMap((path) => {
    const match = path.match(/^\/content\/articles\/([^/]+)\/([^/]+)\.md$/)
    if (!match)
      return []

    const slug = match[1]
    const lang = match[2]
    if (!slug || !lang)
      return []

    const metadata = getArticleMetadata(slug)
    return isPublished(metadata) ? [{ slug, lang }] : []
  })
}

export function getPublishedArticleSlugs(): { slug: string }[] {
  const slugs = new Set(getPublishedArticlePaths()
    .filter(({ slug, lang }) => getArticleMetadata(slug)?.origin === lang)
    .map(({ slug }) => slug))
  return [...slugs].map(slug => ({ slug }))
}

export async function renderPublishedArticle(slug: string, lang?: string): Promise<RenderedArticle | null> {
  const metadata = getArticleMetadata(slug)
  if (!isPublished(metadata))
    return null

  const resolvedLang = lang ?? metadata.origin
  const rawContent = articleFiles[`/content/articles/${slug}/${resolvedLang}.md`]
  if (!rawContent)
    return null

  const html = await marked.parse(rawContent, { gfm: true, breaks: true })
  return { html }
}

function getArticleMetadata(slug: string) {
  return metadataFiles[`/content/articles/${slug}/metadata.json`]
}

// Tree-hole metadata treats a missing publish field as private.
function isPublished(metadata: ArticleMetadata | undefined): metadata is ArticleMetadata {
  return metadata?.publish === true
}
