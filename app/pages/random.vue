<script setup lang="ts">
import type { ChatSession } from '~~/packages/chat-ui'

const session = ref<ChatSession>()

let intervalId: ReturnType<typeof setInterval>

const jokerChatDataSet = computed(() => getDataSetById('joker'))

onMounted(() => {
  // random
  // session.value = jokerChatDataSet.sessions[Math.floor(Math.random() * jokerChatDataSet.sessions.length)]
  let index = 0
  intervalId = setInterval(() => {
    if (!jokerChatDataSet.value)
      return
    session.value = jokerChatDataSet.value.sessions?.[index % jokerChatDataSet.value.sessions.length]
    index += 1
  }, 200)
})

// TODO: gif.js not work

function stopRandom() {
  clearInterval(intervalId)
  if (jokerChatDataSet.value)
    session.value = jokerChatDataSet.value.sessions?.[Math.floor(Math.random() * jokerChatDataSet.value.sessions.length)]
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
