<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div flex flex-col gap-12 md:gap-24>
    <HeroSection />
  </div>
</template>
