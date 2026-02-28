<script setup lang="ts">
useHead({
  title: 'About - Liang',
})

const { data: page } = await useAsyncData('about', async () => {
  return await queryCollection('me').path('/info/about').first()
})

definePageMeta({
  layout: 'page',
})
</script>

<template>
  <div v-if="page">
    <ContentRenderer :value="page" />
  </div>
  <div v-else>
    <h1>About</h1>
    <p class="text-lg primary-light/70 dark:primary-dark/70">
      Hi, I'm Liang. Welcome to my personal space on the web.
    </p>
    <p>
      I'm a student developer based in Hangzhou, China, passionate about open-source
      and web technologies. I contribute to projects like oxc-project/oxc and vitejs/devtools.
    </p>
    <p>
      Feel free to explore my blog and get in touch!
    </p>
  </div>
</template>
