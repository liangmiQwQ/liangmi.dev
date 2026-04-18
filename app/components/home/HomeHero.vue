<script setup lang="ts">
import type { IInfo } from '~/types'

const props = defineProps<{
  info: IInfo
  avatarUrl: string
}>()

const { data: articleCount } = await useAsyncData('home:article-count', () => queryCollection('articles').count('*'))

function formatStat(n: number | null | undefined): string {
  return typeof n === 'number' && Number.isFinite(n) ? String(n) : '—'
}

const formattedArticleCount = computed(() => formatStat(articleCount.value))
const formattedPrCount = '—'
</script>

<template>
  <section
    id="hero"
    class="relative min-h-[100dvh] flex items-center snap-start snap-always"
    data-snap
  >
    <div
      absolute
      bottom-10 left-0 right-0
      mx-auto
      animate-bounce
      flex="~ items-center gap-2"
      class="w-fit font-mono text-12px tracking-[0.14em] text-stone-400 dark:text-stone-500 uppercase" aria-hidden="true"
    >
      <span class="i-ph-arrow-down h-4 w-4" />
      <span>Scroll</span>
    </div>

    <div class="relative mx-auto w-full max-w-[1280px] px-6 py-10 md:px-20 md:py-16">
      <div class="grid gap-10 md:grid-cols-12 md:items-center">
        <div class="md:col-span-7">
          <div class="grid gap-6">
            <div flex="~ items-center gap-4" min-h="0">
              <div class="h-[88px] w-[88px] overflow-hidden rounded-[28px] border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
                <img :src="props.avatarUrl" :alt="`${props.info.name} avatar`" class="h-full w-full object-cover">
              </div>

              <div flex="~ col gap-2" min-h="0">
                <div class="font-mono text-12px tracking-[0.16em] text-stone-500 dark:text-stone-400 uppercase">
                  Open Source Developer · Student
                </div>
                <h1
                  font-italic
                  class="m-0 font-serif text-[clamp(40px,7vw,74px)] leading-[0.95] -tracking-[0.06em]"
                >
                  {{ props.info.name }}
                </h1>
              </div>
            </div>

            <div class="max-w-[64ch]">
              <div class="inline-flex items-center gap-2 font-mono text-12px tracking-[0.14em] opacity-65 uppercase">
                <span class="i-ph-seal-check h-4 w-4" aria-hidden="true" />
                <span>An opensource developer coding with love</span>
              </div>
              <p class="mt-3 mb-0 text-[clamp(15px,1.6vw,18px)] leading-[1.7] text-stone-700 dark:text-stone-300">
                {{ props.info.bio }}
              </p>
            </div>
          </div>

          <div class="mt-7">
            <ContactLinks :info="props.info" />
          </div>
        </div>

        <div class="md:col-span-5">
          <div class="grid gap-3">
            <div class="rounded-2xl border border-stone-200 p-5 dark:border-stone-800">
              <div flex="~ items-center justify-between gap-3" min-h="0">
                <div class="font-mono text-12px tracking-[0.14em] text-stone-500 dark:text-stone-400 uppercase">
                  Ledger
                </div>
                <div class="inline-flex items-center gap-2 rounded-full border border-stone-200 px-3 py-1.5 text-12px text-stone-600 dark:border-stone-800 dark:text-stone-400">
                  <span class="i-ph-book-open-text h-4 w-4" aria-hidden="true" />
                  <span>SSG</span>
                </div>
              </div>

              <div class="mt-5 grid grid-cols-2 gap-4">
                <div class="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900/50">
                  <div class="font-serif text-[clamp(28px,4.6vw,44px)] leading-[1] -tracking-[0.05em] opacity-60">
                    {{ formattedArticleCount }}
                  </div>
                  <div class="mt-2 font-mono text-12px tracking-[0.14em] text-stone-500 dark:text-stone-400 uppercase">
                    Articles
                  </div>
                </div>

                <div class="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900/50">
                  <div class="font-serif text-[clamp(28px,4.6vw,44px)] leading-[1] -tracking-[0.05em] text-stone-400 dark:text-stone-600" title="PR stats will be wired later.">
                    {{ formattedPrCount }}
                  </div>
                  <div class="mt-2 font-mono text-12px tracking-[0.14em] text-stone-500 dark:text-stone-400 uppercase">
                    PRs (WIP)
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border border-stone-200 p-5 dark:border-stone-800">
              <div flex="~ items-center justify-between gap-3" min-h="0">
                <div flex="~ items-center gap-2" min-h="0">
                  <span class="i-ph-tree-structure h-4 w-4 text-stone-500 dark:text-stone-400" aria-hidden="true" />
                  <div class="font-mono text-12px tracking-[0.14em] text-stone-500 dark:text-stone-400 uppercase">
                    Timeline thumbnail
                  </div>
                </div>
                <NuxtLink
                  to="/timeline"
                  class="inline-flex items-center gap-2 rounded-full border border-stone-200 px-3 py-1.5 text-12px text-stone-700 no-underline transition-all hover:border-amber-200 hover:text-amber-700 dark:border-stone-800 dark:text-stone-300 dark:hover:border-amber-900/60 dark:hover:text-amber-400"
                >
                  <span class="i-ph-arrow-right h-4 w-4" aria-hidden="true" />
                  <span>WIP</span>
                </NuxtLink>
              </div>

              <div class="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-stone-100/60 p-4 dark:border-stone-800 dark:bg-stone-900/40">
                <div class="grid grid-cols-12 gap-3">
                  <div class="col-span-3">
                    <div class="h-3 w-12 rounded bg-stone-300/70 dark:bg-stone-700/70" />
                    <div class="mt-3 h-3 w-10 rounded bg-stone-300/50 dark:bg-stone-700/50" />
                    <div class="mt-3 h-3 w-14 rounded bg-stone-300/50 dark:bg-stone-700/50" />
                  </div>
                  <div class="col-span-9">
                    <div class="relative h-24">
                      <div class="absolute left-3 top-0 bottom-0 w-px bg-stone-300 dark:bg-stone-700" />
                      <div class="absolute left-[9px] top-3 h-2.5 w-2.5 rounded-full border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/60" />
                      <div class="absolute left-[9px] top-11 h-2.5 w-2.5 rounded-full border border-stone-300 bg-stone-100 dark:border-stone-700 dark:bg-stone-900" />
                      <div class="absolute left-[9px] top-19 h-2.5 w-2.5 rounded-full border border-stone-300 bg-stone-100 dark:border-stone-700 dark:bg-stone-900" />

                      <div class="absolute left-7 top-2 h-3 w-32 rounded bg-amber-200/60 dark:bg-amber-800/40" />
                      <div class="absolute left-7 top-10 h-3 w-28 rounded bg-stone-300/50 dark:bg-stone-700/50" />
                      <div class="absolute left-7 top-18 h-3 w-40 rounded bg-stone-300/50 dark:bg-stone-700/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
