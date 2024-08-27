<script setup lang="ts">
import { jokerChatDataSet } from '~~/packages/datasets'

definePageMeta({
  layout: 'home',
})

// const online = useOnline()

const collections = {
  joker: jokerChatDataSet,
}
</script>

<template>
  <div>
    <h1 class="flex items-center justify-center gap-2 text-xl">
      <div i-ri:message-2-line />
      <span>聊天记录合集</span>
    </h1>
    <div class="mt-4 flex flex-wrap">
      <RouterLink
        v-for="(dataset, key) in collections"
        :key="key"
        :to="`/dataset/${key}`"
      >
        <CGCard>
          <div class="flex gap-2">
            <span>{{ dataset.emoji }}</span>
            <span> {{ dataset.name }}</span>
          </div>
          <div>
            <ChatSessionUI v-if="dataset.sessions[0]" :session="dataset.sessions[0]" />
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
