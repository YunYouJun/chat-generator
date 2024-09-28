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
  <div class="mb-8">
    <div class="mx-auto my-8 max-w-md flex items-center justify-between gap-2 px-3">
      <CGAvatarInput v-model:qq="uStore.she.qq" v-model:avatar="uStore.she.avatar" nickname="她/他" />
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <button
            class="button inline-flex items-center justify-center rounded-full bg-blue-500 p-2 text-white"
            @click="uStore.exchange"
          >
            <div
              class="transform transition"
              :class="{
                'rotate-90': uStore.isExchanged,
              }" i-ri:exchange-2-line
            />
          </button>
          <span text-xs op-60>立场交换</span>
        </div>

        <div class="flex flex-col gap-1">
          <button
            class="button inline-flex items-center justify-center border rounded-full p-2"
            @click="uStore.copyLink"
          >
            <div
              class="transform transition"
              i-ri:file-copy-2-line
            />
          </button>
          <span text-xs op-60>复制链接</span>
        </div>
      </div>
      <CGAvatarInput v-model:qq="uStore.me.qq" v-model:avatar="uStore.me.avatar" nickname="我" />
    </div>

    <div class="m-auto flex flex-col gap-2 md:(grid grid-cols-2 max-w-3xl)">
      <!-- textarea -->
      <div class="flex flex-col gap-1">
        <textarea
          v-model="uStore.sessionText"
          class="min-h-150px w-full flex-1 border border-gray-300 p-2 text-sm outline-blueGray-600 dark:border-dark-100"
          placeholder="输入对话内容"
        />
        <CGButton class="h-35.2px" @click="uStore.sessionText = rawSessionText">
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
