<script setup lang="ts">
const hobbyCards = [
  {
    title: 'Anime',
    description: 'Comfort stories, sharp visuals, and good music.',
    icon: 'i-ph-film-strip',
    tags: ['Comfort', 'Visuals', 'OST'],
  },
  {
    title: 'Minecraft',
    description: 'PvP / survival with friends, plus mods & plugins sometimes.',
    icon: 'i-ph-cube',
    tags: ['PvP', 'Survival', 'Mods'],
  },
  {
    title: 'Cubing',
    description: '3×3 in ~20s on a good day.',
    icon: 'i-ph-squares-four',
    tags: ['3×3', '~20s avg'],
  },
  {
    title: 'Hacking on ideas',
    description: 'Small experiments, small wins.',
    icon: 'i-ph-sparkle',
    tags: ['Experiments', 'Side projects'],
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
          class="absolute left-[-0.15em] top-[-0.35em] text-[clamp(72px,14vw,220px)] font-black -tracking-[0.09em] text-stone-900/10 dark:text-stone-100/8 select-none"
          style="-webkit-text-fill-color: transparent; -webkit-text-stroke: 2px currentColor;"
        >
          HOBBIES
        </div>
        <div class="absolute right-[-0.2em] bottom-[-0.25em] -rotate-12 text-[clamp(48px,11vw,180px)] font-black -tracking-[0.08em] text-stone-900/5 dark:text-stone-100/4 select-none">
          PLAY
        </div>
      </div>
    </template>

    <div class="grid gap-3 md:grid-cols-12 md:gap-4">
      <HomeCard
        class="md:col-span-7"
        :title="hobbyCards[0].title"
        :description="hobbyCards[0].description"
        :icon="hobbyCards[0].icon"
        :tags="hobbyCards[0].tags"
      />
      <HomeCard
        class="md:col-span-5"
        :title="hobbyCards[1].title"
        :description="hobbyCards[1].description"
        :icon="hobbyCards[1].icon"
        :tags="hobbyCards[1].tags"
      />
      <HomeCard
        class="md:col-span-5"
        :title="hobbyCards[2].title"
        :description="hobbyCards[2].description"
        :icon="hobbyCards[2].icon"
        :tags="hobbyCards[2].tags"
      />
      <HomeCard
        class="md:col-span-7"
        :title="hobbyCards[3].title"
        :description="hobbyCards[3].description"
        :icon="hobbyCards[3].icon"
        :tags="hobbyCards[3].tags"
      />
    </div>
  </HomeSection>
</template>
