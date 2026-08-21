<script setup lang="ts">
import Footer from '~/components/Footer.vue'
</script>

<template>
  <div
    class="article-layout"
    min-h-screen flex="~ col"
    bg="taupe-50 dark:taupe-950"
    text="taupe-950 dark:taupe-50"
  >
    <main class="article-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style>
@import "@void/md/theme-content.css";

.article-layout + a[aria-label="Built on Void"] {
  display: none;
}

.article-main {
  flex: 1;
  width: 100%;
  max-width: 48rem;
  margin-inline: auto;
  padding: 4rem 2rem;
}

@media (max-width: 39.999rem) {
  .article-main {
    padding: 3rem 1.25rem;
  }
}
</style>
