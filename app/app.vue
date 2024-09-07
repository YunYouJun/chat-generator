<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
  meta: [
    {
      name: 'keywords',
      content: '聊天记录, 生成器, 小丑, 模拟器',
    },
  ],
})
</script>

<template>
  <div class="fixed left-0 right-0 top-0 z-99">
    <TheMenuBar class="shadow-sm" />
  </div>
  <div class="h-18" />
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: var(--cg-c-bg);
  color: var(--cg-c-text);
}
</style>
