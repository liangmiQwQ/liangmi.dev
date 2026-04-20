<script setup lang="ts">
defineProps<{
  role: string
  heading: string
  body: string
}>()
</script>

<template>
  <div py-9 px-7>
    <div mb-5 font-label text="[10.5px] stone-400" tracking="[0.14em]" uppercase flex items-center gap-2>
      <span w-1 h-1 rounded-full bg-amber-400 dark:bg-amber-500 op80 flex-shrink-0 />
      {{ role }}
    </div>
    <h4 font-display font-bold text-xl m-0 mb-3 tracking="[-0.01em]" text="stone-950 dark:stone-50">
      {{ heading }}
    </h4>
    <p text="[13.5px] stone-500 dark:stone-400" m-0 leading-relaxed>
      {{ body }}
    </p>
  </div>
</template>
