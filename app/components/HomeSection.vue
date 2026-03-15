<script setup lang="ts">
defineProps<{
  id: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <section
    :id="id"
    class="home-section"
  >
    <div class="home-section__inner">
      <header class="home-section__header">
        <h2 class="home-section__title text-zinc-500 dark:text-zinc-400">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="home-section__subtitle text-zinc-900 dark:text-zinc-100">
          {{ subtitle }}
        </p>
      </header>

      <div class="home-section__content">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 100dvh;
  display: flex;
  align-items: stretch;
}

.home-section__inner {
  width: min(1040px, 100%);
  margin: 0 auto;
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
}

.home-section__header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.home-section__title {
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.home-section__subtitle {
  margin: 0;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.01em;
}

.home-section__content {
  min-height: 0;
}
</style>
