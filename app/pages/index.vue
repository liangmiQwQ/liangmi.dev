<script lang="ts" setup>
const projects = [
  {
    num: '01',
    lang: 'TypeScript',
    name: 'vite devtools',
    desc: 'DevTools for Vite (Rolldown). Inspect module graph, hot-reload events, and build steps from the browser.',
    stars: '1.1k',
    forks: '77',
    url: 'https://github.com/vitejs/devtools',
  },
  {
    num: '02',
    lang: 'Rust',
    name: 'oxc',
    desc: 'A collection of high-performance JavaScript tools. Contributing to parsers and linter pieces in Rust.',
    stars: '20.8k',
    forks: '984',
    url: 'https://github.com/oxc-project/oxc',
  },
  {
    num: '03',
    lang: 'Rust',
    name: 'vue-oxc-toolkit',
    desc: 'Parse Vue SFCs into Oxc AST for linting. A small bridge between two worlds I love working in.',
    stars: '27',
    forks: '1',
    url: 'https://github.com/liangmiQwQ/vue-oxc-toolkit',
  },
  {
    num: '04',
    lang: 'TypeScript',
    name: 'mo',
    desc: 'A project manager for open-source developers using GitHub. Built out of the things I wished existed.',
    stars: '—',
    forks: '—',
    url: 'https://github.com/liangmiQwQ/mo',
  },
  {
    num: '05',
    lang: 'TypeScript',
    name: 'simple-introduce',
    desc: 'Create a GitHub profile image with animations. The header SVG on my profile comes from this.',
    stars: '2',
    forks: '—',
    url: 'https://github.com/liangmiQwQ/simple-introduce',
  },
  {
    num: '06',
    lang: 'TypeScript',
    name: 'vue-note',
    desc: 'Write Vue template inside code comments. A small, weird experiment I keep coming back to.',
    stars: '1',
    forks: '—',
    url: 'https://github.com/liangmiQwQ/vue-note',
  },
]
</script>

<template>
  <main w-full min-h-screen>
    <Hero />

    <div class="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50">
      <div class="max-w-[1180px] mx-auto px-6 md:px-12 pt-28 pb-20">
        <!-- a note -->
        <section class="mb-24">
          <div class="section-label">
            a note
          </div>
          <p class="intro">
            I'm a <span font-serif font-italic text-amber>student</span> and <span font-serif font-italic text-amber>open-source developer</span> from Hangzhou. I work on tools I find beautiful —
            parsers, dev tooling, little experiments — and I write down what I can't say out loud.
          </p>
          <p class="intro">
            Lately I've been a little confused, but still moving forward.
          </p>
          <span class="mono-note">// a bird that yearns for freedom can never be caged.</span>
        </section>

        <!-- things I'm building -->
        <section class="mb-24">
          <div class="section-label">
            Things I'm building / take part in
          </div>
          <div class="projects-grid">
            <a
              v-for="proj in projects"
              :key="proj.num"
              :href="proj.url"
              target="_blank"
              rel="noopener noreferrer"
              class="proj"
            >
              <div class="proj-top">
                <span class="proj-num">{{ proj.num }}</span>
                <span class="proj-lang">{{ proj.lang }}</span>
              </div>
              <h3 class="proj-name">{{ proj.name }}</h3>
              <p class="proj-desc">{{ proj.desc }}</p>
              <div class="proj-meta">
                <span>{{ proj.stars }}</span>
                <span class="forks">{{ proj.forks }}</span>
              </div>
            </a>
          </div>
        </section>

        <!-- three windows -->
        <section>
          <div class="section-label">
            three windows into me
          </div>
          <div class="now-grid">
            <div class="now-card">
              <div class="now-chip">
                <span class="now-dot" style="background:#dfe2ff;box-shadow:0 0 8px #dfe2ff" />
                developer
              </div>
              <h4 class="now-heading">
                Patient with the details.
              </h4>
              <p class="now-body">
                Parsers, compilers, linters. I like infra, cutting edge things, who give me a strong feeling of satisfaction.
              </p>
            </div>
            <div class="now-card">
              <div class="now-chip">
                <span class="now-dot" style="background:#e0f0d8;box-shadow:0 0 8px #e0f0d8" />
                student
              </div>
              <h4 class="now-heading">
                Still learning how to learn.
              </h4>
              <p class="now-body">
                In China, as a public school's student. I try balancing exams, side projects. Then figuring out what I actually want.
              </p>
            </div>
            <div class="now-card">
              <div class="now-chip">
                <span class="now-dot" style="background:#ffd8d2;box-shadow:0 0 8px #ffd8d2" />
                person
              </div>
              <h4 class="now-heading">
                Off the clock, too.
              </h4>
              <p class="now-body">
                YouTube late at night, Minecraft on weekends, write down thoughts when I can't sleep, or just daze. Being a person, first.
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer class="site-footer">
        <span>© Liang Mi 2026 · Hangzhou</span>
        <div class="footer-links">
          <a href="https://github.com/liangmiQwQ" target="_blank" rel="noopener">github</a>
          <span>·</span>
          <a href="https://x.com/liangmiQwQ" target="_blank" rel="noopener">x</a>
          <span>·</span>
          <a href="/bilibili">bilibili</a>
        </div>
      </footer>
    </div>
  </main>
</template>

<style scoped>
/* Section label: mono uppercase with leading line */
.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--label-color);
  margin-bottom: 28px;
}
.section-label::before {
  content: '';
  width: 28px;
  height: 1px;
  background: currentColor;
  opacity: 0.5;
}

html:not(.dark) .section-label { --label-color: #6a6a70; }
html.dark .section-label { --label-color: #6a6a70; }

/* Intro paragraph */
.intro {
  font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;
  font-weight: 500;
  font-size: clamp(22px, 2.8vw, 34px);
  line-height: 1.35;
  letter-spacing: -0.015em;
  max-width: 820px;
  margin-bottom: 0;
  text-wrap: pretty;
}
.intro em {
  font-style: normal;
  background: linear-gradient(to bottom, transparent 62%, rgba(120,120,130,0.5) 62%, rgba(120,120,130,0.5) 65%, transparent 65%);
}
.mono-note {
  display: block;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 400;
  font-size: 13px;
  color: #6a6a70;
  margin-top: 20px;
  letter-spacing: 0.02em;
}

/* Projects grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
}
.proj {
  padding: 28px 24px 24px;
  display: flex;
  flex-direction: column;
  min-height: 190px;
  transition: background 250ms;
  border: 1px solid rgba(120, 120, 130, 0.15);
  margin: -1px 0 0 -1px;
  text-decoration: none;
  color: inherit;
}
.proj:hover {
  background: rgba(120, 120, 130, 0.06);
}
.proj-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
.proj-num, .proj-lang {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px;
  color: #6a6a70;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.proj-name {
  font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin: 0 0 10px;
  letter-spacing: -0.01em;
}
.proj-desc {
  font-size: 13.5px;
  color: #6a6a70;
  margin: 0 0 auto;
  line-height: 1.5;
}
html.dark .proj-desc { color: #a8a8ad; }
.proj-meta {
  display: flex;
  gap: 14px;
  margin-top: 20px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px;
  color: #6a6a70;
}
.proj-meta span::before { content: '★ '; opacity: 0.6; }
.proj-meta span.forks::before { content: '⑂ '; }

/* Now grid */
.now-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid rgba(120, 120, 130, 0.18);
  margin-top: 12px;
}
.now-card {
  padding: 36px 28px;
  border-right: 1px solid rgba(120, 120, 130, 0.18);
}
.now-card:last-child { border-right: none; }
.now-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6a6a70;
  margin-bottom: 20px;
}
.now-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.now-heading {
  font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin: 0 0 10px;
  letter-spacing: -0.01em;
}
.now-body {
  font-size: 13.5px;
  color: #6a6a70;
  margin: 0;
  line-height: 1.55;
}
html.dark .now-body { color: #a8a8ad; }

/* Footer */
.site-footer {
  margin-top: 80px;
  padding: 32px 48px;
  border-top: 1px solid rgba(120, 120, 130, 0.18);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 12px;
  color: #6a6a70;
}
.footer-links { display: flex; gap: 10px; }
.footer-links a:hover { color: inherit; opacity: 1; }

@media (max-width: 720px) {
  .now-grid { grid-template-columns: 1fr; }
  .now-card { border-right: none; border-bottom: 1px solid rgba(120, 120, 130, 0.18); }
  .now-card:last-child { border-bottom: none; }
  .site-footer { padding: 28px 24px; flex-direction: column; gap: 12px; text-align: center; }
}
</style>
