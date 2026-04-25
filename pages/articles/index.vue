<script setup lang="ts">
import { Link } from '@void/vue'
import { listArticles } from '~/articles'

const articles = listArticles()
</script>

<template>
  <section pt-8 pb-20>
    <h1 font-serif text-4xl md:text-5xl op95 mb-12 tracking-tight>
      Writing
    </h1>

    <ul flex flex-col>
      <li
        v-for="article in articles" :key="article.slug"
        border="b stone-50/5"
      >
        <Link
          :href="`/articles/${article.slug}/${article.defaultLang}`"
          class="flex items-baseline gap-4 py-4 group"
        >
          <span font-mono text-xs op40 w-12 shrink-0>
            {{ article.year ?? '—' }}
          </span>
          <span flex-1 font-serif text-lg op80 group-hover:op100 transition-opacity>
            {{ article.title }}
          </span>
          <span
            v-if="article.metadata"
            font-mono text-xs op30 hidden md:inline whitespace-nowrap
          >
            {{ article.metadata.genre }} · {{ article.metadata.topic }}
          </span>
        </Link>
      </li>
    </ul>
  </section>
</template>
