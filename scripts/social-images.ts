import { Buffer } from 'node:buffer'
import { mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { renderArticleContent } from '../src/article-content'

interface ArticleMetadata {
  date?: string
  publish?: boolean
}

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const articlesDir = join(rootDir, 'content/articles')
const avatarPath = join(rootDir, 'src/assets/me/avatar.png')
const sourcePath = join(rootDir, 'src/assets/social/article-preview.png')
const socialDir = join(rootDir, 'public/social')
const outputDir = join(socialDir, 'articles')

rmSync(socialDir, { recursive: true, force: true })

const background = await sharp(sourcePath)
  // Keep the star cluster on the right, cropping the left edge first when necessary.
  .resize(1200, 630, { fit: 'cover', position: 'right' })
  .png()
  .toBuffer()
const avatar = await sharp(avatarPath)
  .resize(72, 72, { fit: 'cover' })
  .png()
  .toBuffer()
const avatarDataUrl = `data:image/png;base64,${avatar.toString('base64')}`

await Promise.all(readdirSync(articlesDir, { withFileTypes: true }).flatMap((entry) => {
  if (!entry.isDirectory())
    return []

  const articleDir = join(articlesDir, entry.name)
  const metadata = JSON.parse(readFileSync(join(articleDir, 'metadata.json'), 'utf8')) as ArticleMetadata
  if (metadata.publish !== true)
    return []

  return readdirSync(articleDir)
    .filter(file => file.endsWith('.md'))
    .map(async (file) => {
      const lang = file.slice(0, -3)
      const rawContent = readFileSync(join(articleDir, file), 'utf8')
      const article = renderArticleContent(rawContent)
      const destinationDir = join(outputDir, entry.name)

      mkdirSync(destinationDir, { recursive: true })
      await sharp(background)
        .composite([{ input: Buffer.from(createTextOverlay({
          date: metadata.date,
          lang,
          readingMinutes: article.readingMinutes,
          title: article.title,
        })) }])
        .removeAlpha()
        .jpeg({ quality: 90 })
        .toFile(join(destinationDir, `${lang}.jpg`))
    })
}))

console.log('Social preview images generated successfully')

function createTextOverlay(article: {
  date?: string
  lang: string
  readingMinutes: number
  title: string
}) {
  const { fontSize, lines } = layoutTitle(article.title)
  const lineHeight = fontSize + 10
  const titleStartY = 312 - (lines.length - 1) * lineHeight / 2
  const metadataY = titleStartY + (lines.length - 1) * lineHeight + 58
  const title = lines
    .map((line, index) => `<tspan x="72" y="${titleStartY + index * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('')
  const details = [
    article.date && new Intl.DateTimeFormat(article.lang, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${article.date}T00:00:00Z`)),
    `${article.readingMinutes} MIN READ`,
    article.lang.toUpperCase(),
  ].filter(Boolean).join('  ·  ')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="shade" x1="0" x2="1">
        <stop offset="0" stop-color="#000" stop-opacity="0.5"/>
        <stop offset="0.62" stop-color="#000" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#000" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="avatar"><circle cx="1092" cy="92" r="36"/></clipPath>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <text fill="#fff" font-family="Inter Tight, Noto Sans CJK SC, PingFang SC, Microsoft YaHei, Arial, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="-1">${title}</text>
    <text x="72" y="${metadataY}" fill="#fff" fill-opacity="0.8" font-family="Arial, sans-serif" font-size="26" font-weight="500" letter-spacing="1.5">${escapeXml(details)}</text>
    <image href="${avatarDataUrl}" x="1056" y="56" width="72" height="72" clip-path="url(#avatar)" preserveAspectRatio="xMidYMid slice"/>
    <circle cx="1092" cy="92" r="36" fill="none" stroke="#fff" stroke-opacity="0.35"/>
  </svg>`
}

function layoutTitle(title: string) {
  for (const fontSize of [84, 78, 70]) {
    const lines = wrapText(title, 920, fontSize)
    if (lines.length <= 3)
      return { fontSize, lines }
  }

  const fontSize = 64
  const lines = wrapText(title, 920, fontSize).slice(0, 3)
  lines[2] = `${lines[2]?.replace(/[\s,.!?;:，。！？；：]*$/u, '')}…`
  return { fontSize, lines }
}

function wrapText(text: string, maxWidth: number, fontSize: number) {
  const segments = Array.from(new Intl.Segmenter(undefined, { granularity: 'word' }).segment(text), item => item.segment)
  const lines: string[] = []
  let line = ''

  for (const segment of segments) {
    const candidate = `${line}${segment}`
    if (!line || estimateWidth(candidate, fontSize) <= maxWidth) {
      line = candidate
      continue
    }

    lines.push(line.trim())
    line = segment.trimStart()
  }

  if (line)
    lines.push(line.trim())

  return lines
}

function estimateWidth(text: string, fontSize: number) {
  // SVG text metrics are unavailable before rendering; these ratios keep wrapping deterministic across build machines.
  return Array.from(text).reduce((width, character) => {
    if (/\s/u.test(character))
      return width + fontSize * 0.3
    if (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(character))
      return width + fontSize
    if (/\p{Lu}/u.test(character))
      return width + fontSize * 0.68
    if (/\p{Ll}|\p{N}/u.test(character))
      return width + fontSize * 0.55
    return width + fontSize * 0.4
  }, 0)
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;')
}
