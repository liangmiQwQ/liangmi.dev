<script setup lang="ts">
// No extra logic needed for a placeholder
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
    <!-- Center Content -->
    <div class="max-w-md w-full text-center space-y-12 animate-fade-in">
      <!-- Logo Area -->
      <div class="relative group">
        <div class="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
        <div class="relative flex items-center justify-center">
          <!-- Light Mode Logo -->
          <img
            alt="LiangMi Logo"
            class="w-48 h-48 dark:hidden drop-shadow-sm"
          >
          <!-- Dark Mode Logo -->
          <img
            alt="LiangMi Logo"
            class="hidden dark:block w-48 h-48 drop-shadow-sm"
          >
        </div>
      </div>

      <!-- Main Text -->
      <div class="space-y-6">
        <h1 class="text-5xl font-black tracking-tight italic">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            LiangMi
          </span>
        </h1>

        <div class="flex flex-col items-center space-y-2">
          <p class="text-xl font-medium text-slate-600 dark:text-zinc-400 tracking-wide">
            Under Development...
          </p>
          <div class="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
        </div>
      </div>

      <!-- Links/Social -->
      <div class="pt-4 flex flex-col items-center space-y-6">
        <a
          href="https://github.com/liangmiQwQ"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg class="w-6 h-6 fill-current text-slate-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span class="text-sm font-semibold text-slate-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Follow on GitHub
          </span>
        </a>
      </div>
    </div>

    <!-- Footer -->
    <footer class="absolute bottom-10 text-[10px] font-bold text-slate-400 dark:text-zinc-600 tracking-[0.2em] uppercase">
      &copy; {{ new Date().getFullYear() }} LIANGMI &bull; BUILT WITH NUXT
    </footer>
  </main>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

:deep(img) {
  -webkit-user-drag: none;
}
</style>
