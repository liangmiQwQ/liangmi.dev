export const isDark = computed(() => useColorMode().value === 'dark')

export function toggleDark() {
  useColorMode().preference = isDark.value ? 'light' : 'dark'
}

watch(useMediaQuery('(prefers-color-scheme: dark)'), () => {
  useColorMode().preference = 'system'
})
