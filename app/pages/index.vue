<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'
import HighlightsSection from '~/components/home/HighlightsSection.vue'
import TechStackSection from '~/components/home/TechStackSection.vue'

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div flex flex-col gap-12 md:gap-24>
    <HeroSection />
    <HighlightsSection />
    <TechStackSection />
  </div>
</template>
