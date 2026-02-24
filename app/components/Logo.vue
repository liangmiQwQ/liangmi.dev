<script lang="ts" setup>
defineProps<{
  size?: number
}>()

const colorMode = useColorMode()
</script>

<template>
  <ClientOnly>
    <img v-if="colorMode.value === 'dark'" src="/animated-logo.dark.svg" :width="size" :height="size">
    <img v-if="colorMode.value === 'light'" src="/animated-logo.light.svg" :width="size" :height="size">
  </ClientOnly>
</template>

<style>

</style>
