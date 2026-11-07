<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

// Code blocks come from v-html, so one delegated listener serves every copy button.
useEventListener('click', copyCode)

async function copyCode(event: MouseEvent) {
  const button = event.target instanceof Element ? event.target.closest('.code-copy') : null
  const code = button?.parentElement?.querySelector('pre')?.textContent
  if (!button || !code) {
    return
  }

  await navigator.clipboard.writeText(code)
  button.classList.add('copied')
  setTimeout(() => button.classList.remove('copied'), 2000)
}
</script>

<template>
  <span hidden />
</template>
