<script setup lang="ts">
import type { Constellation, Meteor, Star } from '~/utils/heroSky'
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import {
  generateConstellations,
  generateFlashStars,
  generateGlowStars,
  generateMeteors,
  generateNormalStars,
  rand,
} from '~/utils/heroSky'

interface FlashStar extends Star {
  visible: boolean
}

const FLASH_TRANSITION_MS = 1600

const meteors = shallowRef<Meteor[]>([])
const normalStars = shallowRef<Star[]>([])
const glowStars = shallowRef<Star[]>([])
const constellations = shallowRef<Constellation[]>([])
const flashStars = ref<FlashStar[]>([])

const timers: ReturnType<typeof setTimeout>[] = []

function scheduleFlash(index: number): void {
  const t1 = setTimeout(() => {
    const star = flashStars.value[index]
    if (!star)
      return
    star.visible = false

    const t2 = setTimeout(() => {
      const s = flashStars.value[index]
      if (!s)
        return
      s.x = rand(0, 100)
      s.y = rand(0, 100)
      s.visible = true
      scheduleFlash(index)
    }, FLASH_TRANSITION_MS)
    timers.push(t2)
  }, rand(15, 40) * 1000)
  timers.push(t1)
}

onMounted(() => {
  meteors.value = generateMeteors(10)
  normalStars.value = generateNormalStars(190)
  glowStars.value = generateGlowStars(18, 190)
  constellations.value = generateConstellations(1)

  const raw = generateFlashStars(56, 190 + 18)
  flashStars.value = raw.map(s => ({ ...s, visible: true }))

  flashStars.value.forEach((_, i) => {
    // Stagger initial cycles so they don't all flash at once
    const t = setTimeout(scheduleFlash, rand(0, 20) * 1000, i)
    timers.push(t)
  })
})

onUnmounted(() => {
  timers.forEach(clearTimeout)
  timers.length = 0
})

function glowFilter(r: number): string {
  if (r >= 2.8)
    return 'url(#glow-lg)'
  if (r >= 1.8)
    return 'url(#glow-md)'
  return 'url(#glow-sm)'
}
</script>

<template>
  <div class="absolute inset-0 overflow-hidden bg-[#06090f]">
    <svg
      class="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow-sm" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-md" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-lg" x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Constellation lines -->
      <g v-for="(constellation, ci) in constellations" :key="`c-${ci}`">
        <line
          v-for="(line, li) in constellation.lines"
          :key="`cl-${li}`"
          :x1="`${line.x1}%`"
          :y1="`${line.y1}%`"
          :x2="`${line.x2}%`"
          :y2="`${line.y2}%`"
          stroke="white"
          stroke-opacity="0.18"
          stroke-width="0.5"
          stroke-linecap="round"
        />
      </g>

      <!-- Normal twinkling stars -->
      <circle
        v-for="star in normalStars"
        :key="star.id"
        :cx="`${star.x}%`"
        :cy="`${star.y}%`"
        :r="star.r"
        :fill="star.color"
        class="star-twinkle"
        :style="{
          '--base-op': star.opacity,
          'animationDuration': `${star.duration}s`,
          'animationDelay': `-${star.delay}s`,
        }"
      />

      <!-- Glow stars with SVG blur filter -->
      <circle
        v-for="star in glowStars"
        :key="star.id"
        :cx="`${star.x}%`"
        :cy="`${star.y}%`"
        :r="star.r"
        :fill="star.color"
        :filter="glowFilter(star.r)"
        class="star-twinkle"
        :style="{
          '--base-op': star.opacity,
          'animationDuration': `${star.duration}s`,
          'animationDelay': `-${star.delay}s`,
        }"
      />

      <!-- Flash stars: fade out → teleport → fade in via JS -->
      <circle
        v-for="(star, i) in flashStars"
        :key="`flash-${i}`"
        :cx="`${star.x}%`"
        :cy="`${star.y}%`"
        :r="star.r"
        :fill="star.color"
        class="star-flash"
        :style="{ opacity: star.visible ? star.opacity : 0 }"
      />
    </svg>
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <span
        v-for="m in meteors"
        :key="m.id"
        class="meteor"
        :style="{
          'top': `${m.top}%`,
          'left': `${m.left}%`,
          'width': `${m.length}px`,
          '--angle': `${m.angle}deg`,
          '--cycle': `${m.cycle}s`,
          'animation-delay': `${m.delay}s`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.star-twinkle {
  opacity: var(--base-op);
  animation: twinkle ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: var(--base-op); }
  50% { opacity: calc(var(--base-op) * 0.07); }
}

.star-flash {
  transition: opacity 1.5s ease-in-out;
}

.meteor {
  position: absolute;
  height: 1.5px;
  /* tail → body → bright head, tip softens slightly so no hard edge */
  background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.95) 88%, rgba(255, 255, 255, 0.4) 100%);
  transform-origin: left center;
  opacity: 0;
  animation: meteor var(--cycle) linear infinite;
}

@keyframes meteor {
  /* start well off-screen left so the transparent tail leads in naturally */
  0% {
    transform: rotate(var(--angle)) translateX(-220px);
    opacity: 1;
  }
  13% {
    transform: rotate(var(--angle)) translateX(480px);
    opacity: 0;
  }
  /* snap back invisibly, hold until next cycle */
  13.01%, 100% {
    transform: rotate(var(--angle)) translateX(-220px);
    opacity: 0;
  }
}
</style>
