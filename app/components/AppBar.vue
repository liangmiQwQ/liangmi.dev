<script setup lang="ts">
const navLinks = [
  { to: '/blog', icon: 'i-ph-newspaper-duotone', label: 'Blog' },
  { to: '/about', icon: 'i-ph-user-duotone', label: 'About' },
]

const isMobileMenuOpen = ref(false)
const mobileMenuRef = ref<HTMLElement | null>(null)

function openMobileMenu() {
  isMobileMenuOpen.value = true
}

function closeMobileMenu() {
  setTimeout(() => {
    isMobileMenuOpen.value = false
  }, 50)
}

onClickOutside(mobileMenuRef, closeMobileMenu)
</script>

<template>
  <!-- Desktop AppBar -->
  <nav
    px4 py1 fixed top-3
    rounded-full bg-background shadow-sm
    border border-secondary
    z100
    class="-translate-x-1/2 left-1/2"
  >
    <div
      flex="~ items-center gap-2"
      opacity-80 hover:opacity-100
      duration-300
    >
      <UiButton title="Home" variant="ghost" size="icon" mr-2 to="/">
        <img src="assets/me/avatar.png" w8 h8 rounded-full>
      </UiButton>

      <div class="w-px h4 bg-secondary" />

      <UiButton
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        variant="ghost"
        size="sm"
        class="gap-1.5 hidden md:flex"
        active-class="bg-secondary"
      >
        <div :class="link.icon" class="text-xl" />
        {{ link.label }}
      </UiButton>

      <UiButton
        variant="ghost"
        size="icon"
        class="w-8 h-8 md:hidden"
        @click="openMobileMenu"
      >
        <div
          class="transition-transform duration-300 text-xl"
          :class="[
            isMobileMenuOpen ? 'i-ph-x-duotone rotate-90' : 'i-ph-list-duotone',
          ]"
        />
      </UiButton>

      <div class="w-px h4 bg-secondary" />

      <ThemeToggle />
    </div>
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
    <UiBox
      v-if="isMobileMenuOpen"
      ref="mobileMenuRef"
      fixed
      flex="~ gap-1"
      p-2
      flex-col
      class=" left-1/2 top-16 z-[99] -translate-x-1/2 rounded-xl backdrop-blur-xl min-w-44"
    >
      <UiButton
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        variant="ghost"
        class="w-full !justify-start gap-3"
        active-class="bg-gray-100 dark:bg-white/15"
        @click="closeMobileMenu"
      >
        <div :class="link.icon" />
        {{ link.label }}
      </UiButton>
    </uibox>
  </Transition>
</template>
