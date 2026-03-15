<script setup lang="ts">
defineProps<{
  id: string
  title: string
  subtitle?: string
  watermark?: boolean
}>()
</script>

<template>
  <section
    :id="id"
    class="home-section"
    data-snap
  >
    <div class="home-section__inner">
      <header class="home-section__header">
        <div v-if="watermark" class="home-section__watermark" aria-hidden="true">
          {{ title }}
        </div>
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
  border-top: 1px solid rgba(161, 161, 170, 0.22);
}

.home-section__inner {
  width: min(1040px, 100%);
  margin: 0 auto;
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  position: relative;
}

.home-section__header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}

.home-section__watermark {
  position: absolute;
  inset: -18px 0 auto 0;
  font-size: clamp(56px, 12vw, 120px);
  line-height: 1;
  letter-spacing: -0.06em;
  font-weight: 700;
  color: rgba(24, 24, 27, 0.06);
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:global(html.dark) .home-section__watermark {
  color: rgba(250, 250, 250, 0.04);
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
