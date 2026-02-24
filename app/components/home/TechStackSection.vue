<script setup lang="ts">
const skills = ['Vue', 'Nuxt', 'TypeScript', 'UnoCSS', 'VueUse']
</script>

<template>
  <section flex flex-col gap-6>
    <h2 text-2xl font-bold flex items-center gap-2>
      <div i-ph-stack-duotone text="warmfg-light/60 dark:warmfg-dark/60" />
      Tech Stack
    </h2>
    <div flex flex-wrap gap-3>
      <div v-for="skill in skills" :key="skill" px-4 py-2 rounded-xl bg="warmfg-light/5 dark:warmfg-dark/5" text="sm warmfg-light/80 dark:warmfg-dark/80" font-medium border="~ warmfg-light/10 dark:warmfg-dark/10">
        {{ skill }}
      </div>
    </div>
  </section>
</template>
