<script setup lang="ts">
import type { IInfo } from '~/types'

const props = withDefaults(defineProps<{
  info: IInfo
  variant?: 'chip' | 'icon'
}>(), {
  variant: 'chip',
})

const links = computed(() => {
  const c = props.info.contact

  return [
    c.github && { label: 'GitHub', href: `https://github.com/${c.github}`, icon: 'i-ph-github-logo-duotone' },
    c.twitter && { label: 'Twitter', href: `https://x.com/${c.twitter}`, icon: 'i-ph-twitter-logo-duotone' },
    c.email && { label: 'Email', href: `mailto:${c.email}`, icon: 'i-ph-envelope-duotone' },
    c.bsky && { label: 'Bluesky', href: `https://bsky.app/profile/${c.bsky}`, icon: 'i-ph-butterfly-duotone' },
    c.youtube && { label: 'YouTube', href: `https://www.youtube.com/@${c.youtube}`, icon: 'i-ph-youtube-logo-duotone' },
    c.bilibili && { label: 'BiliBili', href: `https://space.bilibili.com/${c.bilibili}`, icon: 'i-ph-television-simple-duotone' },
  ].filter(Boolean) as Array<{ label: string, href: string, icon: string }>
})
</script>

<template>
  <div flex="~ items-center gap-2 wrap">
    <a
      v-for="l in links"
      :key="l.label"
      :href="l.href"
      target="_blank"
      rel="noreferrer"
      class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-2 py-2 text-zinc-700 no-underline hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-700"
    >
      <span :class="l.icon" class="h-5 w-5 text-lg text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
    </a>
  </div>
</template>
