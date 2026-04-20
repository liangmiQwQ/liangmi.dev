<script setup lang="ts">
const props = defineProps<{
  num: string
  repo: string
}>()

interface GithubRepo {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
}

function formatCount(n: number): string {
  if (n >= 1000)
    return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

const { data: repoData } = await useAsyncData(`repo-${props.repo}`, async () => {
  try {
    return await $fetch<GithubRepo>(`https://api.github.com/repos/${props.repo}`)
  }
  catch {
    return null
  }
})

const name = computed(() => repoData.value?.name ?? props.repo.split('/').pop() ?? props.repo)
const desc = computed(() => repoData.value?.description ?? '')
const lang = computed(() => repoData.value?.language ?? '')
const url = computed(() => repoData.value?.html_url ?? `https://github.com/${props.repo}`)
const stars = computed(() => repoData.value ? formatCount(repoData.value.stargazers_count) : '—')
const forks = computed(() => repoData.value ? formatCount(repoData.value.forks_count) : '—')
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    flex="~ col"
    py-7 px-6 min-h="[200px]"
    bg="taupe-50 dark:taupe-950 hover:taupe-100 dark:hover:taupe-900"
    no-underline transition-colors duration-200
    text-inherit group
  >
    <div flex justify-between items-baseline mb-4>
      <span font-label text="[10.5px] taupe-400" uppercase tracking="[0.08em]">{{ num }}</span>
      <span font-label text="[10.5px] taupe-400" uppercase tracking="[0.08em]" op60>{{ lang }}</span>
    </div>
    <h3 font-display font-bold text-lg m-0 mb-2 tracking="[-0.01em]" flex items-center gap-2>
      {{ name }}
      <span
        i-ph-arrow-up-right
        text="[12px] taupe-400 dark:taupe-600"
        op0 group-hover:op100 transition-opacity duration-200
        translate-y-px
      />
    </h3>
    <p text="[13px] taupe-500 dark:taupe-400" m-0 mb-auto leading-relaxed>
      {{ desc }}
    </p>
    <div flex items-center gap-4 mt-5 font-label text="[11px] taupe-400" op70>
      <span flex items-center gap-1.5>
        <span i-ph-star />
        {{ stars }}
      </span>
      <span flex items-center gap-1.5>
        <span i-ph-git-fork />
        {{ forks }}
      </span>
    </div>
  </a>
</template>
