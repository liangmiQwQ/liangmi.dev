<template>
  <header sticky top-0 z-50 w-full backdrop-blur-md bg="warmbg-light/80 dark:warmbg-dark/80" border-b border="warmfg-light/5 dark:warmfg-dark/5">
    <div max-w-4xl mx-auto px-6 py-4 flex items-center justify-between>
      <NuxtLink to="/" text-xl font-bold tracking-tight text="warmfg-light dark:warmfg-dark" flex items-center gap-2 transition-colors hover:opacity-80>
        <div i-ph-code-block-duotone text-2xl />
        <span>Liang</span>
      </NuxtLink>
      
      <div flex items-center gap-2 md:gap-4>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
