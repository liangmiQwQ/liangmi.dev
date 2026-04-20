<script lang="ts" setup>
const windows = [
  {
    role: 'developer',
    heading: 'Patient with the details.',
    body: 'Parsers, compilers, linters. I like infra, cutting edge things, who give me a strong feeling of satisfaction.',
  },
  {
    role: 'student',
    heading: 'Still learning how to learn.',
    body: 'In China, as a public school\'s student. I try balancing exams, side projects. Then figuring out what I actually want.',
  },
  {
    role: 'person',
    heading: 'Off the clock, too.',
    body: 'YouTube late at night, Minecraft on weekends, write down thoughts when I can\'t sleep, or just daze. Being a person, first.',
  },
]
</script>

<template>
  <section>
    <div
      flex items-center gap-3 mb-9
      font-label text="[10.5px] stone-500" tracking="[0.16em]" uppercase
    >
      <span flex-shrink-0 w-7 h-px bg-current op40 />
      three windows into me
    </div>
    <div
      grid="~ cols-1 md:cols-3"
      border="t stone-200 dark:stone-800"
      class="divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-800"
    >
      <IndexPersonaWindow
        v-for="win in windows"
        :key="win.role"
        v-bind="win"
      />
    </div>
  </section>
</template>
