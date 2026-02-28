<script setup lang="ts">
const progress = ref(0)

onMounted(() => {
  const updateProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  }

  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateProgress)
  })
})
</script>

<template>
  <div
    fixed top-0 left-0 right-0 z-50
    h-0.5
    bg-transparent
  >
    <div
      h-full
      bg-gradient-to-r from-amber-500 to-orange-500
      transition-all duration-150 ease-out
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
