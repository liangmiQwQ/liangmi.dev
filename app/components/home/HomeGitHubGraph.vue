<script setup lang="ts">
interface ContribDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

const props = defineProps<{ username: string }>()

const { data, error } = await useFetch<{
  total: Record<string, number>
  contributions: ContribDay[]
}>(`https://github-contributions-api.jogruber.de/v4/${props.username}?y=last`, {
  key: `github-contrib-${props.username}`,
  server: true,
})

// Group flat day list into calendar weeks (Sun→Sat)
const weeks = computed(() => {
  const days = data.value?.contributions ?? []
  if (!days.length)
    return []

  const grouped: ContribDay[][] = []
  let current: ContribDay[] = []

  for (const day of days) {
    current.push(day)
    // getDay(): 0 = Sunday, 6 = Saturday
    const dow = new Date(`${day.date}T12:00:00Z`).getDay()
    if (dow === 6) {
      grouped.push(current)
      current = []
    }
  }
  if (current.length)
    grouped.push(current)

  // Show last 26 weeks so it fits in the card
  return grouped.slice(-26)
})

const totalThisYear = computed(() => {
  const year = new Date().getFullYear().toString()
  return data.value?.total?.[year] ?? null
})

function levelBg(level: number): string {
  switch (level) {
    case 1: return 'bg-amber-100 dark:bg-amber-900/80'
    case 2: return 'bg-amber-200 dark:bg-amber-700/70'
    case 3: return 'bg-amber-400 dark:bg-amber-500/80'
    case 4: return 'bg-amber-600 dark:bg-amber-400'
    default: return 'bg-stone-200 dark:bg-stone-800'
  }
}
</script>

<template>
  <div v-if="!error && weeks.length" class="graph-root">
    <div class="graph-grid">
      <div v-for="(week, wi) in weeks" :key="wi" class="graph-col">
        <div
          v-for="day in week"
          :key="day.date"
          class="graph-cell rounded-[3px]"
          :class="levelBg(day.level)"
          :title="`${day.date} · ${day.count} contribution${day.count !== 1 ? 's' : ''}`"
        />
      </div>
    </div>
    <div v-if="totalThisYear !== null" class="graph-footer font-mono text-stone-400 dark:text-stone-500">
      {{ totalThisYear.toLocaleString() }} contributions this year
    </div>
  </div>

  <div v-else-if="error" class="graph-fallback font-mono text-stone-400 dark:text-stone-600">
    Graph unavailable
  </div>
</template>

<style scoped>
.graph-root {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.graph-grid {
  display: flex;
  gap: 3px;
  overflow: hidden;
}

.graph-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.graph-cell {
  width: 10px;
  height: 10px;
  flex: none;
  transition: opacity 120ms ease;
}

.graph-cell:hover {
  opacity: 0.75;
}

.graph-footer {
  font-size: 11px;
  line-height: 16px;
}

.graph-fallback {
  font-size: 11px;
  line-height: 16px;
}
</style>
