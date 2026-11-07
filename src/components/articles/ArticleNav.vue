<script setup lang="ts">
import { onClickOutside, useEventListener, useLocalStorage } from '@vueuse/core'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'

import type { ArticleHeading } from '~/article-content.ts'
import ArticleActions from '~/components/articles/ArticleActions.vue'

const props = defineProps<{
  headings: ArticleHeading[]
  shareUrl: string
}>()

// Headings count as read once they pass this offset from the viewport top.
const ACTIVE_OFFSET = 96

// `open` is the mobile popup, `expanded` the desktop sidebar; read storage after hydration to match the server render.
const open = ref(false)
const expanded = useLocalStorage('article-toc-expanded', true, { initOnMounted: true })
// The sidebar's look follows `html.toc-collapsed`, which the head script sets before paint, so the static page never flashes expanded.
watch(expanded, value => document.documentElement.classList.toggle('toc-collapsed', !value))
const activeId = ref('')
const minDepth = computed(() => Math.min(...props.headings.map(heading => heading.depth)))
const toggle = useTemplateRef('toggle')
const panel = useTemplateRef('panel')

function updateActiveId() {
  const passed = props.headings.filter(heading => {
    const element = document.querySelector(`#${CSS.escape(heading.id)}`)
    return element && element.getBoundingClientRect().top <= ACTIVE_OFFSET
  })
  activeId.value = passed.at(-1)?.id ?? ''
}

onMounted(updateActiveId)
useEventListener('scroll', updateActiveId, { passive: true })
onClickOutside(panel, () => (open.value = false), { ignore: [toggle] })
</script>

<template>
  <!-- Below md: one popup with TOC and actions. From md: a TOC sidebar. From xl: an actions column too, mirroring the TOC 41rem from center. ProseLayout places the article. -->
  <div class="article-nav">
    <button
      ref="toggle"
      type="button"
      :aria-label="open ? 'Close menu' : 'Open menu'"
      :title="open ? 'Close menu' : 'Open menu'"
      :aria-expanded="open"
      fixed
      right-4
      bottom-4
      z-50
      h-10
      w-10
      flex="~ items-center justify-center"
      rounded-full
      border="~ current/10"
      bg="taupe-50/80 dark:taupe-950/80"
      text-lg
      cursor-pointer
      :class="open ? 'op100' : 'op60'"
      class="backdrop-blur transition-opacity hover:op100 md:hidden"
      @click="open = !open"
    >
      <span :class="open ? 'i-ph-x' : 'i-ph-list'" block aria-hidden="true" />
    </button>

    <nav
      ref="panel"
      aria-label="Table of contents"
      fixed
      z-50
      flex-col
      text-sm
      :class="open ? 'flex' : 'hidden md:flex'"
      class="bottom-16 right-4 max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] border border-current/10 rounded-lg bg-taupe-50 p-4 dark:bg-taupe-950 md:(bottom-auto right-auto top-16 left-[max(2rem,_50vw_-_41rem)] max-h-[calc(100vh-6rem)] w-[min(20rem,_max(14rem,_50vw_-_23rem))] border-0 rounded-none bg-transparent p-0) dark:md:bg-transparent"
    >
      <button
        type="button"
        :aria-label="expanded ? 'Hide table of contents' : 'Show table of contents'"
        :title="expanded ? 'Hide table of contents' : 'Show table of contents'"
        :aria-expanded="expanded"
        mb-4
        self-start
        text-2xl
        op70
        cursor-pointer
        class="hidden transition-opacity hover:op100 md:block"
        @click="expanded = !expanded"
      >
        <span class="i-ph-x block [.toc-collapsed_&]:hidden" aria-hidden="true" />
        <span class="i-ph-list hidden [.toc-collapsed_&]:block" aria-hidden="true" />
      </button>
      <ul
        list-none
        m-0
        p-0
        min-h-0
        overflow-y-auto
        flex="~ col gap-2"
        class="[scrollbar-width:none] [.toc-collapsed_&]:md:hidden"
      >
        <li
          v-for="heading in headings"
          :key="heading.id"
          :style="{ paddingLeft: `${(heading.depth - minDepth) * 1.25}rem` }"
          :class="heading.depth === minDepth && 'mt-1.5 first:mt-0'"
        >
          <a
            :href="`#${heading.id}`"
            leading-relaxed
            border-b
            :class="
              heading.id === activeId
                ? 'border-current/60 op100'
                : 'border-current/15 op60 transition-opacity hover:(op100 border-current/40)'
            "
            @click="open = false"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
      <div mt-4 pt-4 border="t current/10" class="md:hidden" @click="open = false">
        <ArticleActions :share-url />
      </div>
    </nav>

    <aside
      aria-label="Article actions"
      fixed
      bottom-16
      z-50
      w-36
      class="hidden right-[max(2rem,_50vw_-_41rem)] xl:block"
    >
      <ArticleActions :share-url />
    </aside>
  </div>
</template>
