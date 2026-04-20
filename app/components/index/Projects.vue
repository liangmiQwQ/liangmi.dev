<script lang="ts" setup>
import projectsConfig from '~/assets/me/projects.json'
</script>

<template>
  <section mb-28>
    <div
      flex items-center gap-3 mb-9
      font-label text="[10.5px] stone-500" tracking="[0.16em]" uppercase
    >
      <span flex-shrink-0 w-7 h-px bg-current op40 />
      Things I'm building / take part in
    </div>
    <div
      grid="~ cols-1 sm:cols-2 lg:cols-3"
      gap-px bg="stone-200 dark:stone-800"
      border="~ stone-200 dark:stone-800"
    >
      <IndexProjectCard
        v-for="project in projectsConfig"
        :key="project.num"
        v-bind="project"
      />
    </div>
  </section>
</template>
