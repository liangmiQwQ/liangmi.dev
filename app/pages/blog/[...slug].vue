<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  // Try to remove /blog/ from the path since the source is likely `content/**` and URL mapping might be just `/**` or `/blog/**`
  // Actually, wait! The collection path defaults to /path/to/file.
  // But let's just query by route.path as content collection generates path mapped directly.
  return queryCollection('content').path(route.path.replace('/blog', '')).first()
})
</script>

<template>
  <main class="animation-fade-in max-w-3xl mx-auto">
    <div mb-8>
      <NuxtLink
        to="/blog"
        class="sm fg-light/60 dark:fg-dark/60 hover:fg-light hover:dark:fg-dark"
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
.animation-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
