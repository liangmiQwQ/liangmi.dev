<script setup lang="ts">
import type { IInfo } from '~/types'

const props = defineProps<{
  info: IInfo
}>()

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
      :aria-label="l.label"
      class="inline-flex items-center gap-2 rounded-full border border-stone-200 px-2.5 py-2.5 text-stone-600 no-underline transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:border-stone-800 dark:text-stone-400 dark:hover:border-amber-900/60 dark:hover:bg-amber-950/30 dark:hover:text-amber-400"
    >
      <span :class="l.icon" class="h-5 w-5" aria-hidden="true" />
    </a>
  </div>
</template>
