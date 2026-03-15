<script setup lang="ts">
import type { IInfo } from '~/types'

const props = defineProps<{
  info: IInfo
}>()

interface DevCard {
  title: string
  description: string
  icon: string
  href?: string
  target?: '_blank' | '_self'
  gridClass?: string
}

const devCards = computed<DevCard[]>(() => {
  const cards: DevCard[] = [
    {
      title: 'Frontend',
      description: 'Nuxt / Vue / TypeScript — with a strong bias for DX and clarity.',
      icon: 'i-ph-browser',
    },
    {
      title: 'Design',
      description: 'Layout, motion, and details — simple, not boring.',
      icon: 'i-ph-paint-brush-broad',
    },
    {
      title: 'Tooling',
      description: 'Linting, formatting, build tools, and performance instincts.',
      icon: 'i-ph-wrench',
    },
    {
      title: 'Writing',
      description: 'Notes and reflections, when I can turn noise into words.',
      icon: 'i-ph-pencil-line',
      href: '/blog',
    },
  ]

  if (props.info.contact.github) {
    cards.unshift({
      title: 'Open Source',
      description: 'Contributing, reviewing, and shipping small pieces that matter.',
      icon: 'i-ph-git-pull-request',
      href: `https://github.com/${props.info.contact.github}`,
      target: '_blank',
      gridClass: 'md:col-span-2',
    })
  }

  return cards
})
</script>

<template>
  <HomeSection
    id="dev"
    title="Developer & Designer"
    subtitle="I build interfaces and tools — and I like making typography do more work."
  >
    <template #kicker>
      01 / Dev
    </template>

    <template #background>
      <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          class="absolute left-[-0.2em] top-[-0.35em] text-[clamp(72px,14vw,220px)] font-black -tracking-[0.09em] text-zinc-900/18 dark:text-zinc-100/10 select-none"
          style="-webkit-text-fill-color: transparent; -webkit-text-stroke: 1px currentColor;"
        >
          DEV
        </div>
        <div class="absolute right-[-0.3em] bottom-[-0.35em] -rotate-12 text-[clamp(56px,12vw,180px)] font-black -tracking-[0.08em] text-zinc-900/6 dark:text-zinc-100/5 select-none">
          DESIGN
        </div>
      </div>
    </template>

    <div class="grid gap-3 md:grid-cols-12 md:gap-4">
      <div class="md:col-span-5">
        <div class="rounded-3xl border border-zinc-200 p-5 dark:border-zinc-800">
          <div class="font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase">
            Focus
          </div>
          <div class="mt-3 text-15px leading-20px text-zinc-950 dark:text-zinc-50">
            Frontend engineering, design details, and shipping.
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="rounded-full border border-zinc-200 px-3 py-1 text-12px text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">Nuxt</span>
            <span class="rounded-full border border-zinc-200 px-3 py-1 text-12px text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">Vue</span>
            <span class="rounded-full border border-zinc-200 px-3 py-1 text-12px text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">TypeScript</span>
            <span class="rounded-full border border-zinc-200 px-3 py-1 text-12px text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">Tooling</span>
          </div>
        </div>

        <div class="mt-3 rounded-3xl border border-zinc-200 p-5 dark:border-zinc-800">
          <div flex="~ items-center gap-2" min-h="0">
            <span class="i-ph-star h-4 w-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
            <div class="font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase">
              Featured (placeholder)
            </div>
          </div>
          <div class="mt-3 text-13px leading-18px text-zinc-700 dark:text-zinc-300">
            A project snapshot / case study lives here soon.
          </div>
        </div>
      </div>

      <div class="md:col-span-7">
        <div class="grid gap-3 md:grid-cols-2 md:gap-4">
          <HomeCard
            v-for="card in devCards"
            :key="card.title"
            :class="card.gridClass"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            :href="card.href"
            :target="card.target"
          />
        </div>
      </div>
    </div>
  </HomeSection>
</template>
