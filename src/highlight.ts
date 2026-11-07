import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import javascript from 'shiki/langs/javascript.mjs'
import json from 'shiki/langs/json.mjs'
import shellscript from 'shiki/langs/shellscript.mjs'
import typescript from 'shiki/langs/typescript.mjs'
import yaml from 'shiki/langs/yaml.mjs'
import vitesseDark from 'shiki/themes/vitesse-dark.mjs'
import vitesseLight from 'shiki/themes/vitesse-light.mjs'

// A sync highlighter keeps article rendering sync; add a language here when an article needs it.
const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  langs: [javascript, json, shellscript, typescript, yaml],
  themes: [vitesseLight, vitesseDark]
})

export function highlightCode(code: string, lang = '') {
  return highlighter.codeToHtml(code, {
    lang: highlighter.getLoadedLanguages().includes(lang) ? lang : 'text',
    themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
    // Prose styles the block and picks the token color from these CSS variables.
    defaultColor: false,
    transformers: [
      {
        pre(node) {
          delete node.properties.class
          delete node.properties.style
        }
      }
    ]
  })
}
