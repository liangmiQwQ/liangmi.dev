<script setup lang="ts">
const info = useIInfo()
const isDark = useDark()

const socialLinks = computed(() => {
  const contact = info.contact
  const map: Record<string, { icon: string, url: string }> = {
    email: { icon: 'i-ph-envelope-duotone', url: `mailto:${contact.email}` },
    github: { icon: 'i-ph-github-logo-duotone', url: `https://github.com/${contact.github}` },
    twitter: { icon: 'i-ph-twitter-logo-duotone', url: `https://twitter.com/${contact.twitter}` },
    youtube: { icon: 'i-ph-youtube-logo-duotone', url: `https://youtube.com/@${contact.youtube}` },
    bsky: { icon: 'i-ph-butterfly-duotone', url: `https://bsky.app/profile/${contact.bsky}` },
    bilibili: { icon: 'i-ph-video-duotone', url: `https://space.bilibili.com/${contact.bilibili}` },
  }
  return Object.entries(contact).map(([key]) => {
    const mapping = map[key]
    if (!mapping)
      return null
    return {
      key,
      icon: mapping.icon,
      url: mapping.url,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }
  }).filter(Boolean) as { key: string, icon: string, url: string, label: string }[]
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-12">
    <!-- Circular logo with hover effect -->
    <div class="relative w-48 h-48 rounded-full p-2 overflow-hidden">
      <ClientOnly>
        <img
          v-if="isDark"
          src="~/assets/me/animated-logo.dark.svg"
          width="192"
          height="192"
          class="absolute inset-0 w-full h-full"
        >
        <img
          v-else
          src="~/assets/me/animated-logo.light.svg"
          width="192"
          height="192"
          class="absolute inset-0 w-full h-full"
        >
      </ClientOnly>
    </div>

    <!-- Introduction text -->
    <div class="max-w-2xl text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-semibold tracking-tight">
        <span class="text-primary-light dark:text-primary-dark">{{ info?.name || 'Liang Mi' }}</span>
      </h1>
      <p class="text-lg text-primary-light/70 dark:text-primary-dark/70">
        Placeholder for future content.
      </p>
    </div>

    <!-- Social links -->
    <div class="flex flex-wrap items-center justify-center gap-4">
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
  </div>
</template>
