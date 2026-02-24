<template>
  <div
    min-h-screen
    bg="bg-light dark:bg-dark"
    class="fg-light dark:fg-dark"
    font-sans duration-300 antialiased
  >
    <SiteNav />
    <main max-w-4xl mx-auto px-6 py-12 min-h-screen>
      <slot />
    </main>
  </div>
</template>
