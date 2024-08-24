<script setup lang="ts">
import type { ChatMember, ChatMessageItem, ChatSession } from '../../types'

const props = defineProps<{
  session: ChatSession
}>()

function getSender(message: ChatMessageItem): ChatMember | undefined {
  if (typeof message.sender === 'string') {
    return props.session.members.find(member => member.id === message.sender)
  }
  return message.sender
}
</script>

<template>
  <div class="w-375px flex flex-col gap-4 rounded-lg bg-#111 p-6">
    <QqChatBubble
      v-for="(message, i) in session.messages"
      :key="i"
      :sender="getSender(message)"
      :message="message"
    />
  </div>
</template>
