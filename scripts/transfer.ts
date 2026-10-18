/* oxlint-disable node/no-sync -- Build scripts intentionally finish filesystem steps in order. */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

import toIco from 'to-ico'

async function main() {
  const publicDir = join(import.meta.dirname, '..', 'public')
  if (existsSync(publicDir)) {
    console.log(`Cleaning public directory: ${publicDir}`)
    rmSync(publicDir, { recursive: true, force: true })
  }
  mkdirSync(publicDir, { recursive: true })

  const meDir = join(import.meta.dirname, '..', 'src/assets/me')
  if (existsSync(meDir)) {
    console.log(`Generating favicon.ico from avatar.png in ${meDir}`)
    const avatarPath = join(meDir, 'avatar.png')
    if (existsSync(avatarPath)) {
      const pngBuffer = readFileSync(avatarPath)
      const icoBuffer = await toIco([pngBuffer], { resize: true })
      writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer)
      console.log('favicon.ico generated successfully')
    } else {
      console.warn(`avatar.png not found at ${avatarPath}`)
    }
  } else {
    console.warn(`me directory not found at ${meDir}`)
  }
}

try {
  await main()
} catch (error) {
  console.error('Error in update script:', error)
  process.exit(1)
}
