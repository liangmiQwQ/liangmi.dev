<script setup lang="ts">
interface SocialLink {
  key: string
  icon: string
  url: string
  label: string
}

const info = useIInfo()
const contact = info.contact

const map: Record<string, { icon: string, url: string }> = {
  email: { icon: 'i-ph-envelope-duotone', url: `mailto:${contact.email}` },
  github: { icon: 'i-ph-github-logo-duotone', url: `https://github.com/${contact.github}` },
  twitter: { icon: 'i-ph-twitter-logo-duotone', url: `https://twitter.com/${contact.twitter}` },
  youtube: { icon: 'i-ph-youtube-logo-duotone', url: `https://youtube.com/@${contact.youtube}` },
  bsky: { icon: 'i-ph-butterfly-duotone', url: `https://bsky.app/profile/${contact.bsky}` },
  bilibili: { icon: 'i-ph-video-duotone', url: `https://space.bilibili.com/${contact.bilibili}` },
}
const socialLinks = Object.entries(contact).map(([key, _]) => {
  const mapping = map[key]
  if (!mapping)
    return null
  return {
    key,
    icon: mapping.icon,
    url: mapping.url,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }
}).filter((link): link is SocialLink => link !== null)
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2 z-10">
    <UiButton
      v-for="link in socialLinks"
      :key="link.key"
      :href="link.url"
      target="_blank"
      variant="ghost"
      size="icon"
      :aria-label="link.label"
    >
      <div :class="link.icon" class="text-2xl" />
    </UiButton>
  </div>
</template>
