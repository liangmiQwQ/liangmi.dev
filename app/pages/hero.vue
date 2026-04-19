<script lang="ts" setup>

</script>

<template>
  <main w-full h-screen relative>
    <div
      text-7xl font-serif
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
      relative w-full h-screen overflow-hidden
    >
      <HeroSky op80 />
      <HeroFirstMagnitudeStar absolute -mt-4 />
    </div>
  </main>
</template>
