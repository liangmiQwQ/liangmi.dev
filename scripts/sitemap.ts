/* oxlint-disable node/no-sync -- Build scripts intentionally finish filesystem steps in order. */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface ArticleMetadata {
  origin: string
  publish?: boolean
}

const siteUrl = 'https://liangmi.dev'
const rootDir = join(import.meta.dirname, '..')
const articlesDir = join(rootDir, 'content/articles')
const publicDir = join(rootDir, 'public')

const paths = ['/', '/about', ...getArticlePaths()]
const urls = paths.map(path => `  <url><loc>${new URL(path, siteUrl).href}</loc></url>`)

mkdirSync(publicDir, { recursive: true })
writeFileSync(
  join(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
)
writeFileSync(
  join(publicDir, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
)

console.log(`Sitemap generated with ${paths.length} URLs`)

// Mirrors getArticlePath in src/articles.ts, which relies on import.meta.glob and cannot run outside Vite.
function getArticlePaths() {
  return readdirSync(articlesDir, { withFileTypes: true }).flatMap(entry => {
    if (!entry.isDirectory()) {
      return []
    }

    const articleDir = join(articlesDir, entry.name)
    const metadata = JSON.parse(
      readFileSync(join(articleDir, 'metadata.json'), 'utf8')
    ) as ArticleMetadata
    if (metadata.publish !== true) {
      return []
    }

    return readdirSync(articleDir)
      .filter(file => file.endsWith('.md'))
      .map(file => file.slice(0, -3))
      .map(lang =>
        lang === metadata.origin ? `/articles/${entry.name}` : `/articles/${entry.name}/${lang}`
      )
  })
}
