<script setup lang="ts">
import { Link, useRouter } from '@void/vue'
import { computed } from 'vue'

const router = useRouter()
const path = computed(() => router.path)

const links = [
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/articles', label: 'writing' },
]

function isActive(href: string) {
  return path.value === href || path.value.startsWith(`${href}/`)
}
</script>

<template>
  <header
    flex="~ items-center justify-between"
    px="6 md:12" py-6 text-stone-50
  >
    <Link href="/" class="font-serif text-lg op80 hover:op100 transition-opacity">
      Liang
    </Link>
    <nav flex items-center gap-4 text-xs font-mono>
      <Link
        v-for="link in links" :key="link.href" :href="link.href"
        class="op40 hover:op80 transition-opacity"
        :class="{ '!op95 underline underline-offset-4 decoration-op30': isActive(link.href) }"
      >
        {{ link.label }}
      </Link>
    </nav>
  </header>
</template>
