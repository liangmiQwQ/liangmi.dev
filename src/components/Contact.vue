<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import { useIInfo } from '~/composables/info.ts'
import { getContactUrls } from '~/social.ts'

interface SocialLink {
  key: string
  icon: string
  url: string
  label: string
}

const info = useIInfo()
const contact = info.contact
const urls = getContactUrls(contact)

const map: Record<string, { icon: string; url: string }> = {
  email: { icon: 'i-ph-envelope-duotone', url: urls.email },
  github: { icon: 'i-ph-github-logo-duotone', url: urls.github },
  twitter: { icon: 'i-ph-twitter-logo-duotone', url: urls.twitter },
  youtube: { icon: 'i-ph-youtube-logo-duotone', url: urls.youtube },
  bsky: { icon: 'i-ph-butterfly-duotone', url: urls.bsky },
  bilibili: { icon: 'i-ph-video-duotone', url: urls.bilibili }
}

const socialLinks = Object.entries(contact)
  .map(([key]) => {
    const mapping = map[key]
    if (!mapping) {
      return null
    }
    return {
      key,
      icon: mapping.icon,
      url: mapping.url,
      label: key.charAt(0).toUpperCase() + key.slice(1)
    }
  })
  .filter((link): link is SocialLink => link !== null)
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2 z-10">
    <Button
      v-for="link in socialLinks"
      :key="link.key"
      :href="link.url"
      target="_blank"
      rel="me noopener"
      variant="ghost"
      size="icon"
      :aria-label="link.label"
    >
      <div :class="link.icon" class="text-2xl" />
    </Button>
  </div>
</template>
