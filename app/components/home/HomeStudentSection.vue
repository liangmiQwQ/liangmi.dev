<script setup lang="ts">
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
] as const
</script>

<template>
  <HomeSection
    id="student"
    title="Student"
    subtitle="Learning with real constraints — and still shipping."
  >
    <template #kicker>
      02 / Student
    </template>

    <template #background>
      <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          class="absolute left-[-0.15em] top-[-0.35em] text-[clamp(72px,14vw,220px)] font-black -tracking-[0.09em] text-zinc-900/18 dark:text-zinc-100/10 select-none"
          style="-webkit-text-fill-color: transparent; -webkit-text-stroke: 2px currentColor;"
        >
          STUDENT
        </div>
        <div class="absolute right-[-0.25em] bottom-[-0.35em] rotate-12 text-[clamp(44px,10vw,160px)] font-black -tracking-[0.08em] text-zinc-900/6 dark:text-zinc-100/5 select-none">
          CONSTRAINTS
        </div>
      </div>
    </template>

    <div class="grid gap-3 md:grid-cols-12 md:gap-4">
      <div class="md:col-span-4">
        <div class="rounded-3xl border border-zinc-200 p-5 dark:border-zinc-800">
          <div class="font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase">
            Context
          </div>
          <div class="mt-3 text-14px leading-19px text-zinc-950 dark:text-zinc-50">
            Junior high school life, real constraints, and steady progress.
          </div>

          <NuxtLink
            to="/timeline"
            class="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-13px text-zinc-700 no-underline hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-700"
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

          <HomeCard
            class="md:col-span-2"
            title="Next: timeline tree UI"
            description="A scrollable tree structure with years, nodes, and small artifacts. Coming later."
            icon="i-ph-flow-arrow"
          >
            <template #media>
              <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-12px text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <span class="i-ph-tree-structure h-4 w-4" />
                <span>soon</span>
              </div>
            </template>
          </HomeCard>
        </div>
      </div>
    </div>
  </HomeSection>
</template>
