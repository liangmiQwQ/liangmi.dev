<script setup lang="ts">
import { animate, Motion } from 'motion-v'
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef } from 'vue'

interface Meteor { id: number, top: number, left: number, length: number, angle: number, cycle: number, delay: number }
interface Star { id: number, x: number, y: number, r: number, opacity: number, duration: number, delay: number, kind: 'normal' | 'flash' | 'glow' }
interface ConstellationLine { x1: number, y1: number, x2: number, y2: number }
interface Constellation { lines: ConstellationLine[] }
interface FlashStar extends Star { visible: boolean }

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function randInt(min: number, max: number) {
  return Math.floor(rand(min, max + 1))
}

function generateMeteors(count: number): Meteor[] {
  return Array.from({ length: count }, (_, id) => {
    const cycle = rand(15, 25)
    return { id, top: rand(0, 55), left: rand(0, 80), length: rand(100, 200), angle: rand(45, 60), cycle, delay: -rand(0, cycle) }
  })
}

function generateNormalStars(count: number): Star[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: rand(0, 100),
    y: rand(0, 100),
    r: rand(0.6, 2.2),
    opacity: rand(0.2, 0.9),
    duration: rand(10, 30),
    delay: rand(0, 15),
    kind: 'normal' as const,
  }))
}

function generateGlowStars(count: number, idOffset = 0): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: idOffset + i,
    x: rand(0, 100),
    y: rand(0, 100),
    r: rand(2, 4),
    opacity: rand(0.6, 1),
    duration: rand(12, 28),
    delay: rand(0, 12),
    kind: 'glow' as const,
  }))
}

function generateFlashStars(count: number, idOffset = 0): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: idOffset + i,
    x: rand(0, 100),
    y: rand(0, 100),
    r: rand(0.6, 1.8),
    opacity: rand(0.4, 1),
    duration: rand(15, 40),
    delay: rand(0, 10),
    kind: 'flash' as const,
  }))
}

function generateConstellations(count: number, maxTurnDeg = 55): Constellation[] {
  return Array.from({ length: count }, () => {
    const pointCount = randInt(4, 7)
    const points: [number, number][] = [[rand(15, 85), rand(15, 85)]]
    let angle = rand(0, 360)
    for (let i = 1; i < pointCount; i++) {
      angle += rand(-maxTurnDeg, maxTurnDeg)
      const rad = (angle * Math.PI) / 180
      const len = rand(6, 16)
      const last = points[points.length - 1]!
      points.push([Math.max(2, Math.min(98, last[0] + Math.cos(rad) * len)), Math.max(2, Math.min(98, last[1] + Math.sin(rad) * len))])
    }
    return {
      lines: points.slice(0, -1).map((pt, i) => {
        const next = points[i + 1]!
        return { x1: pt[0], y1: pt[1], x2: next[0], y2: next[1] }
      }),
    }
  })
}

const FLASH_TRANSITION_MS = 1600

const meteors = shallowRef<Meteor[]>([])
const normalStars = shallowRef<Star[]>([])
const glowStars = shallowRef<Star[]>([])
const constellations = shallowRef<Constellation[]>([])
const flashStars = ref<FlashStar[]>([])
const flashTimers = new Map<number, ReturnType<typeof setTimeout>>()

function schedule(index: number, delay: number, task: () => void): void {
  const existing = flashTimers.get(index)
  if (existing)
    clearTimeout(existing)
  const timer = setTimeout(() => {
    flashTimers.delete(index)
    task()
  }, delay)
  flashTimers.set(index, timer)
}

function scheduleFlash(index: number): void {
  schedule(index, rand(15, 40) * 1000, () => {
    const star = flashStars.value[index]
    if (!star)
      return
    star.visible = false
    schedule(index, FLASH_TRANSITION_MS, () => {
      const s = flashStars.value[index]
      if (!s)
        return
      s.x = rand(0, 100)
      s.y = rand(0, 100)
      s.visible = true
      scheduleFlash(index)
    })
  })
}

// Meteor animation
const meteorEls: Array<HTMLElement | null> = []
const alive = ref(true)

const meteorRgb = computed(() => isDark.value ? '255,255,255' : '28,25,23')

function meteorGradient(rgb: string): string {
  return `linear-gradient(to right, transparent, rgba(${rgb},0.3) 50%, rgba(${rgb},0.95) 88%, rgba(${rgb},0.4))`
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms))
}

async function runMeteorLoop(el: HTMLElement, m: Meteor): Promise<void> {
  await sleep(rand(0, m.cycle) * 1000)
  const tf = (x: number) => `rotate(${m.angle}deg) translateX(${x}px)`
  while (true) {
    try {
      await animate(el, {
        transform: [tf(-220), tf(480)],
        opacity: [1, 0],
      }, { duration: m.cycle * 0.13, ease: 'linear' }).finished
    }
    catch {
      break
    }
    if (!alive.value)
      break
    await sleep(m.cycle * 0.87 * 1000)
    if (!alive.value)
      break
  }
}

onMounted(async () => {
  meteors.value = generateMeteors(10)
  normalStars.value = generateNormalStars(190)
  glowStars.value = generateGlowStars(18, 190)
  constellations.value = generateConstellations(1)
  const raw = generateFlashStars(56, 190 + 18)
  flashStars.value = raw.map(s => ({ ...s, visible: true }))
  flashStars.value.forEach((_, i) => schedule(i, rand(0, 20) * 1000, () => scheduleFlash(i)))

  await nextTick()
  meteors.value.forEach((m, i) => {
    const el = meteorEls[i]
    if (el)
      runMeteorLoop(el, m)
  })
})

onUnmounted(() => {
  alive.value = false
  flashTimers.forEach(clearTimeout)
  flashTimers.clear()
})

function glowFilter(r: number): string {
  if (r >= 2.8)
    return 'url(#glow-lg)'
  if (r >= 1.8)
    return 'url(#glow-md)'
  return 'url(#glow-sm)'
}

const fill = computed(() => isDark.value ? 'white' : 'black')
</script>

<template>
  <div class="absolute inset-0 overflow-hidden">
    <svg
      class="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow-sm" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-md" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-lg" x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <!-- Constellation lines -->
      <g v-for="(constellation, ci) in constellations" :key="`c-${ci}`">
        <line
          v-for="(line, li) in constellation.lines"
          :key="`cl-${li}`"
          :x1="`${line.x1}%`" :y1="`${line.y1}%`"
          :x2="`${line.x2}%`" :y2="`${line.y2}%`"
          stroke="white" stroke-opacity="0.18" stroke-width="0.5" stroke-linecap="round"
        />
      </g>

      <!-- Normal twinkling stars -->
      <Motion
        v-for="star in normalStars"
        :key="star.id"
        as="circle"
        :cx="`${star.x}%`" :cy="`${star.y}%`" :r="star.r" :fill
        :animate="{ opacity: [star.opacity, star.opacity * 0.07, star.opacity] }"
        :transition="{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }"
      />

      <!-- Glow stars -->
      <Motion
        v-for="star in glowStars"
        :key="star.id"
        as="circle"
        :cx="`${star.x}%`" :cy="`${star.y}%`" :r="star.r" :fill
        :filter="glowFilter(star.r)"
        :animate="{ opacity: [star.opacity, star.opacity * 0.07, star.opacity] }"
        :transition="{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }"
      />

      <!-- Flash stars: fade out → teleport → fade in -->
      <Motion
        v-for="(star, i) in flashStars"
        :key="`flash-${i}`"
        as="circle"
        :cx="`${star.x}%`" :cy="`${star.y}%`" :r="star.r" :fill
        :animate="{ opacity: star.visible ? star.opacity : 0 }"
        :transition="{ duration: 1.5, ease: 'easeInOut' }"
      />
    </svg>

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <span
        v-for="(m, i) in meteors"
        :key="m.id"
        :ref="(el: unknown) => { meteorEls[i] = el as HTMLElement | null }"
        class="absolute"
        :style="{
          top: `${m.top}%`,
          left: `${m.left}%`,
          width: `${m.length}px`,
          height: '1.5px',
          opacity: 0,
          transformOrigin: 'left center',
          transform: `rotate(${m.angle}deg) translateX(-220px)`,
          background: meteorGradient(meteorRgb),
        }"
      />
    </div>
  </div>
</template>
