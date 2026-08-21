<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  date?: string
  html: string
  readingMinutes: number
  titleHtml: string
}>()

const formattedDate = computed(() => {
  if (!props.date)
    return ''

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(`${props.date}T00:00:00Z`))
})
</script>

<template>
  <article
    class="void-md antialiased [&_h1]:mb-2 [&_.article-body_h2]:(border-b-0 pb-0) [&_.article-body_p]:text-taupe-950/75 dark:[&_.article-body_p]:text-taupe-50/75 [&_.article-body_p_strong]:text-taupe-950 dark:[&_.article-body_p_strong]:text-taupe-50"
  >
    <h1 v-if="titleHtml" v-html="titleHtml" />
    <div mb-8 flex="~ items-center gap-2" text="sm taupe-500">
      <template v-if="formattedDate">
        <time :datetime="date">{{ formattedDate }}</time>
        <span aria-hidden="true">·</span>
      </template>
      <span>{{ readingMinutes }} min read</span>
    </div>
    <div class="article-body" v-html="html" />
  </article>
</template>
