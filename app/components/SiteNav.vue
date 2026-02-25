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
    backdrop-blur-md
    shadow-xl
    class="-translate-y-1/2"
  >
    <Button
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      :title="link.label"
      variant="ghost"
      size="icon"
      active-class="!primary-light !dark:primary-dark !bg-primary-light/10 !dark:bg-primary-dark/10 shadow-inner"
    >
      <div :class="link.icon" text-2xl />
    </Button>

    <div h-px w-6 bg="primary-light/10 dark:primary-dark/10" my-1 />

    <ThemeToggle />
  </nav>
</template>
