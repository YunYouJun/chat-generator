<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#000000' : '#f2f2f7',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="flex items-center justify-center !outline-none" @click="toggleDark">
    <div class="i-carbon-sun dark:i-carbon-moon" />
  </button>
</template>
