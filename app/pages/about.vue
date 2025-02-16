<script setup lang="ts">
import 'star-markdown-css/src/scss/theme/yun.scss'

const { data: home } = await useAsyncData(() => queryCollection('content').path('/about').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
})
</script>

<template>
  <ContentRenderer v-if="home" class="markdown-body m-auto max-w-2xl px-4 text-left prose md:px-8" :value="home" />
  <div v-else>
    About not found
  </div>
</template>
