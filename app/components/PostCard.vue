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
    border="~ fg-light/5 dark:fg-dark/5"
    bg="fg-light/3 dark:fg-dark/3 hover:(fg-light/5 dark:fg-dark/5)"
    hover:duration-300
  >
    <h3 text-xl font-bold mb-2 group-hover:text-amber-600>
      {{ post.title }}
    </h3>
    <p v-if="post.date" text="sm fg-light/50 dark:fg-dark/50" mb-3>
      {{ new Date(post.date).toLocaleDateString() }}
    </p>
    <p v-if="post.description" text="fg-light/70 dark:fg-dark/70" leading-relaxed>
      {{ post.description }}
    </p>
  </NuxtLink>
</template>
