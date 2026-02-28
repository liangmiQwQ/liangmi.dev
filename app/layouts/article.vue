<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const { data: page } = await useAsyncData(`article-${route.path}`, () => {
  const queryPath = `/articles${route.path.replace('/blog', '')}`
  return queryCollection('articles').path(queryPath).first()
})

// Extract table of contents from page body
const toc = computed(() => {
  if (!page.value?.body?.toc?.links)
    return []
  return page.value.body.toc.links
})

// Get page metadata
const meta = computed(() => ({
  title: page.value?.title || 'Untitled',
  description: (page.value as any)?.description,
  date: (page.value as any)?.date,
  genre: (page.value as any)?.genre,
  topic: (page.value as any)?.topic,
  length: (page.value as any)?.length,
  status: (page.value as any)?.status,
}))
</script>

<template>
  <div>
    <AppBar />
    <ReadingProgress />

    <div class="min-h-screen pt-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr,16rem] gap-8 lg:gap-12">
          <!-- Main content -->
          <article class="min-w-0">
            <div v-if="page">
              <ArticleHeader
                :title="meta.title"
                :description="meta.description"
                :date="meta.date"
                :genre="meta.genre"
                :topic="meta.topic"
                :length="meta.length"
                :status="meta.status"
              />
              <div class="prose prose-stone dark:prose-invert max-w-none">
                <ContentRenderer :value="page" />
              </div>
            </div>
            <div v-else class="prose prose-stone dark:prose-invert max-w-none">
              <div text-center py-16>
                <div i-ph-file-x-duotone text-6xl mx-auto mb-4 class="primary-light/30 dark:primary-dark/30" />
                <h1 text-2xl font-bold mb-2>
                  Article Not Found
                </h1>
                <p class="primary-light/60 dark:primary-dark/60" mb-6>
                  The article you're looking for doesn't exist or has been moved.
                </p>
                <Button to="/blog" variant="secondary">
                  <div i-ph-arrow-left-duotone />
                  Back to Blog
                </Button>
              </div>
            </div>
          </article>

          <!-- Sidebar with TOC -->
          <aside v-if="toc.length > 0" class="hidden lg:block">
            <TableOfContents :toc="toc" />
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>
