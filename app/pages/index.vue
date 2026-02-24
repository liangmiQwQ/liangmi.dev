<script setup lang="ts">
// Simple page data config
const skills = ['Vue', 'Nuxt', 'TypeScript', 'UnoCSS', 'VueUse']
const highlights = [
  { title: 'Frontend Developer', desc: 'Crafting user-centric modern web applications with precision.' },
  { title: 'Open Source', desc: 'Active contributor and learner in the vivid developer ecosystem.' },
]
</script>

<template>
  <div flex flex-col gap-12 md:gap-24>
    <!-- Hero Section -->
    <section flex flex-col items-start gap-6 py-12 md:py-24 animation-fade-in>
      <div inline-flex items-center gap-2 px-3 py-1 rounded-full border="~ warmfg-light/10 dark:warmfg-dark/10" bg="warmbg-light dark:warmbg-dark" text-sm font-medium tracking-wide>
        <div w-2 h-2 rounded-full bg-green-500 animate-pulse />
        Available for new projects
      </div>

      <h1 text="4xl md:6xl" font-bold tracking-tight leading-tight max-w-3xl>
        Building warm, beautiful, <br>
        <span text="black/60 dark:white/60">and functional</span> <br>
        digital experiences.
      </h1>

      <p text="lg md:xl warmfg-light/80 dark:warmfg-dark/80" max-w-2xl leading-relaxed>
        I'm <span font-semibold text="warmfg-light dark:warmfg-dark">Liang</span>, a web developer focused on creating clean, accessible, and performant interfaces using modern web technologies.
      </p>

      <div flex flex-wrap items-center gap-4 mt-4>
        <BaseButton href="https://github.com" target="_blank" !bg="warmfg-light dark:warmfg-dark" !text="warmbg-light dark:warmbg-dark" hover:opacity-90>
          <div i-ph-github-logo-duotone mr-2 text-lg />
          GitHub
        </BaseButton>
        <BaseButton href="mailto:contact@example.com">
          <div i-ph-envelope-duotone mr-2 text-lg />
          Contact Me
        </BaseButton>
      </div>
    </section>

    <!-- Highlights Section -->
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

    <!-- Tech Stack Section -->
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
  </div>
</template>

<style scoped>
.animation-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
