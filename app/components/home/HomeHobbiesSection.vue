<script setup lang="ts">
const hobbyCards = [
  {
    title: 'Anime',
    description: 'Comfort stories, sharp visuals, and good music.',
    icon: 'i-ph-film-strip',
    tags: ['Comfort', 'Visuals', 'OST'],
    gridClass: 'md:col-span-7',
  },
  {
    title: 'Minecraft',
    description: 'PvP / survival with friends, plus mods & plugins sometimes.',
    icon: 'i-ph-cube',
    tags: ['PvP', 'Survival', 'Mods'],
    gridClass: 'md:col-span-5',
  },
  {
    title: 'Cubing',
    description: '3×3 in ~20s on a good day.',
    icon: 'i-ph-squares-four',
    tags: ['3×3', '~20s avg'],
    gridClass: 'md:col-span-5',
  },
  {
    title: 'Hacking on ideas',
    description: 'Small experiments, small wins.',
    icon: 'i-ph-sparkle',
    tags: ['Experiments', 'Side projects'],
    gridClass: 'md:col-span-7',
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
          class="font-rounded absolute left-[-0.15em] top-[-0.35em] text-[clamp(72px,14vw,220px)] font-black -tracking-[0.04em] text-stone-900/8 dark:text-stone-100/6 select-none"
          style="-webkit-text-fill-color: transparent; -webkit-text-stroke: 2px currentColor;"
        >
          HOBBIES
        </div>
        <div class="font-rounded absolute right-[-0.2em] bottom-[-0.25em] -rotate-12 text-[clamp(48px,11vw,180px)] font-black -tracking-[0.04em] text-stone-900/4 dark:text-stone-100/3 select-none">
          PLAY
        </div>
      </div>
    </template>

    <div class="grid gap-3 md:grid-cols-12 md:gap-4">
      <HomeCard
        v-for="card in hobbyCards"
        :key="card.title"
        :class="card.gridClass"
        :title="card.title"
        :description="card.description"
        :icon="card.icon"
        :tags="card.tags"
      />
    </div>
  </HomeSection>
</template>
