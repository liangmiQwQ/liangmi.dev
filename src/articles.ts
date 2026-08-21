import { marked } from 'marked'

export interface ArticleMetadata {
  genre: string
  topic: string
  length: string
  origin: string
  date?: string
  publish?: boolean
}

export interface RenderedArticle {
  date?: string
  html: string
  readingMinutes: number
  titleHtml: string
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
  return getPublishedArticlePaths()
    .filter(({ slug, lang }) => getArticleMetadata(slug)?.origin === lang)
    .map(({ slug }) => ({ slug }))
}

export function renderPublishedArticle(slug: string, lang?: string): RenderedArticle | null {
  const metadata = getArticleMetadata(slug)
  if (!isPublished(metadata))
    return null

  const resolvedLang = lang ?? metadata.origin
  const rawContent = articleFiles[`/content/articles/${slug}/${resolvedLang}.md`]
  if (!rawContent)
    return null

  const renderedHtml = marked.parse(rawContent, { async: false, gfm: true, breaks: true })
  const titleMatch = renderedHtml.match(/^<h1>(.*?)<\/h1>\n?/s)

  return {
    date: metadata.date,
    html: titleMatch ? renderedHtml.slice(titleMatch[0].length) : renderedHtml,
    readingMinutes: estimateReadingMinutes(rawContent),
    titleHtml: titleMatch?.[1] ?? '',
  }
}

function getArticleMetadata(slug: string) {
  return metadataFiles[`/content/articles/${slug}/metadata.json`]
}

// Tree-hole metadata treats a missing publish field as private.
function isPublished(metadata: ArticleMetadata | undefined): metadata is ArticleMetadata {
  return metadata?.publish === true
}

function estimateReadingMinutes(content: string) {
  const text = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
  const cjkCharacters = text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu)?.length ?? 0
  const words = text
    .replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu, ' ')
    .match(/\p{L}+(?:['’]\p{L}+)*|\p{N}+/gu)
    ?.length ?? 0

  return Math.max(1, Math.ceil(words / 200 + cjkCharacters / 400))
}
