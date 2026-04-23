<template>
  <section mb-28 relative>
    <div
      flex items-center gap-3 mb-9
      op40
      text="xs" tracking="[0.16em]" uppercase
    >
      About Me
    </div>
    <p
      font-display font-medium leading-snug tracking-tight
      opacity-95
      max-w="[820px]" mb-5
      class="text-[clamp(22px,2.8vw,34px)]"
    >
      I'm a <span font-serif italic text-mauve>student</span> and <span font-serif italic text-mauve>open-source developer</span>
      from Hangzhou.
      I work on tools I find beautiful —
      parsers, dev tooling, little experiments — and I write down what I can't say out loud.
      Lately I've been a little confused, but still moving forward.
    </p>
    <span block font-mono text-sm op35 mt-8 tracking="[0.02em]">
      // a bird that yearns for freedom can never be caged.
    </span>
    <span
      i-streamline-cyber-origami-paper-bird
      class="absolute right-10 top-1/2 -translate-y-1/2 -rotate-10"
      text="[clamp(80px,12vw,160px)]"
      op50
      pointer-events-none
    />
  </section>
</template>
