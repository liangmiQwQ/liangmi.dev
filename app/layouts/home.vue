<template>
  <div
    min-h-screen
    bg="warmbg-light dark:warmbg-dark"
    text="warmfg-light dark:warmfg-dark"
    font-sans antialiased
    selection:bg="warmfg-light/20 dark:warmfg-dark/20"
  >
    <SiteNav />
    <div px-6 py-4>
      <Logo :size="40" />
    </div>
    <main max-w-4xl mx-auto px-6 py-12 min-h-screen>
      <slot />
    </main>
  </div>
</template>
