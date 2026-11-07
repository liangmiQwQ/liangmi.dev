<script setup lang="ts">
import { computed } from 'vue'

import Prose from '~/components/Prose.vue'
import { formatDate } from '~/date.ts'

const props = defineProps<{
  date?: string
  html: string
  readingMinutes: number
  titleHtml: string
}>()

const formattedDate = computed(() => (props.date ? formatDate(props.date) : ''))
</script>

<template>
  <Prose>
    <template #header>
      <h1 v-if="titleHtml" class="!leading-[1.15]" v-html="titleHtml" />
      <div mt-2 mb-8 flex="~ items-center gap-2" text-base leading-none op50>
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
