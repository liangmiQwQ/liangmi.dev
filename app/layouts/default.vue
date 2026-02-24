<template>
  <div min-h-screen bg="warmbg-light dark:warmbg-dark" text="warmfg-light dark:warmfg-dark" font-sans transition-colors duration-300 antialiased selection:bg="warmfg-light/20 dark:warmfg-dark/20">
    <AppHeader />
    <main max-w-4xl mx-auto px-6 py-12 min-h="[calc(100vh-64px)]">
      <slot />
    </main>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  padding: 0;
}
</style>
