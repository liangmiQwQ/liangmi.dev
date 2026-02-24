<template>
  <div flex flex-col gap-12 md:gap-24>
    <section flex flex-col items-start gap-6 py-12 md:py-24 animation-fade-in>
      <div
        inline-flex items-center gap-2 px-3 py-1 rounded-full
        border="~ fg-light/10 dark:fg-dark/10"
        bg="bg-light dark:bg-dark"
        text-sm font-medium tracking-wide
      >
        <div w-2 h-2 rounded-full bg-green-500 animate-pulse />
        Available for new projects
      </div>

      <h1 text-4xl md:6xl font-bold tracking-tight leading-tight max-w-3xl>
        Building warm, beautiful, <br>
        <span class="black/60 dark:white/60">and functional</span> <br>
        digital experiences.
      </h1>

      <p text="lg md:xl fg-light/80 dark:fg-dark/80" max-w-2xl leading-relaxed>
        I'm <span font-semibold class="fg-light dark:fg-dark">Liang</span>, a web developer focused on creating clean, accessible, and performant interfaces using modern web technologies.
      </p>

      <div flex flex-wrap items-center gap-4 mt-4>
        <Button href="https://github.com/liangmiQwQ" target="_blank" variant="solid">
          <div i-ph-github-logo-duotone mr-2 text-lg />
          GitHub
        </Button>
        <Button to="/blog">
          <div i-ph-notebook-duotone mr-2 text-lg />
          Read Blog
        </Button>
        <ThemeToggle />
      </div>
    </section>
  </div>
</template>
