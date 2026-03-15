<script setup lang="ts">
import avatarUrl from '~/assets/me/avatar.png'

const info = useIInfo()

const scrollEl = ref<HTMLElement | null>(null)

useWheelPaging(scrollEl)

const devCards = [
  {
    title: 'Open Source',
    description: 'Contributing, reviewing, and shipping small pieces that matter.',
    icon: 'i-ph-git-pull-request',
    href: `https://github.com/${info.contact.github}`,
    target: '_blank' as const,
  },
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

const studentCards = [
  {
    title: 'Student',
    description: 'Based in Hangzhou, China. Learning under real constraints.',
    icon: 'i-ph-graduation-cap',
  },
  {
    title: 'Growth',
    description: 'I like tracking change over time — skills, taste, mindset.',
    icon: 'i-ph-trend-up',
  },
  {
    title: 'Balance',
    description: 'School pressure vs building things: still finding the sweet spot.',
    icon: 'i-ph-scales',
  },
]

const hobbyCards = [
  {
    title: 'Anime',
    description: 'Comfort stories, sharp visuals, and good music.',
    icon: 'i-ph-film-strip',
  },
  {
    title: 'Minecraft',
    description: 'PvP / survival with friends, plus mods & plugins sometimes.',
    icon: 'i-ph-cube',
  },
  {
    title: 'Cubing',
    description: '3×3 in ~20s on a good day.',
    icon: 'i-ph-squares-four',
  },
  {
    title: 'Hacking on ideas',
    description: 'Small experiments, small wins.',
    icon: 'i-ph-sparkle',
  },
]
</script>

<template>
  <div class="relative">
    <main ref="scrollEl" class="home-scroll h-[100dvh] overflow-y-auto" style="scroll-snap-type:y mandatory;">
      <section id="hero" class="home-snap min-h-[100dvh] flex items-center" data-snap>
        <div class="mx-auto w-full max-w-[1040px] px-4 py-7">
          <div class="flex flex-col gap-6 min-h-0">
            <div flex="~ items-center gap-3" min-h="0">
              <div class="h-16 w-16 overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
                <img :src="avatarUrl" :alt="`${info.name} avatar`" class="h-full w-full object-cover">
              </div>
              <div flex="~ col gap-1" min-h="0">
                <div class="font-mono text-12px text-zinc-500 dark:text-zinc-400">
                  Student developer · Designer-ish · OSS enthusiast
                </div>
                <h1 class="m-0 text-[clamp(28px,6vw,44px)] leading-[1.05] -tracking-[0.04em]">
                  {{ info.name }}
                </h1>
              </div>
            </div>

            <p class="m-0 max-w-[56ch] text-15px leading-22px text-zinc-700 dark:text-zinc-300">
              {{ info.bio }}
            </p>

            <ContactLinks :info="info" />

            <div class="inline-flex items-center gap-2 text-12px text-zinc-500 dark:text-zinc-400" aria-hidden="true">
              <span class="i-ph-arrow-down h-4 w-4" />
              <span>Scroll</span>
            </div>
          </div>
        </div>
      </section>

      <HomeSection
        id="dev"
        title="Developer & Designer"
        subtitle="I build interfaces and tools, and I care about the details."
        watermark
      >
        <div class="grid gap-3 md:grid-cols-12 md:gap-4">
          <div class="md:col-span-5">
            <div class="flex flex-col gap-3">
              <div class="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                <div class="font-mono text-12px text-zinc-500 dark:text-zinc-400">
                  Focus
                </div>
                <div class="mt-2 text-14px leading-18px text-zinc-900 dark:text-zinc-100">
                  Frontend engineering, design details, and shipping.
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="rounded-full border border-zinc-200 px-3 py-1 text-12px text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">Nuxt</span>
                  <span class="rounded-full border border-zinc-200 px-3 py-1 text-12px text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">Vue</span>
                  <span class="rounded-full border border-zinc-200 px-3 py-1 text-12px text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">TypeScript</span>
                  <span class="rounded-full border border-zinc-200 px-3 py-1 text-12px text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">Tooling</span>
                </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-7">
            <div class="grid gap-3 md:grid-cols-2 md:gap-4">
              <HomeCard
                v-for="card in devCards"
                :key="card.title"
                :title="card.title"
                :description="card.description"
                :icon="card.icon"
                :href="card.href"
                :target="card.target"
              />
            </div>
          </div>

          <HomeCard class="md:col-span-12" title="Featured (placeholder)" description="This is where a project snapshot or a short case study will go." icon="i-ph-star">
            <template #media>
              <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-12px text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <span class="i-ph-placeholder h-4 w-4" />
                <span>placeholder</span>
              </div>
            </template>
          </HomeCard>
        </div>
      </HomeSection>

      <HomeSection
        id="student"
        title="Student"
        subtitle="Learning with real constraints — and still shipping."
        watermark
      >
        <div class="grid gap-3 md:grid-cols-12 md:gap-4">
          <div class="md:col-span-4">
            <div class="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
              <div class="font-mono text-12px text-zinc-500 dark:text-zinc-400">
                Context
              </div>
              <div class="mt-2 text-14px leading-18px text-zinc-900 dark:text-zinc-100">
                Junior high school life, real constraints, and steady progress.
              </div>

              <NuxtLink
                to="/timeline"
                class="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-13px text-zinc-700 no-underline hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-700"
              >
                <span class="i-ph-tree-evergreen h-4 w-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                <span>Timeline (WIP)</span>
              </NuxtLink>
            </div>
          </div>

          <div class="md:col-span-8">
            <div class="grid gap-3 md:grid-cols-2 md:gap-4">
              <HomeCard
                v-for="card in studentCards"
                :key="card.title"
                :title="card.title"
                :description="card.description"
                :icon="card.icon"
              />
            </div>
          </div>

          <HomeCard class="md:col-span-12" title="Next: timeline tree UI" description="A scrollable tree structure with years, nodes, and small artifacts. Coming later." icon="i-ph-flow-arrow">
            <template #media>
              <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-12px text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <span class="i-ph-tree-structure h-4 w-4" />
                <span>soon</span>
              </div>
            </template>
          </HomeCard>
        </div>
      </HomeSection>

      <HomeSection
        id="hobbies"
        title="Hobbies"
        subtitle="Things that keep me curious outside of code."
        watermark
      >
        <div class="grid gap-3 md:grid-cols-12 md:gap-4">
          <HomeCard class="md:col-span-7" :title="hobbyCards[0]!.title" :description="hobbyCards[0]!.description" :icon="hobbyCards[0]!.icon" />
          <HomeCard class="md:col-span-5" :title="hobbyCards[1]!.title" :description="hobbyCards[1]!.description" :icon="hobbyCards[1]!.icon" />
          <HomeCard class="md:col-span-5" :title="hobbyCards[2]!.title" :description="hobbyCards[2]!.description" :icon="hobbyCards[2]!.icon" />
          <HomeCard class="md:col-span-7" :title="hobbyCards[3]!.title" :description="hobbyCards[3]!.description" :icon="hobbyCards[3]!.icon" />

          <HomeCard class="md:col-span-12" title="Images (placeholder)" description="I’ll add cut-out photos and small SVG illustrations into these cards." icon="i-ph-image-square">
            <template #media>
              <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-12px text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <span class="i-ph-image h-4 w-4" />
                <span>placeholder</span>
              </div>
            </template>
          </HomeCard>
        </div>
      </HomeSection>
    </main>
  </div>
</template>

<style scoped>
.home-snap {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.home-scroll {
  overscroll-behavior: contain;
}
</style>
