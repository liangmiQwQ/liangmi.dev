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

const windows = [
  {
    role: 'developer',
    heading: 'Patient with the details.',
    body: 'Parsers, compilers, linters. I like infra, cutting edge things, who give me a strong feeling of satisfaction.',
    dotColor: '#dfe2ff',
  },
  {
    role: 'student',
    heading: 'Still learning how to learn.',
    body: 'In China, as a public school\'s student. I try balancing exams, side projects. Then figuring out what I actually want.',
    dotColor: '#e0f0d8',
  },
  {
    role: 'person',
    heading: 'Off the clock, too.',
    body: 'YouTube late at night, Minecraft on weekends, write down thoughts when I can\'t sleep, or just daze. Being a person, first.',
    dotColor: '#ffd8d2',
  },
]
</script>

<template>
  <main w-full min-h-screen>
    <Hero />

    <div bg="stone-50 dark:stone-950" text="stone-950 dark:stone-50">
      <div max-w="[1180px]" mx-auto px="6 md:12" pt-28 pb-20>
        <!-- a note -->
        <section mb-24>
          <div
            flex items-center gap-3 mb-8
            font-label text="[10.5px] stone-500" tracking="[0.16em]" uppercase
          >
            <span flex-shrink-0 w-7 h-px bg-current op50 />
            a note
          </div>
          <p
            font-display font-medium leading-snug tracking-tight max-w="[820px]" mb-4
            class="text-[clamp(22px,2.8vw,34px)]"
          >
            I'm a <span font-serif italic text-amber-500>student</span> and <span font-serif italic text-amber-500>open-source developer</span>
            from Hangzhou. I work on tools I find beautiful —
            parsers, dev tooling, little experiments — and I write down what I can't say out loud.
          </p>
          <p
            font-display font-medium leading-snug tracking-tight max-w="[820px]" mb-0
            class="text-[clamp(22px,2.8vw,34px)]"
          >
            Lately I've been a little confused, but still moving forward.
          </p>
          <span block font-label text-sm text-stone-500 op60 mt-6 tracking="[0.02em]">
            // a bird that yearns for freedom can never be caged.
          </span>
        </section>

        <!-- things I'm building -->
        <section mb-24>
          <div
            flex items-center gap-3 mb-8
            font-label text="[10.5px] stone-500" tracking="[0.16em]" uppercase
          >
            <span flex-shrink-0 w-7 h-px bg-current op50 />
            Things I'm building / take part in
          </div>
          <div
            grid="~ cols-1 sm:cols-2 lg:cols-3"
            gap-px bg="stone-200 dark:stone-800"
            border="~ stone-200 dark:stone-800"
          >
            <a
              v-for="proj in projects"
              :key="proj.num"
              :href="proj.url"
              target="_blank"
              rel="noopener noreferrer"
              flex="~ col"
              py-7 px-6 min-h="[190px]"
              bg="stone-50 dark:stone-950 hover:stone-100 dark:hover:stone-900"
              no-underline transition="colors" duration-200
              text-inherit
            >
              <div flex justify-between items-baseline mb-3>
                <span font-label text="[11px] stone-400" uppercase tracking="[0.08em]">{{ proj.num }}</span>
                <span font-label text="[11px] stone-400" uppercase tracking="[0.08em]" op70>{{ proj.lang }}</span>
              </div>
              <h3 font-display font-bold text-xl m-0 mb-2.5 tracking="[-0.01em]">{{ proj.name }}</h3>
              <p text="[13.5px] stone-500 dark:stone-400" m-0 mb-auto leading-relaxed>{{ proj.desc }}</p>
              <div flex items-center gap-3 mt-5 font-label text="[11px] stone-400" op80>
                <span flex items-center gap-1.5>
                  <span i-ph-star />
                  {{ proj.stars }}
                </span>
                <span flex items-center gap-1.5>
                  <span i-ph-git-fork />
                  {{ proj.forks }}
                </span>
              </div>
            </a>
          </div>
        </section>

        <!-- three windows -->
        <section>
          <div
            flex items-center gap-3 mb-8
            font-label text="[10.5px] stone-500" tracking="[0.16em]" uppercase
          >
            <span flex-shrink-0 w-7 h-px bg-current op50 />
            three windows into me
          </div>
          <div
            grid="~ cols-1 md:cols-3"
            border="t stone-200 dark:stone-800"
            class="divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-800"
          >
            <div v-for="win in windows" :key="win.role" py-9 px-7>
              <div flex items-center gap-2.5 mb-5 font-label text="[10.5px] stone-500" tracking="[0.12em]" uppercase>
                <span
                  w-2 h-2 rounded-full flex-shrink-0
                  :style="{ background: win.dotColor, boxShadow: `0 0 8px ${win.dotColor}` }"
                />
                {{ win.role }}
              </div>
              <h4 font-display font-bold text-xl m-0 mb-2.5 tracking="[-0.01em]">
                {{ win.heading }}
              </h4>
              <p text="[13.5px] stone-500 dark:stone-400" m-0 leading-relaxed>
                {{ win.body }}
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer
        mt-20 px="6 md:12" py-8
        border="t stone-200 dark:stone-800"
        flex="~ wrap justify-between items-center"
        gap-3 font-label text-xs text-stone-500
      >
        <span op70>© Liang Mi 2026 · Hangzhou</span>
        <div flex items-center gap-2.5>
          <a
            href="https://github.com/liangmiQwQ"
            target="_blank" rel="noopener"
            class="transition-colors hover:text-stone-800 dark:hover:text-stone-200"
          >github</a>
          <span op30>·</span>
          <a
            href="https://x.com/liangmiQwQ"
            target="_blank" rel="noopener"
            class="transition-colors hover:text-stone-800 dark:hover:text-stone-200"
          >x</a>
          <span op30>·</span>
          <a
            href="/bilibili"
            class="transition-colors hover:text-stone-800 dark:hover:text-stone-200"
          >bilibili</a>
        </div>
      </footer>
    </div>
  </main>
</template>
