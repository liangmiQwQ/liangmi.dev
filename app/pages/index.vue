<script setup lang="ts">
import Contact from '~/components/content/Contact.vue'

const info = useIInfo()
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center gap-8">
    <!-- Circular logo with hover effect -->
    <div class="relative w-48 h-48 rounded-full p1 overflow-hidden">
      <ClientOnly>
        <img
          v-if="isDark"
          src="~/assets/me/animated-logo.dark.svg"
          class="w-full h-full"
        >
        <img
          v-else
          src="~/assets/me/animated-logo.light.svg"
          class="w-full h-full"
        >
      </ClientOnly>
    </div>

    <!-- Introduction text -->
    <div class="max-w-2xl text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-semibold tracking-tight">
        <span font-title font-bold>
          Hi, I'm <span class="text-lime-800 dark:text-lime-200" font-italic>{{ info.name }}</span>
        </span>
        <br>
        <span font-title font-bold>
          Build things with <span class="text-red-800 dark:text-red-200" font-italic>love</span>
        </span>
      </h1>
    </div>

    <!-- Social links -->
    <Contact />
  </div>
</template>
