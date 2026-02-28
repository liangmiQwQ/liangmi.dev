<script setup lang="ts">
const isDark = useDark()

function toggleTheme(event: MouseEvent) {
  if ('startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    const transition = document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    })
    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
          {
            clipPath: isDark.value
              ? [...clipPath].reverse()
              : clipPath,
          },
          {
            duration: 400,
            easing: 'ease-in-out',
            fill: 'forwards',
            pseudoElement: isDark.value
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
  }
  else {
    isDark.value = !isDark.value
  }
}
</script>

<template>
  <UiButton title="Toggle Theme" variant="ghost" size="icon" @click="toggleTheme">
    <div i-ph-moon-stars-duotone dark:i-ph-sun-dim-duotone text-2xl />
  </UiButton>
</template>
