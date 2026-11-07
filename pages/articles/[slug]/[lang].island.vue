<script setup lang="ts">
import { getArticleShareUrl } from '~/article-head.ts'
import ArticleContent from '~/components/articles/ArticleContent.vue'
// Void only registers islands imported by relative path, not through the `~/` alias.
import ArticleNav from '../../../src/components/articles/ArticleNav.vue' with { island: 'idle' }
import CodeCopy from '../../../src/components/articles/CodeCopy.vue' with { island: 'idle' }
import type { Props } from './[lang].server.ts'

const props = defineProps<Props>()

const shareUrl = getArticleShareUrl(props)
</script>

<template>
  <ArticleNav :headings :share-url />
  <ArticleContent :date :html :reading-minutes :title-html />
  <CodeCopy />
</template>
