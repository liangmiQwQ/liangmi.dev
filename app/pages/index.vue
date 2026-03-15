<script setup lang="ts">
import avatarUrl from '~/assets/me/avatar.png'
import info from '~/assets/me/i.json'

const contacts = [
  { label: 'GitHub', href: `https://github.com/${info.contact.github}`, icon: 'i-ph-github-logo' },
  { label: 'Email', href: `mailto:${info.contact.email}`, icon: 'i-ph-envelope-simple' },
  { label: 'Twitter', href: `https://x.com/${info.contact.twitter}`, icon: 'i-ph-x-logo' },
  { label: 'BiliBili', href: `https://space.bilibili.com/${info.contact.bilibili}`, icon: 'i-ph-play-circle' },
]

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
    title: 'Timeline',
    description: 'A growing tree of moments. Placeholder for now.',
    icon: 'i-ph-tree-evergreen',
    href: '/timeline',
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
    <main class="home-scroll h-[100dvh] overflow-y-auto" style="scroll-snap-type:y mandatory;">
      <section id="hero" class="home-snap min-h-[100dvh] flex items-center">
        <div class="mx-auto w-full max-w-[1040px] px-4 py-7">
          <div class="flex flex-col gap-6 min-h-0">
            <div flex="~ items-center gap-3" min-h="0">
              <div class="h-11 w-11 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
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

            <div flex="~ items-center gap-2 wrap" min-h="0">
              <a
                v-for="c in contacts"
                :key="c.label"
                class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-13px text-zinc-700 no-underline dark:border-zinc-800 dark:text-zinc-200"
                :href="c.href"
                target="_blank"
                rel="noreferrer"
              >
                <span :class="c.icon" class="h-4 w-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                <span>{{ c.label }}</span>
              </a>
            </div>

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
      >
        <div grid="~ cols-1 gap-3 md:cols-12">
          <HomeCard
            v-for="card in devCards"
            :key="card.title"
            class="md:col-span-6"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            :href="card.href"
            :target="card.target"
          />

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
      >
        <div grid="~ cols-1 gap-3 md:cols-12">
          <HomeCard
            v-for="card in studentCards"
            :key="card.title"
            class="md:col-span-6"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            :href="card.href"
          />

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
      >
        <div grid="~ cols-1 gap-3 md:cols-12">
          <HomeCard
            v-for="card in hobbyCards"
            :key="card.title"
            class="md:col-span-6"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
          />

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
</style>
