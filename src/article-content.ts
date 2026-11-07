import { Marked } from 'marked'

import { highlightCode } from './highlight.ts'

export interface ArticleHeading {
  depth: number
  id: string
  text: string
}

interface ArticleContent {
  description: string
  headings: ArticleHeading[]
  html: string
  readingMinutes: number
  title: string
  titleHtml: string
}

const marked = new Marked({
  renderer: {
    code: ({ text, lang }) => highlightCode(text, lang?.split(/\s/)[0])
  }
})

export function renderArticleContent(rawContent: string): ArticleContent {
  const renderedHtml = marked.parse(rawContent, { async: false, gfm: true, breaks: true })
  const titleMatch = /^<h1>(.*?)<\/h1>\n?/s.exec(renderedHtml)
  const bodyHtml = titleMatch ? renderedHtml.slice(titleMatch[0].length) : renderedHtml
  const { html, headings } = anchorHeadings(bodyHtml)
  const titleHtml = titleMatch?.[1] ?? ''
  const title = plainText(titleHtml)
  const description = Array.from(html.matchAll(/<p>(.*?)<\/p>/gs), match =>
    plainText(match[1] ?? '')
  ).find(Boolean)

  return {
    description: truncate(description ?? '', 180) || title,
    headings,
    html,
    readingMinutes: estimateReadingMinutes(rawContent),
    title,
    titleHtml
  }
}

function anchorHeadings(html: string) {
  const headings: ArticleHeading[] = []
  const usedIds = new Map<string, number>()

  const anchoredHtml = html.replaceAll(
    /<h([2-4])>(.*?)<\/h\1>/gs,
    (_match, depth: string, inner: string) => {
      const text = plainText(inner)
      const id = uniqueId(slugify(text), usedIds)
      headings.push({ depth: Number(depth), id, text })
      return `<h${depth} id="${id}"><a class="header-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${inner}</h${depth}>`
    }
  )

  return { html: anchoredHtml, headings }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, '-')
    .replaceAll(/^-|-$/g, '')
}

function uniqueId(slug: string, usedIds: Map<string, number>) {
  const base = slug || 'section'
  const count = usedIds.get(base) ?? 0
  usedIds.set(base, count + 1)
  return count ? `${base}-${count}` : base
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
