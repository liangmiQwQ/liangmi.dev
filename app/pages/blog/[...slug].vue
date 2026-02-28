<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  const queryPath = `/articles${route.path.replace('/blog', '')}`
  return queryCollection('articles').path(queryPath).first()
})

useHead(() => ({
  title: page.value?.title || 'Article',
}))

definePageMeta({
  layout: 'article',
})
</script>

<template>
  <div>
    <!-- Content is rendered by the article layout -->
  </div>
</template>
