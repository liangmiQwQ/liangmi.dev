<script setup lang="ts">
const navLinks = [
  { to: '/blog', icon: 'i-ph-newspaper-duotone', label: 'Blog' },
  { to: '/about', icon: 'i-ph-user-duotone', label: 'About' },
]

const isMobileMenuOpen = ref(false)
const mobileMenuRef = ref<HTMLElement | null>(null)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

onClickOutside(mobileMenuRef, closeMobileMenu)
</script>

<template>
  <!-- Desktop AppBar -->
  <nav
    class="fixed left-1/2 top-4 z-[100] hidden md:flex -translate-x-1/2 items-center gap-2 px-4 py-1 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg"
  >
    <NuxtLink
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      <div :class="link.icon" class="text-base" />
      <span>{{ link.label }}</span>
    </NuxtLink>

    <div class="w-px h-4 bg-gray-300 dark:bg-gray-600" />

    <ThemeToggle />
  </nav>

  <!-- Mobile AppBar -->
  <nav
    class="fixed left-1/2 top-4 z-[100] flex md:hidden -translate-x-1/2 items-center gap-2 px-1.5 py-1 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg"
  >
    <Button
      variant="ghost"
      size="icon"
      class="w-8 h-8"
      @click="toggleMobileMenu"
    >
      <div
        class="text-lg transition-transform duration-300"
        :class="[
          isMobileMenuOpen ? 'i-ph-x-duotone rotate-90' : 'i-ph-list-duotone',
        ]"
      />
    </Button>

    <div class="w-px h-4 bg-gray-300 dark:bg-gray-600" />

    <ThemeToggle />
  </nav>

  <!-- Mobile Menu Dropdown -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 -translate-y-4 scale-95"
  >
    <div
      v-if="isMobileMenuOpen"
      ref="mobileMenuRef"
      class="fixed left-1/2 top-16 z-[99] -translate-x-1/2 flex flex-col gap-1 p-2 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl min-w-44"
    >
      <NuxtLink
        v-for="(link, index) in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/20 active:scale-95 transition-all"
        :style="{ animationDelay: `${index * 50}ms` }"
        @click="closeMobileMenu"
      >
        <div :class="link.icon" class="text-lg" />
        <span>{{ link.label }}</span>
      </NuxtLink>
    </div>
  </Transition>
</template>

<style scoped>
.router-link-active {
  background: rgb(243, 244, 246);
}

.dark .router-link-active {
  background: rgba(255, 255, 255, 0.15);
}
</style>
