<script setup lang="ts">
const highlights = [
  { title: 'Frontend Developer', desc: 'Crafting user-centric modern web applications with precision.' },
  { title: 'Open Source', desc: 'Active contributor and learner in the vivid developer ecosystem.' },
]
</script>

<template>
  <section grid grid-cols-1 md:grid-cols-2 gap-6>
    <div v-for="(item, i) in highlights" :key="i" p-6 rounded-2xl border="~ warmfg-light/5 dark:warmfg-dark/5" bg="warmfg-light/3 dark:warmfg-dark/3" hover:bg="warmfg-light/5 dark:warmfg-dark/5" transition-colors duration-300>
      <div i-ph-star-four-duotone text-2xl mb-4 text="warmfg-light/60 dark:warmfg-dark/60" />
      <h3 text-xl font-bold mb-2>
        {{ item.title }}
      </h3>
      <p text="warmfg-light/70 dark:warmfg-dark/70" leading-relaxed>
        {{ item.desc }}
      </p>
    </div>
  </section>
</template>
