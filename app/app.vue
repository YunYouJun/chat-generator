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
  <VitePwaManifest />
  <div class="h-screen" flex="~ col">
    <div class="h-19 w-full" />
    <div style="height: calc(100% - 76px)" overflow-auto>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
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
