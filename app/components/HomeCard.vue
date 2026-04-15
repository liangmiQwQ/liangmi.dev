<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  description?: string
  icon?: string
  href?: string
  target?: '_blank' | '_self'
  tags?: readonly string[]
}>(), {
  description: undefined,
  icon: undefined,
  href: undefined,
  target: '_self',
  tags: undefined,
})

const tag = computed(() => props.href ? 'a' : 'div')
</script>

<template>
  <component
    :is="tag"
    class="home-card group block rounded-2xl border border-stone-200 bg-stone-50/40 p-5 text-inherit no-underline transition-all hover:border-amber-200 hover:bg-amber-50/30 dark:border-stone-800 dark:bg-stone-900/20 dark:hover:border-amber-900/50 dark:hover:bg-amber-950/20"
    :href="props.href"
    :target="props.href ? props.target : undefined"
    :rel="props.href && props.target === '_blank' ? 'noreferrer' : undefined"
  >
    <div class="flex flex-col gap-4 min-h-0">
      <div v-if="props.icon" class="home-card__icon-wrap">
        <div :class="props.icon" class="home-card__icon" />
      </div>

      <div class="flex flex-col gap-1.5 min-h-0">
        <div class="home-card__title text-stone-900 dark:text-stone-100">
          {{ props.title }}
        </div>
        <div v-if="props.description" class="home-card__desc text-stone-600 dark:text-stone-400">
          {{ props.description }}
        </div>
      </div>

      <div v-if="props.tags?.length || $slots.media || props.href" class="home-card__footer">
        <div v-if="props.tags?.length" class="flex flex-wrap gap-1.5">
          <span
            v-for="t in props.tags"
            :key="t"
            class="home-card__tag"
          >{{ t }}</span>
        </div>
        <div v-if="$slots.media">
          <slot name="media" />
        </div>
        <div v-if="props.href" class="home-card__arrow text-stone-400 dark:text-stone-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 ml-auto">
          <span class="i-ph-arrow-up-right" aria-hidden="true" />
        </div>
      </div>
    </div>
  </component>
</template>

<style scoped>
.home-card:focus-visible {
  outline: 2px solid color-mix(in oklch, var(--color-amber-500) 45%, transparent);
  outline-offset: 2px;
}

.home-card__icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: color-mix(in oklch, var(--color-amber-100) 70%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  transition: background 200ms ease;
}

:is(.dark) .home-card__icon-wrap {
  background: color-mix(in oklch, var(--color-amber-900) 35%, transparent);
}

.home-card:hover .home-card__icon-wrap {
  background: color-mix(in oklch, var(--color-amber-200) 70%, transparent);
}

:is(.dark) .home-card:hover .home-card__icon-wrap {
  background: color-mix(in oklch, var(--color-amber-800) 40%, transparent);
}

.home-card__icon {
  width: 22px;
  height: 22px;
  color: var(--color-amber-600);
}

:is(.dark) .home-card__icon {
  color: var(--color-amber-400);
}

.home-card__title {
  font-size: 15px;
  line-height: 20px;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.home-card__desc {
  font-size: 13px;
  line-height: 19px;
}

.home-card__footer {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto;
}

.home-card__tag {
  font-size: 11px;
  line-height: 16px;
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in oklch, var(--color-stone-200) 80%, transparent);
  color: var(--color-stone-600);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.04em;
}

:is(.dark) .home-card__tag {
  background: color-mix(in oklch, var(--color-stone-700) 60%, transparent);
  color: var(--color-stone-400);
}

.home-card__arrow {
  width: 16px;
  height: 16px;
  flex: none;
  transition: color 140ms ease, transform 140ms ease;
}

.home-card:hover .home-card__arrow {
  transform: translate(2px, -2px);
}
</style>
