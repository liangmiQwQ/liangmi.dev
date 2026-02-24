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
  <BaseButton title="Toggle Theme" p-2 aspect-square !px-2 @click="toggleTheme">
    <div i-ph-moon-stars-duotone dark:i-ph-sun-dim-duotone text-xl />
  </BaseButton>
</template>
