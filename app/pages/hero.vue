<script lang="ts" setup>
import { Motion } from 'motion-v'
</script>

<template>
  <main w-full h-screen relative overflow-x-hidden>
    <!-- Text: appears third -->
    <Motion
      as="div"
      class="text-4xl md:text-8xl font-serif pt-6 md:pt-12 flex flex-col items-center justify-center absolute h-full w-full op95"
      :initial="{ opacity: 0, y: -16 }"
      :animate="{ opacity: 0.95, y: 0 }"
      :transition="{ duration: 1, delay: 2.2, ease: 'easeOut' }"
    >
      <span>
        Do things I love
      </span>
      <span>
        Learn about myself
      </span>
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
        <HeroFirstMagnitudeStar />
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
  </main>
</template>
