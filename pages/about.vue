<template>
  <section pt-8 pb-20 relative>
    <h1 font-serif text-4xl md:text-5xl op95 mb-12 tracking-tight>
      About
    </h1>

    <p
      font-display font-medium leading-snug tracking-tight
      opacity-95 mb-6
      class="text-[clamp(20px,2.4vw,30px)]"
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
      class="absolute right-0 top-32 -rotate-10 hidden md:block"
      text="[clamp(80px,10vw,140px)]"
      op30
      pointer-events-none
    />
  </section>
</template>
