<script setup lang="ts">
import { computed } from 'vue'
import Prose from '~/components/Prose.vue'

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
  <Prose>
    <template #header>
      <h1 v-if="titleHtml" v-html="titleHtml" />
      <div mb-8 flex="~ items-center gap-2" text-base op50>
        <a href="/about" rel="author" class="!text-inherit !font-normal">Liang</a>
        <span aria-hidden="true">·</span>
        <template v-if="formattedDate">
          <time :datetime="date">{{ formattedDate }}</time>
          <span aria-hidden="true">·</span>
        </template>
        <span>{{ readingMinutes }} min read</span>
      </div>
    </template>
    <div v-html="html" />
  </Prose>
</template>
