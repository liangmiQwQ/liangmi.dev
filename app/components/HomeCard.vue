<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  description?: string
  icon?: string
  href?: string
  target?: '_blank' | '_self'
}>(), {
  description: undefined,
  icon: undefined,
  href: undefined,
  target: '_self',
})

const tag = computed(() => props.href ? 'a' : 'div')
</script>

<template>
  <component
    :is="tag"
    class="home-card group block rounded-3xl border border-zinc-200 p-5 text-inherit no-underline transition-colors hover:border-zinc-300 hover:bg-zinc-50/60 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/20"
    :href="props.href"
    :target="props.href ? props.target : undefined"
    :rel="props.href && props.target === '_blank' ? 'noreferrer' : undefined"
  >
    <div flex="~ col gap-3" min-h="0">
      <div flex="~ items-start justify-between gap-3" min-h="0">
        <div flex="~ items-center gap-2" min-h="0">
          <div v-if="props.icon" class="home-card__icon text-zinc-600 dark:text-zinc-300" :class="props.icon" />
          <div class="home-card__title text-zinc-900 dark:text-zinc-100">
            {{ props.title }}
          </div>
        </div>
        <div v-if="$slots.media" class="home-card__media">
          <slot name="media" />
        </div>
      </div>

      <div v-if="props.description" class="home-card__desc text-zinc-600 dark:text-zinc-400">
        {{ props.description }}
      </div>
    </div>
  </component>
</template>

<style scoped>
.home-card:focus-visible {
  outline: 2px solid rgba(113, 113, 122, 0.35);
  outline-offset: 2px;
}

.home-card__icon {
  width: 18px;
  height: 18px;
  flex: none;
}

.home-card__title {
  font-size: 15px;
  line-height: 19px;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.home-card__desc {
  font-size: 13px;
  line-height: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.home-card__media {
  flex: none;
}
</style>
