<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () => {
  return queryCollection('articles').all().then(docs => docs.map(doc => ({
    ...doc,
    path: doc.path.replace(/^\/articles/, ''),
  })))
})

useHead({
  title: 'Blog - Liang',
})

definePageMeta({
  layout: 'page',
})
</script>

<template>
  <div>
    <!-- Header section -->
    <div mb-8>
      <div flex items-center justify-between mb-6>
        <h1 text-3xl md:text-4xl font-bold tracking-tight>
          Blog
        </h1>
      </div>

      <p text-lg class="primary-light/70 dark:primary-dark/70" max-w-2xl leading-relaxed>
        Thoughts, learnings, and experiences shared along my journey as a developer and student.
      </p>
    </div>

    <!-- Posts grid -->
    <div space-y-4>
      <div v-if="!posts || posts.length === 0" text-center py-16>
        <div i-ph-newspaper-clipping-duotone text-5xl mx-auto mb-4 class="primary-light/30 dark:primary-dark/30" />
        <p class="primary-light/50 dark:primary-dark/50" italic>
          No posts found yet. Check back soon!
        </p>
      </div>

      <PostCard
        v-for="post in posts"
        :key="post.path"
        :post="{ ...post, path: `/blog${post.path}` }"
      />
    </div>
  </div>
</template>
