<template>
  <div
    min-h-screen
    bg="warmbg-light dark:warmbg-dark"
    class="warmfg-light dark:warmfg-dark"
    font-sans duration-300 antialiased
  >
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
