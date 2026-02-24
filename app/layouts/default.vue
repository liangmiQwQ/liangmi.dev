<template>
  <div
    min-h-screen
    bg="warmbg-light dark:warmbg-dark"
    class="warmfg-light dark:warmfg-dark"
    font-sans duration-300 antialiased
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

<style>
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  padding: 0;
}
</style>
