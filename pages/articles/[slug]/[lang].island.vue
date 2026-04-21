<script setup lang="ts">
import type { Props } from './[lang].island.server'

defineProps<Props>()
</script>

<template>
  <article class="void-md" v-html="html" />
</template>
