<script setup lang="ts">
import type { ChatSession } from '~~/packages/chat-ui'
import { parseQAMessage } from '../../packages/datasets/utils'

const uStore = useUserStore()

const session = computed<ChatSession>(() => {
  return {
    title: 'QA Parse',
    messages: parseQAMessage(uStore.sessionText),
  }
})
</script>

<template>
  <div class="pb-4">
    <div class="mx-auto my-4 max-w-xl flex items-center justify-between gap-2 px-3">
      <CGAvatarInput v-model:qq="uStore.she.qq" v-model:avatar="uStore.she.avatar" class="w-36 lg:w-full" nickname="她/他" />
      <div class="flex flex-col gap-3">
        <div class="flex flex-col items-center gap-1">
          <button
            class="ios-pressable inline-flex items-center justify-center rounded-full bg-$ios-blue p-2.5 text-white shadow-sm"
            @click="uStore.exchangeAvatar"
          >
            <div
              class="transform transition"
              :class="{ 'rotate-180': uStore.isAvatarExchanged }"
              i-ri:swap-2-line
            />
          </button>
          <span class="text-10px text-$ios-secondary-label">交换</span>
        </div>

        <div class="flex flex-col items-center gap-1">
          <button
            class="ios-pressable inline-flex items-center justify-center rounded-full bg-$ios-blue p-2.5 text-white shadow-sm"
            @click="uStore.exchangeMessage"
          >
            <div
              class="transform transition"
              :class="{ 'rotate-180': uStore.isMessageExchanged }"
              i-ri:arrow-left-right-line
            />
          </button>
          <span class="text-10px text-$ios-secondary-label">位移</span>
        </div>

        <div class="flex flex-col items-center gap-1">
          <button
            class="ios-pressable inline-flex items-center justify-center rounded-full border border-$ios-separator bg-$ios-card-bg p-2.5 shadow-sm"
            @click="uStore.copyLink"
          >
            <div class="transform transition" i-ri:file-copy-2-line />
          </button>
          <span class="text-10px text-$ios-secondary-label">复制</span>
        </div>
      </div>
      <CGAvatarInput v-model:qq="uStore.me.qq" v-model:avatar="uStore.me.avatar" class="w-36 lg:w-full" nickname="我" />
    </div>

    <div class="m-auto flex flex-col gap-3 px-4 md:(grid grid-cols-2 max-w-3xl)">
      <div class="flex flex-col gap-2">
        <textarea
          v-model="uStore.sessionText"
          class="min-h-150px w-full flex-1 rounded-xl border border-$ios-separator bg-$ios-card-bg p-3 text-sm outline-none transition focus:border-$ios-blue"
          placeholder="输入对话内容"
        />
        <CGButton class="w-full" @click="uStore.sessionText = rawSessionText">
          重置文本
        </CGButton>
      </div>

      <div>
        <ChatSessionUI
          :session="session"
          :show-action="true"
          :q-avatar="uStore.she.avatar"
          :a-avatar="uStore.me.avatar"
          :actions="['copyImage', 'copyText', 'download']"
        />
      </div>
    </div>
  </div>
</template>
