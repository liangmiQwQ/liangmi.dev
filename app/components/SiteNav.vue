<script setup lang="ts">
const navLinks = [
  { to: '/', icon: 'i-ph-house-duotone', label: 'Home' },
  { to: '/blog', icon: 'i-ph-newspaper-duotone', label: 'Blog' },
  { to: '/about', icon: 'i-ph-user-duotone', label: 'About' },
]
</script>

<template>
  <nav
    fixed right-6 top="1/2" z-100
    flex="~ col gap-4 items-center"
    p-3 rounded-full
    bg="white/10 dark:black/10"
    border="~ warmfg-light/10 dark:warmfg-dark/10"
    backdrop-blur-md
    shadow-xl
    class="-translate-y-1/2"
  >
    <NuxtLink
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      :title="link.label"
      flex="~ items-center justify-center"
      w-10 h-10 rounded-full
      transition-all duration-300
      class="warmfg-light/60 dark:warmfg-dark/60 hover:(bg-warmfg-light/10 dark:bg-warmfg-dark/10 warmfg-light dark:warmfg-dark)"
      active-class="!warmfg-light !dark:warmfg-dark !bg-warmfg-light/10 !dark:bg-warmfg-dark/10 shadow-inner"
    >
      <div :class="link.icon" text-2xl />
    </NuxtLink>

    <div h-px w-6 bg="warmfg-light/10 dark:warmfg-dark/10" my-1 />

    <ThemeToggle />
  </nav>
</template>
