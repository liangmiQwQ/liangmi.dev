<script setup lang="ts">
useHead({
  title: 'Liang - About',
})

const { data: page } = await useAsyncData('about', async () => {
  return await queryCollection('me').path('/info/about').first()
})
</script>

<template>
  <div flex flex-col gap-8>
    <div v-if="page" class="prose prose-stone dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </div>
    <div v-else class="prose prose-stone dark:prose-invert max-w-none">
      <p class="lg primary-light/70 dark:primary-dark/70">
        Hi, I'm Liang. Welcome to my personal space on the web.
      </p>
      <!-- Add more content as needed -->
    </div>
  </div>
</template>

<style scoped>

</style>
