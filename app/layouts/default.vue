<template>
  <div min-h-screen flex flex-col antialiased>
    <AppBar />
    <main flex-1 pt-24>
      <slot />
    </main>
    <footer py-8 text-center text-sm class="primary-light/50 dark:primary-dark/50">
      <p>© {{ new Date().getFullYear() }} Liang Mi</p>
    </footer>
  </div>
</template>
