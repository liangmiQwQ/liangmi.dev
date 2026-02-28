<template>
  <b>
    {{ yearOld }}
  </b>
</template>

<script lang="ts" setup>
const { birth } = defineProps<{ birth: string }>() // 'yyyy-mm-dd'

const yearOld = computed(() => {
  const now = new Date()
  const birthDate = new Date(birth)
  const diff = now.getTime() - birthDate.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
})

</script>
