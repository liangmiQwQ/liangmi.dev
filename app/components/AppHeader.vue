<template>
  <header
    flex="~ items-center justify-between"
    sticky top-0 z-50 h-14 w-full bg="warmbg-light/80 dark:warmbg-dark/80"
    px-6
  >
    <Logo :size="40" />

    <div flex items-center gap-2 md:gap-4>
      <ThemeToggle />
    </div>
  </header>
</template>
