<script lang="ts" setup>
defineProps<{
  size?: number
}>()

const isDark = useDark()
</script>

<template>
  <ClientOnly>
    <img v-if="isDark" src="~/assets/me/animated-logo.dark.svg" :width="size" :height="size">
    <img v-else src="~/assets/me/animated-logo.light.svg" :width="size" :height="size">
  </ClientOnly>
</template>

<style>

</style>
