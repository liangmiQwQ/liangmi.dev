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
    c.github && { label: 'GitHub', href: `https://github.com/${c.github}`, icon: 'i-ph-github-logo' },
    c.email && { label: 'Email', href: `mailto:${c.email}`, icon: 'i-ph-envelope-simple' },
    c.twitter && { label: 'X', href: `https://x.com/${c.twitter}`, icon: 'i-ph-x-logo' },
    c.bsky && { label: 'Bluesky', href: `https://bsky.app/profile/${c.bsky}`, icon: 'i-ph-cloud' },
    c.youtube && { label: 'YouTube', href: `https://www.youtube.com/@${c.youtube}`, icon: 'i-ph-youtube-logo' },
    c.bilibili && { label: 'BiliBili', href: `https://space.bilibili.com/${c.bilibili}`, icon: 'i-ph-play-circle' },
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
      class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-13px text-zinc-700 no-underline hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-700"
    >
      <span :class="l.icon" class="h-4 w-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
      <span v-if="variant === 'chip'">{{ l.label }}</span>
    </a>
  </div>
</template>
