<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

function toggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <Button title="Toggle Theme" variant="ghost" size="icon" @click="toggleTheme">
    <div i-ph-moon-stars-duotone dark:i-ph-sun-dim-duotone text-xl />
  </Button>
</template>
