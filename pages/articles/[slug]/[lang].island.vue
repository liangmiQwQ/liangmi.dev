<script setup lang="ts">
import type { Props } from './[lang].island.server'

export const layout = 'article'

defineProps<Props>()
</script>

<template>
  <article class="void-md" v-html="html" />
</template>
