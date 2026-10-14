<template>
  <article
    class="void-md antialiased [&_h1]:mb-0 [&_.article-body_h2]:(border-b-0 pb-0) [&_.article-body_ul]:list-disc [&_.article-body_ol]:list-decimal [&_.article-body_p]:text-current/75 [&_.article-body_a]:(op95 text-[var(--vmd-text)] underline underline-offset-4) [&_.article-body_a:hover]:text-[var(--vmd-text)] [&_.article-body_code]:(border-current/10 bg-current/5 text-inherit) [&_.article-body_pre]:grayscale [&_.article-body_blockquote]:(border-current/15 text-inherit) [&_.article-body_p_strong]:text-[var(--vmd-text)]"
  >
    <slot name="header" />
    <div class="article-body">
      <slot />
    </div>
  </article>
</template>
