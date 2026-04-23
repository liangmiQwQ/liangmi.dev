export interface ArticleMetadata {
  genre: string
  topic: string
  length: string
  origin: string
}

export const articleFiles = import.meta.glob('/content/articles/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
export const metadataFiles = import.meta.glob('/content/articles/**/metadata.json', { eager: true, import: 'default' }) as Record<string, ArticleMetadata>
