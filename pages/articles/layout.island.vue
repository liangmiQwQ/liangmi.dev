<script setup lang="ts">
import Footer from '~/components/Footer.vue'
</script>

<template>
  <div min-h-screen bg="taupe-50 dark:taupe-950" text="taupe-950 dark:taupe-50">
    <div max-w-prose mx-auto px="6 md:12" py-16>
      <nav mb-10>
        <a
          href="/"
          flex="~ items-center gap-1.5"
          text-sm op50
          class="hover:op100 transition-opacity w-fit"
        >
          <span i-ph-arrow-left text-base />
          Home
        </a>
      </nav>
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style>
@import "@void/md/theme-content.css";
</style>
