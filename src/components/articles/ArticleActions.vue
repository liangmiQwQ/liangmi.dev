<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  shareUrl: string
}>()

const actions = computed(() => [
  { label: 'Scroll to top', icon: 'i-ph-arrow-up', href: '#', external: false },
  { label: 'Back to Articles', icon: 'i-ph-arrow-left', href: '/articles', external: false },
  { label: 'Share on X', icon: 'i-ph-x-logo', href: props.shareUrl, external: true }
])
</script>

<template>
  <ul list-none m-0 p-0 flex="~ col gap-2.5" text-sm>
    <li v-for="action in actions" :key="action.label">
      <a
        :href="action.href"
        :target="action.external ? '_blank' : undefined"
        :rel="action.external ? 'noopener' : undefined"
        flex="~ items-center gap-2"
        op60
        class="transition-opacity hover:op100"
      >
        <span :class="action.icon" block aria-hidden="true" />
        {{ action.label }}
      </a>
    </li>
  </ul>
</template>
