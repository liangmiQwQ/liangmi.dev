<script setup lang="ts">
import { Link } from '@void/vue'
</script>

<template>
  <div max-w-prose mx-auto>
    <nav mb-10>
      <Link
        href="/articles"
        flex="~ items-center gap-1.5"
        text-sm op50
        class="hover:op100 transition-opacity w-fit"
      >
        <span i-ph-arrow-left text-base />
        Writing
      </Link>
    </nav>
    <slot />
  </div>
</template>

<style>
@import "@void/md/theme-content.css";
</style>
