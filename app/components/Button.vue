<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

const props = withDefaults(defineProps<{
  to?: string
  href?: string
  target?: string
  variant?: 'default' | 'solid' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}>(), {
  variant: 'default',
  size: 'default',
})

const tag = computed(() => {
  if (props.to)
    return resolveComponent('NuxtLink')
  if (props.href)
    return 'a'
  return 'button'
})

const attrs = computed(() => {
  if (props.to)
    return { to: props.to }
  if (props.href)
    return { href: props.href, target: props.target }
  return {}
})

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-white/50 dark:bg-black/20 hover:bg-warmbg-dark/5 dark:hover:bg-warmbg-light/10 text-warmfg-light dark:text-warmfg-dark backdrop-blur-sm',
    solid: 'bg-warmfg-light dark:bg-warmfg-dark text-warmbg-light dark:text-warmbg-dark hover:opacity-90',
    destructive: 'bg-red-500 text-white hover:bg-red-500/90 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900/90',
    outline: 'border border-warmbg-dark/20 dark:border-warmbg-light/20 bg-transparent hover:bg-warmbg-dark/5 dark:hover:bg-warmbg-light/10 text-warmfg-light dark:text-warmfg-dark',
    secondary: 'bg-warmbg-dark/5 dark:bg-warmbg-light/10 text-warmfg-light dark:text-warmfg-dark hover:bg-warmbg-dark/10 dark:hover:bg-warmbg-light/20',
    ghost: 'bg-transparent hover:bg-warmbg-dark/5 dark:hover:bg-warmbg-light/10 text-warmfg-light dark:text-warmfg-dark',
    link: 'bg-transparent text-warmfg-light dark:text-warmfg-dark underline-offset-4 hover:underline',
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3 text-sm',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  }
  return sizes[props.size]
})
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warmbg-dark/20 dark:focus-visible:ring-warmbg-light/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    :class="[
      variantClasses,
      sizeClasses,
      props.size === 'icon' ? 'rounded-full' : 'rounded-lg',
    ]"
  >
    <slot />
  </component>
</template>
