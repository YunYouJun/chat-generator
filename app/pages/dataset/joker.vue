<script setup lang="ts">
useHead({
  title: '小丑 - Joker',
  meta: [
    {
      name: 'keywords',
      content: '聊天记录, 生成器, 小丑, 模拟器',
    },
  ],
  // favicon
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
  <div>
    <h2 class="my-2 text-2xl font-medium">
      🤡 Joker
    </h2>

    <ChatSessionList :sessions="sessions" />
  </div>
</template>
