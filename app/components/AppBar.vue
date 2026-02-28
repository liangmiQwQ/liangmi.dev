<script setup lang="ts">
const navLinks = [
  { to: '/', icon: 'i-ph-house-duotone', label: 'Home', offset: -2 },
  { to: '/blog', icon: 'i-ph-newspaper-duotone', label: 'Blog', offset: 0 },
  { to: '/about', icon: 'i-ph-user-duotone', label: 'About', offset: 2 },
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
  <!-- Desktop AppBar - Floating Island -->
  <nav
    class="fixed left-1/2 top-6 z-[100] hidden md:flex -translate-x-1/2 items-center gap-1 px-2 py-2 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500"
  >
    <!-- Logo -->
    <NuxtLink
      to="/"
      class="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 transition-all duration-300 group"
    >
      <Logo :size="28" />
    </NuxtLink>

    <div class="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-2" />

    <!-- Navigation Links with offset rhythm -->
    <NuxtLink
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      class="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/50 dark:hover:bg-white/10 group"
      :style="{ transform: `translateY(${link.offset}px)` }"
    >
      <div
        :class="link.icon"
        class="text-lg text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
      />
      <span
        class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
      >
        {{ link.label }}
      </span>
    </NuxtLink>

    <div class="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-2" />

    <!-- Theme Toggle -->
    <ThemeToggle />
  </nav>

  <!-- Mobile AppBar - Compact Floating Island -->
  <nav
    class="fixed left-1/2 top-4 z-[100] flex md:hidden -translate-x-1/2 items-center gap-2 px-2 py-2 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl"
  >
    <!-- Logo -->
    <NuxtLink
      to="/"
      class="flex items-center justify-center w-9 h-9 rounded-full bg-white/50 dark:bg-white/10"
    >
      <Logo :size="24" />
    </NuxtLink>

    <div class="w-px h-4 bg-gray-300 dark:bg-gray-600" />

    <!-- Mobile Menu Button -->
    <Button
      variant="ghost"
      size="icon"
      class="w-9 h-9"
      @click="toggleMobileMenu"
    >
      <div
        class="text-xl transition-transform duration-300"
        :class="[
          isMobileMenuOpen ? 'i-ph-x-duotone rotate-90' : 'i-ph-list-duotone',
        ]"
      />
    </Button>

    <div class="w-px h-4 bg-gray-300 dark:bg-gray-600" />

    <!-- Theme Toggle -->
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
      class="fixed left-1/2 top-20 z-[99] -translate-x-1/2 flex flex-col gap-1 p-2 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl min-w-48"
    >
      <NuxtLink
        v-for="(link, index) in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/50 dark:hover:bg-white/20 active:scale-95"
        :style="{ animationDelay: `${index * 50}ms` }"
        @click="closeMobileMenu"
      >
        <div :class="link.icon" class="text-xl text-gray-600 dark:text-gray-300" />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
          {{ link.label }}
        </span>
      </NuxtLink>
    </div>
  </Transition>
</template>

<style scoped>
/* Router link active styles */
.router-link-active:not(:first-child) {
  background: rgba(255, 255, 255, 0.5);
}

.dark .router-link-active:not(:first-child) {
  background: rgba(255, 255, 255, 0.2);
}
</style>
