<script setup lang="ts">
import { computed } from 'vue'

interface SocialLink {
  key: string
  icon: string
  url: string
  label: string
}

const info = await useIInfo()
const socialMedia = info.value['social-media']

const socialLinks = computed<SocialLink[]>(() => {
  if (!socialMedia)
    return []
  const map: Record<string, { icon: string, url: string }> = {
    email: { icon: 'i-ph-envelope-duotone', url: `mailto:${socialMedia.email}` },
    github: { icon: 'i-ph-github-logo-duotone', url: `https://github.com/${socialMedia.github}` },
    twitter: { icon: 'i-ph-twitter-logo-duotone', url: `https://twitter.com/${socialMedia.twitter}` },
    youtube: { icon: 'i-ph-youtube-logo-duotone', url: `https://youtube.com/@${socialMedia.youtube}` },
    bsky: { icon: 'i-ph-butterfly-duotone', url: `https://bsky.app/profile/${socialMedia.bsky}` },
    bilibili: { icon: 'i-ph-video-duotone', url: `https://space.bilibili.com/${socialMedia.bilibili}` },
  }
  return Object.entries(socialMedia).map(([key, _]) => {
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
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-12">
    <!-- Circular logo with hover effect -->
    <div
      class="relative w-48 h-48 rounded-full overflow-hidden animate-fade-in-up"
    >
      <Logo :size="192" class="absolute inset-0 w-full h-full" />
    </div>

    <!-- Introduction text -->
    <div class="max-w-2xl text-center space-y-4 animate-fade-in-up animation-delay-100">
      <h1 class="text-4xl md:text-5xl font-semibold tracking-tight">
        <span class="text-primary-light dark:text-primary-dark">{{ info?.name || 'Liang Mi' }}</span>
      </h1>
      <p class="text-lg text-primary-light/70 dark:text-primary-dark/70">
        Placeholder for future content.
      </p>
    </div>

    <!-- Social links -->
    <div class="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
      <Button
        v-for="(link, index) in socialLinks"
        :key="link.key"
        :href="link.url"
        target="_blank"
        variant="ghost"
        size="icon"
        :aria-label="link.label"
        class="hover:scale-110 transition-transform"
        :style="`animation-delay: ${index * 50 + 300}ms`"
      >
        <div :class="link.icon" class="text-2xl" />
      </Button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-100 {
  animation-delay: 100ms;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}
</style>
