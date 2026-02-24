<script setup lang="ts">
defineProps<{
  post: {
    path: string
    title: string
    description?: string
    date?: string
  }
}>()
</script>

<template>
  <NuxtLink
    :to="post.path" block p-6 rounded-2xl
    border="~ warmfg-light/5 dark:warmfg-dark/5"
    bg="warmfg-light/3 dark:warmfg-dark/3 hover:(warmfg-light/5 dark:warmfg-dark/5)"
    transition-colors duration-300
  >
    <h3 text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors>
      {{ post.title }}
    </h3>
    <p v-if="post.date" text="sm warmfg-light/50 dark:warmfg-dark/50" mb-3>
      {{ new Date(post.date).toLocaleDateString() }}
    </p>
    <p v-if="post.description" text="warmfg-light/70 dark:warmfg-dark/70" leading-relaxed>
      {{ post.description }}
    </p>
  </NuxtLink>
</template>
