<script setup lang="ts">
import { Link } from '@void/vue'

const links = [
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/articles', label: 'writing' },
]
</script>

<template>
  <nav flex items-center gap-3 text-xs font-mono op40 hover:op80 duration-500>
    <template v-for="(link, i) in links" :key="link.href">
      <span v-if="i > 0" op40>·</span>
      <Link :href="link.href" class="hover:op100 transition-opacity">
        {{ link.label }}
      </Link>
    </template>
  </nav>
</template>
