<script setup lang="ts">
const nodes = [
  { year: '2020', title: 'First code', desc: 'Touched Python and got curious.' },
  { year: '2022', title: 'Web became real', desc: 'Built small web toys and learned modern frontend.' },
  { year: '2025', title: 'Turning point', desc: 'OSS contributions ramped up; mindset shifted.' },
]
</script>

<template>
  <div class="timeline-root">
    <main class="timeline">
      <header class="timeline__header">
        <NuxtLink to="/" class="timeline__back border border-zinc-200 dark:border-zinc-800">
          <span class="i-ph-arrow-left text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
          <span>Home</span>
        </NuxtLink>

        <h1 class="timeline__title">
          Timeline
        </h1>
        <p class="timeline__subtitle text-zinc-600 dark:text-zinc-400">
          A tree-ish view of how I grow up. This is a placeholder — the real interactive tree is coming later.
        </p>
      </header>

      <section class="tree" aria-label="Timeline placeholder">
        <div class="tree__line bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />

        <div class="tree__nodes">
          <article
            v-for="(n, i) in nodes"
            :key="n.year"
            class="tree__node"
            :class="i % 2 === 0 ? 'is-left' : 'is-right'"
          >
            <div class="tree__dot bg-zinc-900 dark:bg-zinc-100" aria-hidden="true" />
            <div class="tree__card border border-zinc-200 dark:border-zinc-800">
              <div class="tree__meta text-zinc-500 dark:text-zinc-400">
                <span class="tree__year text-zinc-900 dark:text-zinc-100">{{ n.year }}</span>
                <span class="tree__sep">·</span>
                <span class="tree__tag border border-zinc-200 dark:border-zinc-800">WIP</span>
              </div>
              <div class="tree__h text-zinc-900 dark:text-zinc-100">
                {{ n.title }}
              </div>
              <div class="tree__p text-zinc-600 dark:text-zinc-400">
                {{ n.desc }}
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer class="timeline__footer">
        <div class="timeline__note border border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          Work in progress. Next step: render real data and replace this with a scrollable tree structure.
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.timeline-root {
  min-height: 100dvh;
}

.timeline {
  width: min(920px, 100%);
  margin: 0 auto;
  padding: 26px 16px 46px;
}

.timeline__header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}

.timeline__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  width: fit-content;
  padding: 0 12px;
  border-radius: 999px;
  text-decoration: none;
  color: inherit;
  transition: transform 140ms ease;
}

.timeline__back:hover {
  transform: translateY(-1px);
}

.timeline__back > span:first-child {
  width: 16px;
  height: 16px;
}

.timeline__title {
  margin: 0;
  font-size: clamp(28px, 5vw, 40px);
  line-height: 1.08;
  letter-spacing: -0.04em;
}

.timeline__subtitle {
  margin: 0;
  max-width: 70ch;
  font-size: 14px;
  line-height: 20px;
}

.tree {
  position: relative;
  padding: 22px 0 16px;
}

.tree__line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-1px);
  background: linear-gradient(
    to bottom,
    transparent,
    color-mix(in oklab, var(--c-border) 90%, transparent) 10%,
    color-mix(in oklab, var(--c-border) 90%, transparent) 90%,
    transparent
  );
}

.tree__nodes {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tree__node {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 28px 1fr;
  align-items: center;
  min-height: 0;
}

.tree__dot {
  grid-column: 2;
  justify-self: center;
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.tree__card {
  border-radius: 16px;
  padding: 14px 14px;
  max-width: 380px;
}

.is-left .tree__card {
  grid-column: 1;
  justify-self: end;
}

.is-right .tree__card {
  grid-column: 3;
  justify-self: start;
}

.tree__meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  line-height: 16px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.tree__year {
}

.tree__tag {
  padding: 2px 8px;
  border-radius: 999px;
}

.tree__h {
  margin-top: 8px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.tree__p {
  margin-top: 6px;
  font-size: 13px;
  line-height: 18px;
}

.timeline__footer {
  margin-top: 18px;
}

.timeline__note {
  border-radius: 16px;
  padding: 14px 14px;
  font-size: 13px;
  line-height: 18px;
}

@media (max-width: 720px) {
  .tree__line {
    left: 14px;
    transform: none;
  }

  .tree__node {
    grid-template-columns: 28px 1fr;
    gap: 12px;
  }

  .tree__dot {
    grid-column: 1;
    justify-self: start;
  }

  .tree__card {
    grid-column: 2;
    justify-self: stretch;
    max-width: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline__back {
    transition: none !important;
  }
  .timeline__back:hover {
    transform: none !important;
  }
}
</style>
