<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () => {
  return queryCollection('content').all()
})

useHead({
  title: 'Blog - Liang',
})
</script>

<template>
  <div flex flex-col gap-8 animation-fade-in>
    <div flex items-center justify-between>
      <h1 class="3xl md:4xl" font-bold tracking-tight>
        Blog
      </h1>
      <NuxtLink
        to="/"
        class="sm warmfg-light/60 dark:warmfg-dark/60 hover:(warmfg-light dark:warmfg-dark)"
      >
        ← Back to Home
      </NuxtLink>
    </div>

    <p class="lg warmfg-light/70 dark:warmfg-dark/70" max-w-2xl>
      Thoughts, learnings, and experiences shared along my journey.
    </p>

    <div grid grid-cols-1 gap-4 mt-4>
      <div v-if="!posts || posts.length === 0" class="warmfg-light/50 dark:warmfg-dark/50 italic">
        No posts found.
      </div>
      <PostCard v-for="post in posts" :key="post.path" :post="{ ...post, path: `/blog${post.path}` }" />
    </div>
  </div>
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
