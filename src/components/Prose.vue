<template>
  <article
    class="void-md antialiased [&_h1]:mb-0 [&_.article-body_h2]:(border-b-0 pb-0) [&_.article-body_ul]:list-disc [&_.article-body_ol]:list-decimal [&_.article-body_:is(p,li,td)]:text-current/85 [&_.article-body_li_p]:text-inherit [&_.article-body_p_strong]:text-[var(--vmd-text)] [&_.article-body_a]:(op95 text-[var(--vmd-text)] underline underline-offset-4) [&_.article-body_a:hover]:text-[var(--vmd-text)] [&_.article-body_:not(pre)>code]:(border-current/10 bg-current/5 text-inherit) [&_.article-body_blockquote]:(border-current/15 text-inherit) [&_.article-body_.code-block]:(relative my-6) [&_.article-body_pre]:(m-0 overflow-x-auto rounded-lg border border-current/10 bg-current/3 px-5 py-4 text-sm leading-relaxed) [&_.article-body_pre_span]:text-[var(--shiki-light)] dark:[&_.article-body_pre_span]:text-[var(--shiki-dark)] [&_.article-body_.code-copy]:(absolute right-2 top-2 size-8 flex items-center justify-center rounded-md border border-current/10 bg-taupe-50 op-50 cursor-pointer transition-opacity) dark:[&_.article-body_.code-copy]:bg-taupe-950 [&_.article-body_.code-copy:hover]:op-100 [&_.article-body_.code-copy.copied]:op-100 [&_.article-body_.code-copy]:before:(content-[''] i-ph-copy) [&_.article-body_.code-copy.copied]:before:i-ph-check [&_.article-body_:is(th,td)]:(border-x-0 px-4 py-2.5) [&_.article-body_:is(th,td):first-child]:pl-0 [&_.article-body_th]:(border-t-0 bg-transparent font-medium text-current/60) [&_.article-body_td]:tabular-nums [&_.article-body_:is(h2,h3,h4)]:scroll-mt-8 [&_.article-body_a.header-anchor]:(op0 no-underline) [&_.article-body_:is(h2,h3,h4):hover_a.header-anchor]:op50"
  >
    <slot name="header" />
    <!-- Warm Void's slate borders here, since its dark-mode variables outrank a class on .void-md. -->
    <div
      class="article-body [--vmd-border:color-mix(in_oklab,currentColor_12%,transparent)] [--vmd-bg-soft:color-mix(in_oklab,currentColor_4%,transparent)]"
    >
      <slot />
    </div>
  </article>
</template>
