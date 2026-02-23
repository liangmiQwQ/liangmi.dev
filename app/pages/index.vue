<script setup lang="ts">
// No extra logic needed for a placeholder
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center p-8 bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-700">
    <!-- Main Content Container -->
    <div class="max-w-screen-sm w-full space-y-16 animate-section-in">
      <!-- Logo Section with minimalist styling -->
      <section class="flex flex-col items-center space-y-8">
        <div class="relative group">
          <!-- Subtle glow effect replaced with a clean border or nothing for B&W -->
          <div class="relative overflow-hidden">
            <!-- Light Mode Logo with grayscale filter -->
            <img
              src="/animated-logo.light.svg"
              alt="LiangMi Logo"
              class="w-40 h-40 dark:hidden filter grayscale brightness-50 contrast-125 opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out"
            >
            <!-- Dark Mode Logo with grayscale filter -->
            <img
              src="/animated-logo.dark.svg"
              alt="LiangMi Logo"
              class="hidden dark:block w-40 h-40 filter grayscale brightness-150 contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out"
            >
          </div>
        </div>

        <div class="text-center space-y-4">
          <h1 class="text-5xl font-extralight tracking-tighter uppercase">
            COMING SOON
          </h1>
          <div class="h-[1px] w-12 bg-black dark:bg-white mx-auto opacity-30 group-hover:w-24 transition-all duration-700" />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
@keyframes section-in {
  from {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.animate-section-in {
  animation: section-in 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

:deep(img) {
  -webkit-user-drag: none;
}

/* Custom scrollbar for a premium feel if needed, though usually hidden for minimalist landing */
:global(body) {
  margin: 0;
  overflow-x: hidden;
  background: white;
}

:global(.dark body) {
  background: black;
}
</style>
