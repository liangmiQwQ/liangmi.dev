import { useMediaQuery, useStorage } from '@vueuse/core'
import { computed, nextTick, watch } from 'vue'

type ColorPreference = 'dark' | 'light' | 'system'

const colorPreference = useStorage<ColorPreference>('color-mode', 'system')
const systemDark = useMediaQuery('(prefers-color-scheme: dark)')

export const isDark = computed<boolean>(() => {
  if (colorPreference.value === 'system')
    return systemDark.value
  return colorPreference.value === 'dark'
})

if (typeof document !== 'undefined') {
  watch(isDark, dark => document.documentElement.classList.toggle('dark', dark), { immediate: true })
}

export function toggleDark(event: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    colorPreference.value = isDark.value ? 'light' : 'dark'
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const transition = document.startViewTransition(async () => {
    colorPreference.value = isDark.value ? 'light' : 'dark'
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
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
