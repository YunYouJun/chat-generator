<script setup lang="ts">
import { jokerChatDataSet } from '~~/packages/datasets'

definePageMeta({
  layout: 'home',
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/noto:left-speech-bubble.svg',
    },
  ],
})

// const online = useOnline()

const collections = {
  joker: jokerChatDataSet,
  loveSF: {
    id: 'loveSF',
    name: '科幻故事',
    emoji: '💖',
    sessions: [],
  },
  pua: {
    id: 'pua',
    name: 'PUA',
    emoji: '💪',
    sessions: [],
  },
}
</script>

<template>
  <div>
    <h1 class="flex items-center justify-center gap-2 text-xl">
      <div i-ri:message-2-line />
      <span>聊天记录合集</span>
    </h1>
    <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
      <RouterLink
        v-for="(dataset, key) in collections"
        :key="key"
        :to="`/dataset/${key}`"
      >
        <CGCard class="relative w-80 overflow-hidden">
          <div
            class="absolute inset-0 flex items-center justify-center gap-2 rounded bg-white/90 text-5xl transition-all duration-700 hover:(bg-white/50 text-6xl)"
            dark="bg-black/90 text-white/90 hover:bg-black/50"
          >
            <span>{{ dataset.emoji }}</span>
            <span> {{ dataset.name }}</span>
          </div>
          <div class="h-70 flex items-end justify-center overflow-hidden">
            <ChatSessionUI
              v-if="dataset.sessions[0]"
              :session="dataset.sessions[0]"
            />
            <div v-else class="text-gray-80 p-6">
              暂无聊天记录
            </div>
          </div>
        </CGCard>
      </RouterLink>
    </div>
    <!-- <Logos mb-6 /> -->
    <!-- <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry /> -->
  </div>
</template>
