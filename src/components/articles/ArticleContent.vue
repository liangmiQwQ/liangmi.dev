<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
  <article class="article-content void-md" v-html="html" />
</template>

<style scoped>
.article-content {
  --vmd-font-body: "Inter", system-ui, sans-serif;
  --vmd-line-height: 1.8;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.article-content :deep(h1) {
  margin-bottom: 2rem;
}

.article-content :deep(h2) {
  padding-bottom: 0;
  border-bottom: 0;
}
</style>
