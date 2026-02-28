<script setup lang="ts">
defineProps<{
  post: {
    path: string
    title: string
    description?: string
    date?: string
  }
}>()

const { formatShortDate } = useDateFormat()
</script>

<template>
  <UiButton
    :to="post.path"
    variant="ghost"
    class="w-full !justify-start !h-auto p-6 rounded-2xl text-left"
  >
    <div class="w-full">
      <h3 text-xl font-bold mb-2>
        {{ post.title }}
      </h3>
      <p v-if="post.date" text="sm primary-light/50 dark:primary-dark/50" mb-3>
        {{ formatShortDate(post.date) }}
      </p>
      <p v-if="post.description" text="primary-light/70 dark:primary-dark/70" leading-relaxed>
        {{ post.description }}
      </p>
    </div>
  </UiButton>
</template>
