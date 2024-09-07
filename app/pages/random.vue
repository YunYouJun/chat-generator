<script setup lang="ts">
import { jokerChatDataSet } from '~~/packages/datasets'
import type { ChatSession } from '~~/packages/chat-ui'

const session = ref<ChatSession>()

let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
  // random
  // session.value = jokerChatDataSet.sessions[Math.floor(Math.random() * jokerChatDataSet.sessions.length)]
  let index = 0
  intervalId = setInterval(() => {
    session.value = jokerChatDataSet.sessions[index % jokerChatDataSet.sessions.length]
    index += 1
  }, 200)
})

// TODO: gif.js not work

function stopRandom() {
  clearInterval(intervalId)
  session.value = jokerChatDataSet.sessions[Math.floor(Math.random() * jokerChatDataSet.sessions.length)]
}
</script>

<template>
  <div class="min-h-500px w-375px flex flex-col justify-between">
    <ChatSessionUI
      v-if="session"
      :session="session"
    />

    <CGButton @click="stopRandom">
      Random
    </CGButton>
  </div>
</template>
