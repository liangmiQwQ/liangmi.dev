<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string
  title: string
  subtitle?: string
  watermark?: boolean
}>(), {
  subtitle: undefined,
  watermark: true,
})

const titleId = computed(() => `home-${props.id}-title`)
</script>

<template>
  <section
    :id="id"
    class="home-section relative min-h-[100dvh] flex items-stretch border-t border-zinc-200/70 dark:border-zinc-800/70"
    data-snap
    :aria-labelledby="titleId"
    style="scroll-snap-align: start; scroll-snap-stop: always;"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <slot name="background">
        <div v-if="watermark" class="absolute inset-0">
          <div
            class="absolute left-[-0.15em] top-[-0.25em] text-[clamp(72px,14vw,220px)] font-extrabold -tracking-[0.08em] text-zinc-900/20 dark:text-zinc-100/12 select-none"
            style="-webkit-text-fill-color: transparent; -webkit-text-stroke: 2px currentColor;"
          >
            {{ title }}
          </div>
          <div
            class="absolute right-[-0.35em] bottom-[-0.35em] -rotate-12 text-[clamp(56px,12vw,180px)] font-extrabold -tracking-[0.08em] text-zinc-900/6 dark:text-zinc-100/5 select-none"
          >
            {{ title }}
          </div>
        </div>
      </slot>
    </div>

    <div class="relative mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16 flex flex-col justify-center gap-8">
      <header class="relative flex flex-col gap-3">
        <div flex="~ items-center gap-3" min-h="0">
          <div class="font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase">
            <slot name="kicker">
              {{ title }}
            </slot>
          </div>
          <div class="h-px flex-1 bg-zinc-200/70 dark:bg-zinc-800/70" />
          <div class="hidden md:block font-mono text-12px text-zinc-500 dark:text-zinc-400">
            Scroll-snap
          </div>
        </div>

        <h2 :id="titleId" class="sr-only">
          {{ title }}
        </h2>

        <p v-if="subtitle" class="m-0 max-w-[70ch] text-[clamp(18px,2.4vw,28px)] leading-[1.12] -tracking-[0.03em] text-zinc-950 dark:text-zinc-50">
          {{ subtitle }}
        </p>
      </header>

      <div>
        <slot />
      </div>
    </div>
  </section>
</template>
