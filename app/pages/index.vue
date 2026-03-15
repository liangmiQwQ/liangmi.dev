<script setup lang="ts">
import avatarUrl from '~/assets/me/avatar.png'

const info = useIInfo()

const scrollEl = ref<HTMLElement | null>(null)

useWheelPaging(scrollEl)
</script>

<template>
  <div class="relative">
    <main
      ref="scrollEl"
      class="h-[100dvh] overflow-y-auto overscroll-contain"
      style="scroll-snap-type:y mandatory; overscroll-behavior: contain;"
    >
      <HomeHero :info="info" :avatar-url="avatarUrl" />
      <HomeDevSection :info="info" />
      <HomeStudentSection />
      <HomeHobbiesSection />
    </main>
  </div>
</template>
