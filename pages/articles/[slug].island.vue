<script setup lang="ts">
import ArticleContent from '~/components/articles/ArticleContent.vue'

import type { Props } from './[slug].server.ts'

defineProps<Props>()
</script>

<template>
  <ArticleContent :date :html :reading-minutes :title-html />
</template>
