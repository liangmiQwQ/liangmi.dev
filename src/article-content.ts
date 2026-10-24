import { marked } from 'marked'

interface ArticleContent {
  description: string
  html: string
  readingMinutes: number
  title: string
  titleHtml: string
}

export function renderArticleContent(rawContent: string): ArticleContent {
  const renderedHtml = marked.parse(rawContent, { async: false, gfm: true, breaks: true })
  const titleMatch = /^<h1>(.*?)<\/h1>\n?/s.exec(renderedHtml)
  const html = titleMatch ? renderedHtml.slice(titleMatch[0].length) : renderedHtml
  const titleHtml = titleMatch?.[1] ?? ''
  const title = plainText(titleHtml)
  const description = Array.from(html.matchAll(/<p>(.*?)<\/p>/gs), match =>
    plainText(match[1] ?? '')
  ).find(Boolean)

  return {
    description: truncate(description ?? '', 180) || title,
    html,
    readingMinutes: estimateReadingMinutes(rawContent),
    title,
    titleHtml
  }
}

function plainText(html: string) {
  return decodeEntities(html.replaceAll(/<[^>]+>/g, ' '))
    .replaceAll(/\s+/g, ' ')
    .trim()
}

function decodeEntities(value: string) {
  const namedEntities: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    quot: '"'
  }

  return value.replaceAll(/&(#\d+|#x[\da-f]+|amp|apos|gt|lt|quot);/gi, (match, entity: string) => {
    if (!entity.startsWith('#')) {
      return namedEntities[entity.toLowerCase()] ?? match
    }

    const hexadecimal = entity[1]?.toLowerCase() === 'x'
    const codePoint = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10)
    return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint)
  })
}

function truncate(value: string, maxLength: number) {
  // oxlint-disable-next-line typescript/no-misused-spread -- Descriptions retain the existing code-point length limit.
  const characters = [...value]
  if (characters.length <= maxLength) {
    return value
  }

  const shortened = characters.slice(0, maxLength - 1).join('')
  const lastSpace = shortened.lastIndexOf(' ')
  return `${lastSpace > maxLength * 0.7 ? shortened.slice(0, lastSpace) : shortened}…`
}

function estimateReadingMinutes(content: string) {
  const text = content
    .replaceAll(/```[\s\S]*?```/g, ' ')
    .replaceAll(/`[^`]*`/g, ' ')
    .replaceAll(/https?:\/\/\S+/g, ' ')
  const cjkCharacters =
    text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu)
      ?.length ?? 0
  const words =
    text
      .replaceAll(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu, ' ')
      .match(/\p{L}+(?:['’]\p{L}+)*|\p{N}+/gu)?.length ?? 0

  return Math.max(1, Math.ceil(words / 200 + cjkCharacters / 400))
}
