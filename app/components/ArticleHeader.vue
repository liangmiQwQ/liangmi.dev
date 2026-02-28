<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  date?: string
  genre?: string
  topic?: string
  length?: string
  status?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Untitled',
})

function formatDate(dateStr: string): string {
  if (!dateStr)
    return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getLengthLabel(length?: string): string {
  if (!length)
    return ''
  const labels: Record<string, string> = {
    short: 'Quick Read',
    medium: 'Medium Read',
    long: 'Deep Dive',
  }
  return labels[length] || length
}

function getGenreIcon(genre?: string): string {
  if (!genre)
    return 'i-ph-file-text-duotone'
  const icons: Record<string, string> = {
    poem: 'i-ph-quotes-duotone',
    thought: 'i-ph-lightbulb-duotone',
    tutorial: 'i-ph-book-open-duotone',
    article: 'i-ph-newspaper-duotone',
    essay: 'i-ph-pencil-duotone',
  }
  return icons[genre] || 'i-ph-file-text-duotone'
}
</script>

<template>
  <header mb-8 pb-6 border-b class="border-primary-light/10 dark:border-primary-dark/10">
    <!-- Back link -->
    <div mb-6>
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 text-sm transition-colors primary-light/60 dark:primary-dark/60 hover:primary-light hover:dark:primary-dark"
      >
        <div :class="getGenreIcon(genre)" />
        Back to Blog
      </NuxtLink>
    </div>

    <!-- Title -->
    <h1 text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight>
      {{ title }}
    </h1>

    <!-- Description -->
    <p v-if="description" text-lg mb-6 leading-relaxed class="primary-light/70 dark:primary-dark/70">
      {{ description }}
    </p>

    <!-- Meta information -->
    <div flex flex-wrap items-center gap-4 text-sm>
      <span v-if="date" inline-flex items-center gap-1.5 class="primary-light/60 dark:primary-dark/60">
        <div i-ph-calendar-duotone />
        {{ formatDate(date) }}
      </span>

      <span v-if="length" inline-flex items-center gap-1.5 class="primary-light/60 dark:primary-dark/60">
        <div i-ph-clock-duotone />
        {{ getLengthLabel(length) }}
      </span>

      <span
        v-if="genre"
        inline-flex items-center gap-1.5
        px-2.5 py-0.5 rounded-full
        text-xs font-medium uppercase tracking-wide
        class="bg-primary-light/10 dark:bg-primary-dark/10 primary-light/70 dark:primary-dark/70"
      >
        <div :class="getGenreIcon(genre)" />
        {{ genre }}
      </span>

      <span
        v-if="topic"
        inline-flex items-center gap-1.5
        px-2.5 py-0.5 rounded-full
        text-xs font-medium uppercase tracking-wide
        class="bg-primary-light/5 dark:bg-primary-dark/5 primary-light/60 dark:primary-dark/60"
      >
        <div i-ph-tag-duotone />
        {{ topic }}
      </span>

      <span
        v-if="status"
        inline-flex items-center gap-1.5
        px-2.5 py-0.5 rounded-full
        text-xs font-medium uppercase tracking-wide
        class="bg-amber/10 dark:bg-amber/20 text-amber-700 dark:text-amber-400"
      >
        <div i-ph-refresh-duotone />
        {{ status }}
      </span>
    </div>
  </header>
</template>
