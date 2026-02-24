<script setup lang="ts">
const props = defineProps<{
  to?: string;
  href?: string;
  target?: string;
}>();

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink');
  if (props.href) return 'a';
  return 'button';
});

const attrs = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) return { href: props.href, target: props.target };
  return {};
});
</script>

<template>
  <component :is="tag" v-bind="attrs" flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 bg="white/50 dark:black/20" hover:bg="warmbg-dark/5 dark:warmbg-light/10" text="warmfg-light dark:warmfg-dark" backdrop-blur-sm>
    <slot />
  </component>
</template>
