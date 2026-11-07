<script setup lang="ts">
import Prose from '~/components/Prose.vue'
import { formatDate } from '~/date.ts'

import type { Props } from './index.server.ts'

defineProps<Props>()
</script>

<template>
  <Prose>
    <template #header>
      <h1 class="!mb-8">Writing</h1>
    </template>

    <ul v-if="articles.length" class="!list-none !pl-0">
      <li
        v-for="article in articles"
        :key="article.slug"
        flex="~ col sm:row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
      >
        <a :href="`/articles/${article.slug}`">{{ article.title }}</a>
        <time v-if="article.date" :datetime="article.date" shrink-0 text-sm op50>
          {{ formatDate(article.date) }}
        </time>
      </li>
    </ul>
    <p v-else>Nothing here yet.</p>
  </Prose>
</template>
