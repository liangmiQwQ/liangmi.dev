<script lang="ts" setup>
import { Motion } from 'motion-v'
</script>

<template>
  <div h-screen relative overflow-hidden bg-stone-950 text-stone-50>
    <!-- Text: appears third -->
    <Motion
      as="div"
      class="text-4xl md:text-7xl lg:text-8xl
      font-serif pt-6 md:pt-9
      flex flex-col items-center justify-center
      absolute h-full w-full op95"
      :initial="{ opacity: 0, y: -16 }"
      :animate="{ opacity: 0.95, y: 0 }"
      :transition="{ duration: 1, delay: 2.2, ease: 'easeOut' }"
    >
      <span opacity-80>
        Do things I love
      </span>
      <span>
        Learn about myself
      </span>

      <!-- Name + contacts: one row -->
      <div flex="~ items-center gap-3 justify-center" mt-8>
        <span class="text-xl md:text-2xl font-serif text-stone-50/70">Liang</span>
        <div class="w-px h-5 bg-stone-700" />
        <a
          href="https://github.com/liangmiQwQ"
          target="_blank"
          rel="noopener noreferrer"
          class="w-9 h-9 rounded-full border-2 border-stone-700 text-stone-400 flex items-center justify-center transition-colors hover:(border-stone-400 text-stone-100)"
        >
          <span i-ph-github-logo text-base />
        </a>
        <a
          href="mailto:liang@liangmi.dev"
          class="w-9 h-9 rounded-full border-2 border-stone-700 text-stone-400 flex items-center justify-center transition-colors hover:(border-stone-400 text-stone-100)"
        >
          <span i-ph-envelope text-base />
        </a>
        <a
          href="/bilibili"
          class="w-9 h-9 rounded-full border-2 border-stone-700 text-stone-400 flex items-center justify-center transition-colors hover:(border-stone-400 text-stone-100)"
        >
          <span i-ph-video text-base />
        </a>
      </div>
    </Motion>

    <div
      flex="~ items-center justify-between col"
      relative w-full h-screen
    >
      <!-- Sky: appears last -->
      <Motion
        as="div"
        class="overflow-hidden"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1.8, delay: 3.4, ease: 'easeOut' }"
      >
        <HeroSky op80 />
      </Motion>

      <!-- Star: appears first -->
      <Motion
        as="div"
        class="absolute md:-mt-4"
        :initial="{ opacity: 0, scale: 0.15 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 1.2, ease: 'easeOut' }"
      >
        <HeroFirstMagnitudeStar @click="toggleDark" />
      </Motion>

      <!-- Land: appears second -->
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 100 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 1.2, delay: 1.2, ease: 'easeOut' }"
      >
        <HeroLand />
      </Motion>
    </div>
  </div>
</template>
