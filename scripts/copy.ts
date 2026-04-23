import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const meDir = join(__dirname, '..', 'src/assets/me')
const infoDir = join(__dirname, '..', 'content/info')

if (!existsSync(meDir)) {
  console.error(`me directory not found at ${meDir}`)
  process.exit(1)
}

if (!existsSync(infoDir)) {
  console.log(`Creating info directory: ${infoDir}`)
  mkdirSync(infoDir, { recursive: true })
}

function copyMdFiles(src: string, dest: string) {
  const items = readdirSync(src)
  for (const item of items) {
    const srcPath = join(src, item)
    const destPath = join(dest, item)
    const stat = statSync(srcPath)
    if (stat.isDirectory()) {
      mkdirSync(destPath, { recursive: true })
      copyMdFiles(srcPath, destPath)
    }
    else if (extname(item) === '.md') {
      console.log(`Copying ${srcPath} to ${destPath}`)
      copyFileSync(srcPath, destPath)
    }
  }
}

console.log(`Copying .md files from ${meDir} to ${infoDir}`)
copyMdFiles(meDir, infoDir)
console.log('Copy completed successfully')
