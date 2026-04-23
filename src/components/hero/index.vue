<script lang="ts" setup>
import { Motion } from 'motion-v'
import Contact from '~/components/Contact.vue'
import HeroFirstMagnitudeStar from '~/components/hero/FirstMagnitudeStar.vue'
import HeroLand from '~/components/hero/Land.vue'
import HeroSky from '~/components/hero/Sky.vue'
</script>

<template>
  <div h-screen relative overflow-hidden bg-stone-950 text-stone-50>
    <Motion
      as="div"
      class="text-4xl md:text-7xl lg:text-8xl
      font-serif pt-6 md:pt-9 lg:pt-20
      flex flex-col items-center justify-center
      absolute h-full w-full op95 z-10"
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

      <div flex="~ items-center gap-3 justify-center" opacity-60 mt-8 hover:opacity100 duration-500>
        <span class="text-xl md:text-2xl font-serif">Liang</span>
        <Contact />
      </div>
    </Motion>

    <div
      flex="~ items-center justify-between col"
      relative w-full h-screen
    >
      <Motion
        as="div"
        class="overflow-hidden"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1.8, delay: 3.4, ease: 'easeOut' }"
      >
        <HeroSky op80 />
      </Motion>

      <Motion
        as="div"
        class="absolute"
        :initial="{ opacity: 0, scale: 0.15 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 1.2, ease: 'easeOut' }"
      >
        <HeroFirstMagnitudeStar />
      </Motion>

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
