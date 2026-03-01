<script setup lang="ts">
import Contact from '~/components/content/Contact.vue'

const info = useIInfo()
const isDark = useDark()
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-12">
    <!-- Circular logo with hover effect -->
    <div class="relative w-48 h-48 rounded-full p-2 overflow-hidden">
      <ClientOnly>
        <img
          v-if="isDark"
          src="~/assets/me/animated-logo.dark.svg"
          width="192"
          height="192"
          class="absolute inset-0 w-full h-full"
        >
        <img
          v-else
          src="~/assets/me/animated-logo.light.svg"
          width="192"
          height="192"
          class="absolute inset-0 w-full h-full"
        >
      </ClientOnly>
    </div>

    <!-- Introduction text -->
    <div class="max-w-2xl text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-semibold tracking-tight">
        <span class="text-primary-light dark:text-primary-dark">{{ info.name }}</span>
      </h1>
      <p class="text-lg text-primary-light/70 dark:text-primary-dark/70">
        Placeholder for future content.
      </p>
    </div>

    <!-- Social links -->
    <Contact />
  </div>
</template>
