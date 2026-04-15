<script setup lang="ts">
const studentCards = [
  {
    title: 'Student',
    description: 'Based in Hangzhou, China. Learning under real constraints.',
    icon: 'i-ph-graduation-cap',
    tags: ['Hangzhou', 'Junior High'],
  },
  {
    title: 'Growth',
    description: 'I like tracking change over time — skills, taste, mindset.',
    icon: 'i-ph-trend-up',
    tags: ['Skills', 'Mindset'],
  },
  {
    title: 'Balance',
    description: 'School pressure vs building things: still finding the sweet spot.',
    icon: 'i-ph-scales',
    tags: ['School', 'Building'],
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
          class="font-rounded absolute left-[-0.15em] top-[-0.35em] text-[clamp(72px,14vw,220px)] font-black -tracking-[0.04em] text-stone-900/8 dark:text-stone-100/6 select-none"
          style="-webkit-text-fill-color: transparent; -webkit-text-stroke: 2px currentColor;"
        >
          STUDENT
        </div>
        <div class="font-rounded absolute right-[-0.25em] bottom-[-0.35em] rotate-12 text-[clamp(44px,10vw,160px)] font-black -tracking-[0.04em] text-stone-900/4 dark:text-stone-100/3 select-none">
          CONSTRAINTS
        </div>
      </div>
    </template>

    <div class="grid gap-3 md:grid-cols-12 md:gap-4">
      <div class="md:col-span-4">
        <div class="rounded-2xl border border-stone-200 p-5 dark:border-stone-800">
          <div class="font-mono text-12px tracking-[0.14em] text-stone-500 dark:text-stone-400 uppercase">
            Context
          </div>
          <div class="mt-3 text-14px leading-19px text-stone-900 dark:text-stone-100">
            Junior high school life, real constraints, and steady progress.
          </div>

          <NuxtLink
            to="/timeline"
            class="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-200 px-3 py-2 text-13px text-stone-700 no-underline transition-all hover:border-amber-200 hover:text-amber-700 dark:border-stone-800 dark:text-stone-300 dark:hover:border-amber-900/60 dark:hover:text-amber-400"
          >
            <span class="i-ph-tree-evergreen h-4 w-4 text-stone-500 dark:text-stone-400" aria-hidden="true" />
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
            :tags="card.tags"
          />

          <HomeCard
            class="md:col-span-2"
            title="Next: timeline tree UI"
            description="A scrollable tree structure with years, nodes, and small artifacts. Coming later."
            icon="i-ph-flow-arrow"
            :tags="['WIP', 'Coming soon']"
          />
        </div>
      </div>
    </div>
  </HomeSection>
</template>
