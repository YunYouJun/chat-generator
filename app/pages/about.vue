<script setup lang="ts">
import 'star-markdown-css/src/scss/theme/yun.scss'

const { data: home } = await useAsyncData(() => queryCollection('content').path('/about').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
})
</script>

<template>
  <div class="px-2">
    <ContentRenderer v-if="home" class="markdown-body m-auto max-w-2xl rounded-xl bg-$ios-card-bg px-5 py-4 text-left shadow-sm prose md:px-8" :value="home" />
    <div v-else class="py-20 text-center text-$ios-secondary-label">
      About not found
    </div>
  </div>
</template>
