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
    <!-- Scroll indicator -->
    <div
      absolute
      bottom-10 left-0 right-0
      mx-auto
      animate-bounce
      flex="~ items-center gap-2"
      class="w-fit font-mono text-12px tracking-[0.14em] text-stone-400 dark:text-stone-600 uppercase"
      aria-hidden="true"
    >
      <span class="i-ph-arrow-down h-4 w-4" />
      <span>Scroll</span>
    </div>

    <div class="relative mx-auto w-full max-w-[1280px] px-6 py-12 md:px-20 md:py-16">
      <div class="flex flex-col gap-10 md:gap-12">
        <!-- Row 1: Identity — name is the sole focus -->
        <div flex="~ items-center gap-5 md:gap-6" min-h="0">
          <div class="h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[24px] border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
            <img
              :src="props.avatarUrl"
              :alt="`${props.info.name} avatar`"
              class="h-full w-full object-cover"
            >
          </div>

          <div flex="~ col gap-1" min-h="0">
            <div class="font-mono text-[11px] tracking-[0.18em] text-stone-400 dark:text-stone-600 uppercase">
              Open Source Developer · Student
            </div>
            <h1
              font-italic
              class="m-0 font-serif text-[clamp(38px,6.5vw,72px)] leading-[0.95] -tracking-[0.05em] text-stone-900 dark:text-stone-50"
            >
              {{ props.info.name }}
            </h1>
          </div>
        </div>

        <!-- Row 2: Bio (left) + Stats (right) -->
        <div class="grid gap-8 md:grid-cols-12 md:items-start">
          <!-- Left: badge · bio · contact -->
          <div class="md:col-span-7 flex flex-col gap-6">
            <div>
              <div class="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-stone-500 dark:text-stone-500 uppercase">
                <span class="i-ph-seal-check h-3.5 w-3.5" aria-hidden="true" />
                <span>An opensource developer coding with love</span>
              </div>
              <p class="mt-3 mb-0 text-[clamp(16px,1.8vw,20px)] leading-[1.65] text-stone-700 dark:text-stone-300 font-light">
                {{ props.info.bio }}
              </p>
            </div>

            <ContactLinks :info="props.info" />
          </div>

          <!-- Right: stats + contribution graph -->
          <div class="md:col-span-5 flex flex-col gap-3">
            <!-- Ledger -->
            <div class="rounded-2xl border border-stone-200 p-4 dark:border-stone-800">
              <div flex="~ items-center justify-between gap-3" min-h="0">
                <div class="font-mono text-[11px] tracking-[0.14em] text-stone-400 dark:text-stone-500 uppercase">
                  Ledger
                </div>
                <div class="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-2.5 py-1 text-[11px] text-stone-500 dark:border-stone-800 dark:text-stone-500">
                  <span class="i-ph-book-open-text h-3.5 w-3.5" aria-hidden="true" />
                  <span>SSG</span>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-3">
                <div class="rounded-xl border border-stone-100 bg-stone-50/60 p-3 dark:border-stone-800/60 dark:bg-stone-900/40">
                  <div class="font-serif text-[clamp(26px,4vw,40px)] leading-[1] -tracking-[0.05em] text-amber-600 dark:text-amber-400">
                    {{ formattedArticleCount }}
                  </div>
                  <div class="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-stone-400 dark:text-stone-500 uppercase">
                    Articles
                  </div>
                </div>

                <div class="rounded-xl border border-stone-100 bg-stone-50/60 p-3 dark:border-stone-800/60 dark:bg-stone-900/40">
                  <div
                    class="font-serif text-[clamp(26px,4vw,40px)] leading-[1] -tracking-[0.05em] text-stone-300 dark:text-stone-700"
                    title="PR stats will be wired later."
                  >
                    {{ formattedPrCount }}
                  </div>
                  <div class="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-stone-400 dark:text-stone-500 uppercase">
                    PRs (WIP)
                  </div>
                </div>
              </div>
            </div>

            <!-- GitHub contribution graph -->
            <div v-if="props.info.contact.github" class="rounded-2xl border border-stone-200 p-4 dark:border-stone-800">
              <div flex="~ items-center justify-between gap-3 mb-4" min-h="0">
                <div flex="~ items-center gap-1.5" min-h="0">
                  <span class="i-ph-github-logo h-3.5 w-3.5 text-stone-400 dark:text-stone-500" aria-hidden="true" />
                  <div class="font-mono text-[11px] tracking-[0.14em] text-stone-400 dark:text-stone-500 uppercase">
                    Contributions
                  </div>
                </div>
                <a
                  :href="`https://github.com/${props.info.contact.github}`"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-2.5 py-1 text-[11px] text-stone-500 no-underline transition-all hover:border-amber-200 hover:text-amber-600 dark:border-stone-800 dark:text-stone-500 dark:hover:border-amber-900/60 dark:hover:text-amber-400"
                >
                  <span class="i-ph-arrow-up-right h-3 w-3" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              </div>

              <HomeGitHubGraph :username="props.info.contact.github" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
