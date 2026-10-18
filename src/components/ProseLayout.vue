<script setup lang="ts">
import Footer from '~/components/Footer.vue'
</script>

<template>
  <div
    class="prose-layout"
    min-h-screen
    flex="~ col"
    bg="taupe-50 dark:taupe-950"
    text="taupe-950 dark:taupe-50"
  >
    <main class="prose-main">
      <slot />
      <Footer />
    </main>
  </div>
</template>

<style>
@import '@void/md/theme-content.css';

.prose-layout + a[aria-label='Built on Void'] {
  display: none;
}

.prose-main {
  flex: 1;
  width: 100%;
  max-width: 48rem;
  margin-inline: auto;
  padding: 4rem 2rem;
}

@media (max-width: 39.999rem) {
  .prose-main {
    padding: 3rem 1.25rem;
  }
}
</style>
