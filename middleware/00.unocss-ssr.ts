import { createGenerator } from 'unocss'
import { defineMiddleware } from 'void'
import unoConfig from '../uno.config'

const generator = await createGenerator(unoConfig)

export default defineMiddleware(async (c, next) => {
  await next()
  if (!import.meta.env.DEV)
    return
  if (!c.res.headers.get('content-type')?.includes('text/html'))
    return
  const html = await c.res.text()
  const { css } = await generator.generate(html)
  c.res = new Response(
    html.replace('</head>', `<style>${css}</style></head>`),
    { headers: c.res.headers },
  )
})
