<script setup lang="ts">
withDefaults(defineProps<{
  to?: string
  label?: string
  icon?: string
}>(), {
  to: '/',
  label: 'Back',
  icon: 'i-ph-arrow-left-duotone',
})
</script>

<template>
  <UiButton
    :to="to"
    variant="ghost"
    class="inline-flex items-center gap-2 text-sm primary-light/60 dark:primary-dark/60 hover:primary-light hover:dark:primary-dark"
  >
    <div :class="icon" />
    {{ label }}
  </UiButton>
</template>
