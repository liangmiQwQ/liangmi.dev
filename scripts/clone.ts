import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process, { exit } from 'node:process'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const INFO_REPO = process.env.INFO_REPO
const ARTICLE_REPO = process.env.ARTICLE_REPO

if (!GITHUB_TOKEN || !INFO_REPO || !ARTICLE_REPO) {
  console.error('Missing required environment variables in .env')
  exit(1)
}

const contentDir = join(__dirname, '..', 'content')
const meDir = join(__dirname, '..', 'app/assets/me')

if (existsSync(contentDir)) {
  console.log(`Cleaning content directory: ${contentDir}`)
  rmSync(contentDir, { recursive: true, force: true })
}
mkdirSync(contentDir, { recursive: true })

if (existsSync(meDir)) {
  console.log(`Cleaning assets/me directory: ${meDir}`)
  rmSync(meDir, { recursive: true, force: true })
}
mkdirSync(meDir, { recursive: true })

function cloneRepo(repo: string, targetDir: string) {
  const url = `https://${GITHUB_TOKEN}@github.com/${repo}.git`
  console.log(`Cloning ${repo} into ${targetDir}`)
  try {
    execSync(`git clone --depth 1 ${url} ${targetDir}`, { stdio: 'inherit' })

    const toRemove = ['.git', '.vscode', 'LICENSE', 'README.md', '.gitignore']
    for (const item of toRemove) {
      const itemPath = join(targetDir, item)
      if (existsSync(itemPath)) {
        console.log(`Removing ${item}: ${itemPath}`)
        rmSync(itemPath, { recursive: true, force: true })
      }
    }

    console.log(`Successfully cloned ${repo}`)
  }
  catch (error) {
    console.error(`Failed to clone ${repo}:`, error)
    exit(1)
  }
}

cloneRepo(INFO_REPO, meDir)
cloneRepo(ARTICLE_REPO, join(contentDir, 'articles'))

console.log('All repositories cloned successfully')
