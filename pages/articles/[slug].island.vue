<script setup lang="ts">
import type { Props } from './[slug].server'
import ArticleContent from '~/components/articles/ArticleContent.vue'

defineProps<Props>()
</script>

<template>
  <ArticleContent :html />
</template>
