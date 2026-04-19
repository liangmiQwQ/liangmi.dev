<script lang="ts" setup>

</script>

<template>
  <main w-full h-screen relative overflow-x-hidden>
    <div
      text-4xl md:text-8xl
      font-serif pt-6 md:pt-12
      op95
      flex="~ col items-center justify-center" absolute h-full w-full
    >
      <span>
        Do things I love
      </span>
      <span>
        Learn about myself
      </span>
    </div>

    <div
      flex="~ items-center justify-between col"
      relative w-full h-screen
    >
      <div overflow-hidden>
        <HeroSky op80 />
      </div>
      <HeroFirstMagnitudeStar absolute md:-mt-4 />
      <HeroLand />
    </div>
  </main>
</template>
