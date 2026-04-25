<script setup lang="ts">
import projects from '~/assets/me/projects.json'

interface Project {
  name: string
  description: string
  role: string
  repo: string
  homepage?: string
}

const list = projects as Project[]
</script>

<template>
  <section pt-8 pb-20>
    <h1 font-serif text-4xl md:text-5xl op95 mb-12 tracking-tight>
      Projects
    </h1>

    <ul flex flex-col gap-9>
      <li v-for="p in list" :key="p.name" group>
        <div flex items-baseline gap-3 mb-1>
          <h2 font-serif text-xl md:text-2xl op95 group-hover:op100 transition-opacity>
            {{ p.name }}
          </h2>
          <span font-mono text-xs op30 uppercase tracking="[0.12em]">
            {{ p.role }}
          </span>
        </div>
        <p op70 leading-relaxed mb-2>
          {{ p.description }}
        </p>
        <div flex items-center gap-3 text-sm>
          <a
            :href="p.repo" target="_blank" rel="noopener"
            flex items-center gap-1.5 op50 hover:op100 transition-opacity
          >
            <span i-ph-github-logo text-base />
            <span font-mono text-xs>repo</span>
          </a>
          <a
            v-if="p.homepage"
            :href="p.homepage" target="_blank" rel="noopener"
            flex items-center gap-1.5 op50 hover:op100 transition-opacity
          >
            <span i-ph-arrow-square-out text-base />
            <span font-mono text-xs>site</span>
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>
