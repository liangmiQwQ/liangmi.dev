<script setup lang="ts">
import { computed } from 'vue'

interface IInfo {
  'name': string
  'website': string
  'email': string
  'social-media': {
    twitter: string
    youtube: string
    github: string
    bsky: string
    bilibili: string
  }
}

interface SocialLink {
  key: string
  icon: string
  url: string
  label: string
}

const { data: info } = await useFetch<IInfo>('/i.json')
const email = info.value?.email
const socialMedia = info.value?.['social-media']

const socialLinks = computed<SocialLink[]>(() => {
  if (!socialMedia)
    return []
  const map: Record<string, { icon: string, url: string }> = {
    twitter: { icon: 'i-ph-twitter-logo-duotone', url: `https://twitter.com/${socialMedia.twitter}` },
    youtube: { icon: 'i-ph-youtube-logo-duotone', url: `https://youtube.com/@${socialMedia.youtube}` },
    github: { icon: 'i-ph-github-logo-duotone', url: `https://github.com/${socialMedia.github}` },
    bsky: { icon: 'i-ph-chat-circle-duotone', url: `https://bsky.app/profile/${socialMedia.bsky}` },
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
      class="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 animate-fade-in-up"
    >
      <Logo :size="192" class="absolute inset-0 w-full h-full" />
    </div>

    <!-- Introduction text -->
    <div class="max-w-2xl text-center space-y-4 animate-fade-in-up animation-delay-100">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
        Hi, I'm <span class="text-primary-light dark:text-primary-dark">{{ info?.name || 'Liang Mi' }}</span>
      </h1>
      <p class="text-lg text-primary-light/70 dark:text-primary-dark/70">
        Welcome to my personal space on the web. I write about tech, design, and other curiosities.
      </p>
      <p class="text-base text-primary-light/60 dark:text-primary-dark/60">
        Feel free to reach out via email or connect on social media.
      </p>
    </div>

    <!-- Email button -->
    <div class="flex items-center gap-4 animate-fade-in-up animation-delay-200">
      <Button
        v-if="email"
        :href="`mailto:${email}`"
        variant="outline"
        size="icon"
        aria-label="Email"
        class="hover:scale-110 transition-transform"
      >
        <div class="i-ph-envelope-duotone text-2xl" />
      </Button>
      <span class="text-primary-light/80 dark:text-primary-dark/80">{{ email }}</span>
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
