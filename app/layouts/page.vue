<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  showBackLink?: boolean
  backLink?: string
  backLabel?: string
}>()
</script>

<template>
  <div>
    <AppBar />
    <div class="min-h-screen pt-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <!-- Optional back link -->
        <div v-if="showBackLink" mb-8>
          <NuxtLink
            :to="backLink || '/'"
            class="inline-flex items-center gap-2 text-sm transition-colors primary-light/60 dark:primary-dark/60 hover:primary-light hover:dark:primary-dark"
          >
            <div i-ph-arrow-left-duotone />
            {{ backLabel || 'Back' }}
          </NuxtLink>
        </div>

        <!-- Page header -->
        <header v-if="title || description" mb-8 pb-6 border-b class="border-primary-light/10 dark:border-primary-dark/10">
          <h1 v-if="title" text-3xl md:text-4xl font-bold tracking-tight mb-4>
            {{ title }}
          </h1>
          <p v-if="description" text-lg leading-relaxed class="primary-light/70 dark:primary-dark/70">
            {{ description }}
          </p>
        </header>

        <!-- Page content -->
        <main class="prose prose-stone dark:prose-invert max-w-none">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
