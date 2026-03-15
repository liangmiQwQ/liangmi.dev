<script setup lang="ts">
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
] as const
</script>

<template>
  <HomeSection
    id="hobbies"
    title="Hobbies"
    subtitle="Outside code: curiosity, comfort, and tiny obsession loops."
  >
    <template #kicker>
      03 / Play
    </template>

    <template #background>
      <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          class="absolute left-[-0.15em] top-[-0.35em] text-[clamp(72px,14vw,220px)] font-black -tracking-[0.09em] text-zinc-900/18 dark:text-zinc-100/10 select-none"
          style="-webkit-text-fill-color: transparent; -webkit-text-stroke: 1px currentColor;"
        >
          HOBBIES
        </div>
        <div class="absolute right-[-0.2em] bottom-[-0.25em] -rotate-12 text-[clamp(48px,11vw,180px)] font-black -tracking-[0.08em] text-zinc-900/6 dark:text-zinc-100/5 select-none">
          PLAY
        </div>
      </div>
    </template>

    <div class="grid gap-3 md:grid-cols-12 md:gap-4">
      <HomeCard class="md:col-span-7" :title="hobbyCards[0].title" :description="hobbyCards[0].description" :icon="hobbyCards[0].icon" />
      <HomeCard class="md:col-span-5" :title="hobbyCards[1].title" :description="hobbyCards[1].description" :icon="hobbyCards[1].icon" />
      <HomeCard class="md:col-span-5" :title="hobbyCards[2].title" :description="hobbyCards[2].description" :icon="hobbyCards[2].icon" />
      <HomeCard class="md:col-span-7" :title="hobbyCards[3].title" :description="hobbyCards[3].description" :icon="hobbyCards[3].icon" />

      <HomeCard
        class="md:col-span-12"
        title="Images (placeholder)"
        description="I’ll add cut-out photos and small SVG illustrations into these cards."
        icon="i-ph-image-square"
      >
        <template #media>
          <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-12px text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <span class="i-ph-image h-4 w-4" />
            <span>placeholder</span>
          </div>
        </template>
      </HomeCard>
    </div>
  </HomeSection>
</template>
