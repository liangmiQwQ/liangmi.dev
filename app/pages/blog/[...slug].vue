<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  const queryPath = `/articles${route.path.replace('/blog', '')}`
  return queryCollection('articles').path(queryPath).first()
})
</script>

<template>
  <main class="max-w-3xl mx-auto">
    <div mb-8>
      <NuxtLink
        to="/blog"
        class="sm primary-light/60 dark:primary-dark/60 hover:primary-light hover:dark:primary-dark"
        inline-flex items-center gap-1
      >
        <div i-ph-arrow-left-duotone />
        Back to Blog
      </NuxtLink>
    </div>
    <div v-if="page" class="prose prose-stone dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </div>
    <div v-else>
      Post not found
    </div>
  </main>
</template>

<style scoped>

</style>
