<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
  <article class="void-md" v-html="html" />
</template>
