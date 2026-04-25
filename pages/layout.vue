<script setup lang="ts">
import Footer from '~/components/site/Footer.vue'
import Header from '~/components/site/Header.vue'
import StarfieldBackground from '~/components/site/StarfieldBackground.vue'
import 'virtual:uno.css'
import '~/assets/css/main.css'
</script>

<template>
  <div min-h-screen flex flex-col bg-stone-950 text-stone-50 relative overflow-hidden>
    <StarfieldBackground />
    <Header />
    <main flex-1 w-full max-w="[760px]" mx-auto px="6 md:12" pt-10 pb-20>
      <slot />
    </main>
    <Footer />
  </div>
</template>
