<script setup lang="ts">
useHead({
  title: '小丑 - Joker',
  meta: [
    {
      name: 'keywords',
      content: '聊天记录, 生成器, 小丑, 模拟器',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/icons/noto:clown-face.svg',
    },
  ],
})

const sessions = computed(() => getDataSetById('joker')?.sessions || [])
</script>

<template>
  <div class="px-2">
    <h2 class="my-3 text-xl font-semibold tracking-tight">
      🤡 Joker
    </h2>

    <ChatSessionList :sessions="sessions" />
  </div>
</template>
