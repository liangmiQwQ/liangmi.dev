<script setup lang="ts">
import ArticleContent from '~/components/articles/ArticleContent.vue'
import CodeCopy from '~/components/articles/CodeCopy.vue' with { island: 'idle' }

import type { Props } from './[lang].server.ts'

defineProps<Props>()
</script>

<template>
  <ArticleContent :date :html :reading-minutes :title-html />
  <CodeCopy />
</template>
