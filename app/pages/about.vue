<script setup lang="ts">
useHead({
  title: 'Liang - About',
})
</script>

<template>
  <div flex flex-col gap-8 animation-fade-in>
    <div flex items-center justify-between>
      <h1 class="3xl md:4xl" font-bold tracking-tight>
        About
      </h1>
    </div>

    <div class="prose dark:prose-invert max-w-none">
      <p class="lg fg-light/70 dark:fg-dark/70">
        Hi, I'm Liang. Welcome to my personal space on the web.
      </p>
      <!-- Add more content as needed -->
    </div>
  </div>
</template>

<style scoped>
.animation-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
