export interface ArticleMetadata {
  genre: string
  topic: string
  length: string
  origin: string
}

export const articleFiles = import.meta.glob('/content/articles/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
export const metadataFiles = import.meta.glob('/content/articles/**/metadata.json', { eager: true, import: 'default' }) as Record<string, ArticleMetadata>

export interface ArticleListing {
  slug: string
  title: string
  year: string | null
  metadata: ArticleMetadata | null
  defaultLang: string
}

function deriveTitle(slug: string, raw: string | undefined): string {
  if (raw) {
    const match = raw.match(/^# ([^\n]+)$/m)
    if (match)
      return match[1]!.trim()
  }
  return slug.replace(/^\d{4}-/, '').replace(/-/g, ' ')
}

export function listArticles(): ArticleListing[] {
  const slugs = new Set<string>()
  for (const path of Object.keys(articleFiles)) {
    const match = path.match(/\/content\/articles\/([^/]+)\//)
    if (match)
      slugs.add(match[1]!)
  }

  const items: ArticleListing[] = []
  for (const slug of slugs) {
    const metadata = metadataFiles[`/content/articles/${slug}/metadata.json`] ?? null
    const defaultLang = metadata?.origin ?? (articleFiles[`/content/articles/${slug}/en.md`] ? 'en' : 'zh')
    const raw = articleFiles[`/content/articles/${slug}/${defaultLang}.md`]
    const yearMatch = slug.match(/^(\d{4})-/)
    items.push({
      slug,
      title: deriveTitle(slug, raw),
      year: yearMatch ? yearMatch[1]! : null,
      metadata,
      defaultLang,
    })
  }

  return items.sort((a, b) => {
    if (a.year && b.year && a.year !== b.year)
      return b.year.localeCompare(a.year)
    if (a.year && !b.year)
      return -1
    if (!a.year && b.year)
      return 1
    return a.slug.localeCompare(b.slug)
  })
}
