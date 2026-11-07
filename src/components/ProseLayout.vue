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

/* From md the article sits beside the TOC sidebar (see ArticleNav), centered while the TOC is collapsed. */
@media (min-width: 48rem) {
  .prose-layout:has(.article-nav) .prose-main {
    width: auto;
    margin-right: 0;
    margin-left: max(4rem, 50vw - 24rem);
    transition: margin-left 0.3s ease;
  }

  /* Two columns: center the article in the space right of the TOC, keeping a 3rem gap to the text. */
  :root:not(.toc-collapsed) .prose-layout:has(.article-nav) .prose-main {
    --toc-end: max(16rem, 50vw - 21rem);
    margin-left: max(var(--toc-end) + 1rem, (100vw + var(--toc-end) - 48rem) / 2);
  }
}

/* Three columns: the TOC and actions mirror each other, so the article sits 4rem right of center. */
@media (min-width: 80rem) {
  :root:not(.toc-collapsed) .prose-layout:has(.article-nav) .prose-main {
    margin-left: calc(50vw - 20rem);
  }
}

@media (max-width: 39.999rem) {
  .prose-main {
    padding: 3rem 1.25rem;
  }
}
</style>
