<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

const props = withDefaults(defineProps<{
  to?: string
  href?: string
  target?: string
  variant?: 'default' | 'solid' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  activeClass?: string
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
    return { to: props.to, activeClass: props.activeClass }
  if (props.href)
    return { href: props.href, target: props.target }
  return {}
})

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-white/50 dark:bg-black/20 hover:bg-background-dark/5 dark:hover:bg-background-light/10 text-primary-light dark:text-primary-dark backdrop-blur-sm',
    solid: 'bg-primary-light dark:bg-primary-dark text-background-light dark:text-background-dark hover:opacity-90',
    destructive: 'bg-red-500 text-white hover:bg-red-500/90 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900/90',
    outline: 'border border-background-dark/20 dark:border-background-light/20 bg-transparent hover:bg-background-dark/5 dark:hover:bg-background-light/10 text-primary-light dark:text-primary-dark',
    secondary: 'bg-background-dark/5 dark:bg-background-light/10 text-primary-light dark:text-primary-dark hover:bg-background-dark/10 dark:hover:bg-background-light/20',
    ghost: 'bg-transparent hover:bg-background-dark/5 dark:hover:bg-background-light/10 text-primary-light dark:text-primary-dark',
    link: 'bg-transparent text-primary-light dark:text-primary-dark underline-offset-4 hover:underline',
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
    cursor-pointer inline-flex items-center justify-center font-medium
    class="focus-visible:outline-black disabled:(pointer-events-none opacity-50) hover:duration-300"
    :class="[
      variantClasses,
      sizeClasses,
      props.size === 'icon' ? 'rounded-full' : 'rounded-lg',
    ]"
  >
    <slot />
  </component>
</template>
