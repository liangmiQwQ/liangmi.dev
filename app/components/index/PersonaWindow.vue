<script setup lang="ts">
defineProps<{
  role: string
  heading: string
  body: string
}>()
</script>

<template>
  <div py-9 px-7>
    <div mb-5 font-label text="[10.5px] taupe-400" tracking="[0.14em]" uppercase flex items-center gap-2>
      <span w-1 h-1 rounded-full bg-taupe-400 dark:bg-taupe-500 op60 flex-shrink-0 />
      {{ role }}
    </div>
    <h4 font-display font-bold text-xl m-0 mb-3 tracking="[-0.01em]" text="taupe-950 dark:taupe-50">
      {{ heading }}
    </h4>
    <p text="[13.5px] taupe-500 dark:taupe-400" m-0 leading-relaxed>
      {{ body }}
    </p>
  </div>
</template>
