<script setup lang="ts">
import type { ChatMember, ChatMessageItem } from '../../types'
import { fetchQQAvatar } from '~/api'
import { A_AVATAR_SYMBOL, Q_AVATAR_SYMBOL } from '../constants'

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
    const base64 = await fetchQQAvatar(props.sender.qq)
    return typeof base64 === 'string' ? base64 : ''
  }
  else {
    return ''
  }
})

const aAvatar = inject(A_AVATAR_SYMBOL)
const qAvatar = inject(Q_AVATAR_SYMBOL)
const injectedAvatar = computed(() => {
  return props.sender?.type === 'user' ? aAvatar?.value : qAvatar?.value
})

const iAvatar = computed(() => {
  return injectedAvatar.value || senderAvatar.value
})
</script>

<template>
  <div
    class="flex-reverse flex gap-2"
    :class="{
      'justify-start flex-row-reverse': isUser,
    }"
  >
    <div class="size-9 rounded-full bg-blue">
      <Transition mode="out-in">
        <img
          v-if="iAvatar"
          :src="iAvatar"
          alt="avatar"
          class="size-9 rounded-full object-cover object-center"
        >
      </Transition>
    </div>

    <div
      class="flex flex-1 flex-col items-start gap-1"
      :class="{
        'items-end': isUser,
      }"
    >
      <div v-if="sender?.nickname" class="qq-chat-nickname text-xs text-#808080">
        {{ sender?.nickname }}
      </div>
      <div
        class="flex items-center gap-2"
        :class="{
          'flex-row-reverse': !isUser,
        }"
      >
        <div
          v-if="message.banned"
          class="i-ri-error-warning-fill text-base text-#f74c30"
        />
        <div
          class="qq-chat-bubble flex-1 rounded-lg p-2"
          text="sm left"
          dark="bg-#262626 text-white"
          :class="{
            'bg-#4397f7 text-white': isUser,
            'bg-white text-black': !isUser,
          }"
        >
          {{ message.content }}
        </div>
      </div>
    </div>

    <!-- reset space placeholder -->
    <div class="size-9" />
  </div>
</template>
