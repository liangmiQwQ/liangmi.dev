<script setup lang="ts">
interface TocItem {
  id: string
  depth: number
  text: string
}

const props = defineProps<{
  toc: TocItem[]
}>()

const activeId = ref('')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-20% 0% -80% 0%',
      threshold: 0,
    },
  )

  // Observe all heading elements
  nextTick(() => {
    props.toc.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const isMobileOpen = ref(false)
</script>

<template>
  <div>
    <!-- Desktop TOC -->
    <nav
      hidden lg:block
      sticky top-24
      overflow-y-auto
      style="max-height: calc(100vh - 8rem);"
    >
      <h3 text-sm font-semibold uppercase tracking-wider mb-4 class="primary-light/50 dark:primary-dark/50">
        <div inline-flex items-center gap-2>
          <div i-ph-list-dashes-duotone />
          Contents
        </div>
      </h3>

      <ul space-y-2 text-sm>
        <li
          v-for="item in toc"
          :key="item.id"
          :style="{ paddingLeft: `${(item.depth - 1) * 0.75}rem` }"
        >
          <UiButton
            class="text-left w-full py-1 transition-colors duration-200"
            :class="activeId === item.id
              ? 'primary-light dark:primary-dark font-medium'
              : 'primary-light/50 dark:primary-dark/50 hover:primary-light/70 hover:dark:primary-dark/70'"
            @click="scrollToSection(item.id)"
          >
            {{ item.text }}
          </UiButton>
        </li>
      </ul>
    </nav>

    <!-- Mobile TOC Button -->
    <div lg:hidden fixed left-4 bottom-4 z-50>
      <UiButton
        class="p-3 rounded-full shadow-lg text-white dark:text-black bg-primary-light dark:bg-primary-dark"

        @click="isMobileOpen = true"
      >
        <div i-ph-list-dashes-duotone text-xl />
      </UiButton>
    </div>

    <!-- Mobile TOC Drawer -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileOpen"
        lg:hidden
        fixed inset-0 z-50
        class="bg-black/50 backdrop-blur-sm"
        @click="isMobileOpen = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isMobileOpen"
        lg:hidden
        fixed right-0 top-0 bottom-0 z-50
        w-72
        p-6
        class="bg-background-light dark:bg-background-dark"
        shadow-2xl
        overflow-y-auto
      >
        <div flex items-center justify-between mb-6>
          <h3 text-lg font-semibold>
            Contents
          </h3>
          <UiButton
            p-2 rounded-lg
            class="hover:bg-primary-light/10 dark:hover:bg-primary-dark/10"
            @click="isMobileOpen = false"
          >
            <div i-ph-x-duotone text-xl />
          </UiButton>
        </div>

        <ul space-y-3>
          <li
            v-for="item in toc"
            :key="item.id"
            :style="{ paddingLeft: `${(item.depth - 1) * 0.75}rem` }"
          >
            <UiButton
              class="text-left w-full py-1.5 transition-colors"
              :class="activeId === item.id
                ? 'primary-light dark:primary-dark font-medium'
                : 'primary-light/60 dark:primary-dark/60'"
              @click="scrollToSection(item.id); isMobileOpen = false"
            >
              {{ item.text }}
            </UiButton>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
