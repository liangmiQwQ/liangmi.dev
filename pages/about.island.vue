<script setup lang="ts">
import Prose from '~/components/Prose.vue'
import ProseLayout from '~/components/ProseLayout.vue'
import { useIInfo } from '~/composables/info.ts'
import { getContactUrls } from '~/social.ts'

import type { Props } from './about.server.ts'

defineProps<Props>()

const { contact } = useIInfo()
const urls = getContactUrls(contact)

const profiles = [
  { label: 'GitHub', url: urls.github, handle: `@${contact.github}` },
  { label: 'X', url: urls.twitter, handle: `@${contact.twitter}` },
  { label: 'Bluesky', url: urls.bsky, handle: `@${contact.bsky}` },
  { label: 'YouTube', url: urls.youtube, handle: `@${contact.youtube}` },
  { label: 'Bilibili', url: urls.bilibili, handle: '良米良米' },
  { label: 'Email', url: urls.email, handle: contact.email }
]
</script>

<template>
  <ProseLayout>
    <Prose>
      <template #header>
        <h1 class="!mb-8">About</h1>
      </template>

      <p>
        I'm Liang, also known as <a href="https://github.com/liangmiQwQ" rel="me">liangmiQwQ</a> or
        良米, a senior high school freshman and open-source developer from Hangzhou, China, focused
        on frontend and web tooling.
      </p>

      <h2>Open source</h2>
      <ul>
        <li>
          Member of the <a href="https://viteplus.dev/team">Vite+ team</a>, contributing to
          <a href="https://github.com/voidzero-dev/vite-plus">voidzero-dev/vite-plus</a> (<a
            href="https://github.com/voidzero-dev/vite-plus/pulls?q=is%3Apr+author%3AliangmiQwQ"
            >my pull requests</a
          >).
        </li>
        <li>
          Contributor to <a href="https://github.com/oxc-project/oxc">Oxc</a> and
          <a href="https://github.com/vitejs/devtools">Vite DevTools</a>.
        </li>
      </ul>

      <h2>Projects</h2>
      <ul>
        <li>
          <a href="https://github.com/liangmiQwQ/mo">mo</a>: a project manager for open-source
          developers using GitHub.
        </li>
        <li>
          <a href="https://github.com/liangmiQwQ/vp-config">vp-config</a>: unified Vite+ config
          presets for JavaScript development.
        </li>
        <li>
          <a href="https://github.com/liangmiQwQ/oxlint-flat-config">oxlint-flat-config</a>:
          ESLint-style flat config arrays for Oxlint.
        </li>
      </ul>

      <template v-if="articles.length">
        <h2>Writing</h2>
        <ul>
          <li v-for="article in articles" :key="article.slug">
            <a :href="`/articles/${article.slug}`">{{ article.title }}</a>
          </li>
        </ul>
      </template>

      <h2>Elsewhere</h2>
      <ul>
        <li v-for="profile in profiles" :key="profile.label">
          {{ profile.label }}: <a :href="profile.url" rel="me">{{ profile.handle }}</a>
        </li>
      </ul>
    </Prose>
  </ProseLayout>
</template>
