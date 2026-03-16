<script setup lang="ts">
import type { IInfo } from '~/types'

const props = defineProps<{
  info: IInfo
  avatarUrl: string
}>()

const { data: articleCount } = await useAsyncData('home:article-count', () => queryCollection('articles').count('*'))

const prCount = shallowRef<number | null>(null)

const formattedArticleCount = computed(() => {
  const n = articleCount.value
  if (typeof n !== 'number' || !Number.isFinite(n))
    return '—'
  return String(n)
})

const formattedPrCount = computed(() => {
  const n = prCount.value
  if (typeof n !== 'number' || !Number.isFinite(n))
    return '—'
  return String(n)
})
</script>

<template>
  <section
    id="hero"
    class="relative min-h-[100dvh] flex items-center"
    data-snap
    style="scroll-snap-align: start; scroll-snap-stop: always;"
  >
    <div
      absolute
      bottom-10 left-0 right-0
      mx-auto
      animate-bounce
      flex="~ items-center gap-2"
      class="w-fit font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase" aria-hidden="true"
    >
      <span class="i-ph-arrow-down h-4 w-4" />
      <span>Scroll</span>
    </div>

    <div class="relative mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16">
      <div class="grid gap-10 md:grid-cols-12 md:items-center">
        <div class="md:col-span-7">
          <div class="grid gap-6">
            <div flex="~ items-center gap-4" min-h="0">
              <div class="h-[88px] w-[88px] overflow-hidden rounded-[28px] border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                <img :src="props.avatarUrl" :alt="`${props.info.name} avatar`" class="h-full w-full object-cover">
              </div>

              <div flex="~ col gap-2" min-h="0">
                <div class="font-mono text-12px tracking-[0.16em] text-zinc-500 dark:text-zinc-400 uppercase">
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
              <div class="inline-flex items-center gap-2 font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase">
                <span class="i-ph-seal-check h-4 w-4" aria-hidden="true" />
                <span>An opensource developer coding with love</span>
              </div>
              <p class="mt-3 mb-0 text-[clamp(15px,1.6vw,18px)] leading-[1.7] text-zinc-700 dark:text-zinc-300">
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
            <div class="rounded-3xl border border-zinc-200 p-5 dark:border-zinc-800">
              <div flex="~ items-center justify-between gap-3" min-h="0">
                <div class="font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase">
                  Ledger
                </div>
                <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-12px text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                  <span class="i-ph-book-open-text h-4 w-4" aria-hidden="true" />
                  <span>SSG</span>
                </div>
              </div>

              <div class="mt-5 grid grid-cols-2 gap-4">
                <div class="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                  <div class="font-serif text-[clamp(28px,4.6vw,44px)] leading-[1] -tracking-[0.05em] text-zinc-950 dark:text-zinc-50">
                    {{ formattedArticleCount }}
                  </div>
                  <div class="mt-2 font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase">
                    Articles
                  </div>
                </div>

                <div class="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                  <div class="font-serif text-[clamp(28px,4.6vw,44px)] leading-[1] -tracking-[0.05em] text-zinc-950 dark:text-zinc-50" title="PR stats will be wired later.">
                    {{ formattedPrCount }}
                  </div>
                  <div class="mt-2 font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase">
                    PRs (WIP)
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-3xl border border-zinc-200 p-5 dark:border-zinc-800">
              <div flex="~ items-center justify-between gap-3" min-h="0">
                <div flex="~ items-center gap-2" min-h="0">
                  <span class="i-ph-tree-structure h-4 w-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                  <div class="font-mono text-12px tracking-[0.14em] text-zinc-500 dark:text-zinc-400 uppercase">
                    Timeline thumbnail
                  </div>
                </div>
                <NuxtLink
                  to="/timeline"
                  class="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-12px text-zinc-700 no-underline hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-700"
                >
                  <span class="i-ph-arrow-right h-4 w-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                  <span>WIP</span>
                </NuxtLink>
              </div>

              <div class="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div class="grid grid-cols-12 gap-3">
                  <div class="col-span-3">
                    <div class="h-3 w-12 rounded bg-zinc-200/80 dark:bg-zinc-800/80" />
                    <div class="mt-3 h-3 w-10 rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
                    <div class="mt-3 h-3 w-14 rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
                  </div>
                  <div class="col-span-9">
                    <div class="relative h-24">
                      <div class="absolute left-3 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
                      <div class="absolute left-[9px] top-3 h-2.5 w-2.5 rounded-full border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950" />
                      <div class="absolute left-[9px] top-11 h-2.5 w-2.5 rounded-full border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950" />
                      <div class="absolute left-[9px] top-19 h-2.5 w-2.5 rounded-full border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950" />

                      <div class="absolute left-7 top-2 h-3 w-32 rounded bg-zinc-200/70 dark:bg-zinc-800/70" />
                      <div class="absolute left-7 top-10 h-3 w-28 rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
                      <div class="absolute left-7 top-18 h-3 w-40 rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
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
