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
    class="home-section relative min-h-[100dvh] flex items-stretch border-t border-stone-200/70 dark:border-stone-800/70 snap-start snap-always"
    data-snap
    :aria-labelledby="titleId"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <slot name="background">
        <div v-if="watermark" class="absolute inset-0">
          <div
            class="font-rounded absolute left-[-0.15em] top-[-0.25em] text-[clamp(72px,14vw,220px)] font-black -tracking-[0.04em] text-stone-900/8 dark:text-stone-100/6 select-none"
            style="-webkit-text-fill-color: transparent; -webkit-text-stroke: 2px currentColor;"
          >
            {{ title }}
          </div>
          <div
            class="font-rounded absolute right-[-0.35em] bottom-[-0.35em] -rotate-12 text-[clamp(56px,12vw,180px)] font-black -tracking-[0.04em] text-stone-900/4 dark:text-stone-100/3 select-none"
          >
            {{ title }}
          </div>
        </div>
      </slot>
    </div>

    <div class="relative mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16 flex flex-col justify-center gap-8">
      <header class="relative flex flex-col gap-3">
        <div flex="~ items-center gap-3" min-h="0">
          <div class="font-mono text-12px tracking-[0.14em] text-stone-500 dark:text-stone-400 uppercase">
            <slot name="kicker">
              {{ title }}
            </slot>
          </div>
          <div class="h-px flex-1 bg-stone-200/70 dark:bg-stone-800/70" />
        </div>

        <h2 :id="titleId" class="sr-only">
          {{ title }}
        </h2>

        <p v-if="subtitle" class="m-0 max-w-[70ch] text-[clamp(18px,2.4vw,28px)] leading-[1.12] -tracking-[0.03em] text-stone-900 dark:text-stone-100">
          {{ subtitle }}
        </p>
      </header>

      <div>
        <slot />
      </div>
    </div>
  </section>
</template>
