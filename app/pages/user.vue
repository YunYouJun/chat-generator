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

const actions = computed(() => [
  {
    label: '交换',
    icon: 'i-ri:swap-2-line',
    onClick: () => uStore.exchangeAvatar(),
    rotated: uStore.isAvatarExchanged,
    primary: true,
  },
  {
    label: '位移',
    icon: 'i-ri:arrow-left-right-line',
    onClick: () => uStore.exchangeMessage(),
    rotated: uStore.isMessageExchanged,
    primary: true,
  },
  {
    label: '复制',
    icon: 'i-ri:file-copy-2-line',
    onClick: () => uStore.copyLink(),
    rotated: false,
    primary: false,
  },
])
</script>

<template>
  <div class="pb-4">
    <div class="mx-auto my-4 max-w-xl flex flex-col gap-3 px-3">
      <div class="flex items-center justify-between gap-4">
        <CGAvatarInput v-model:qq="uStore.she.qq" v-model:avatar="uStore.she.avatar" class="flex-1" nickname="她/他" />
        <CGAvatarInput v-model:qq="uStore.me.qq" v-model:avatar="uStore.me.avatar" class="flex-1" nickname="我" />
      </div>

      <div class="flex items-center justify-center gap-4">
        <button
          v-for="action in actions"
          :key="action.label"
          class="inline-flex ios-pressable items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs shadow-sm transition"
          :class="action.primary
            ? 'bg-$ios-blue text-white'
            : 'border border-$ios-separator bg-$ios-card-bg'"
          @click="action.onClick"
        >
          <div
            class="transform text-sm transition"
            :class="[action.icon, { 'rotate-180': action.rotated }]"
          />
          <span>{{ action.label }}</span>
        </button>
      </div>
    </div>

    <div class="m-auto flex flex-col gap-3 px-4 md:(grid grid-cols-2 max-w-3xl)">
      <div class="flex flex-col gap-2">
        <textarea
          v-model="uStore.sessionText"
          class="min-h-150px w-full flex-1 border border-$ios-separator rounded-xl bg-$ios-card-bg p-3 text-sm outline-none transition focus:border-$ios-blue"
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
