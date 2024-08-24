<script setup lang="ts">
import type { ChatMember, ChatMessageItem } from '../../types'
import { getQQAvatar } from '../../utils'

const props = defineProps<{
  sender?: ChatMember
  message: ChatMessageItem
}>()

const isUser = computed(() => {
  return props.sender?.type === 'user'
})

const senderAvatar = computedAsync(async () => {
  if (props.sender?.avatar) {
    return props.sender.avatar
  }
  else if (props.sender?.qq) {
    // return getQQAvatar({
    //   qq: props.sender.qq,
    // })
    // proxy qq avatar to download
    const base64 = await $fetch('/api/qq/avatar', {
      query: {
        url: getQQAvatar({
          qq: props.sender.qq,
        }),
      },
    })
    return typeof base64 === 'string' ? base64 : ''
  }
  else {
    return ''
  }
})

const avatar = computed(() => {
  return senderAvatar.value
})
</script>

<template>
  <div
    class="flex-reverse flex gap-2"
    :class="{
      'justify-start flex-row-reverse': isUser,
    }"
  >
    <div>
      <img
        v-if="avatar"
        :src="avatar"
        alt="avatar" class="size-9 rounded-full"
      >
      <div
        v-else class="size-9 rounded-full bg-gray"
        :class="{
          'bg-blue-500!': isUser,
        }"
      />
    </div>

    <div
      class="flex flex-1 flex-col items-start gap-1"
      :class="{
        'items-end': sender?.type === 'user',
      }"
    >
      <div v-if="sender?.nickname" class="qq-chat-nickname text-xs text-#808080">
        {{ sender?.nickname }}
      </div>
      <div
        class="qq-chat-bubble rounded-lg p-2"
        text="sm left"
        dark="bg-#262626 text-white"
      >
        {{ message.content }}
      </div>
    </div>

    <!-- reset space placeholder -->
    <div class="size-9" />
  </div>
</template>
