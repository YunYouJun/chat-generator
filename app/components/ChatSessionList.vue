<script setup lang="ts">
import { jokerChatDataSet } from '~~/packages/datasets'

const jokerStore = useJokerStore()

const sessions = computed(() => {
  return jokerChatDataSet.sessions.map((session) => {
    session.messages.forEach((message) => {
      if (typeof message.sender === 'object' && message.sender.type === 'user' && jokerStore.joker.avatar) {
        message.sender.avatar = jokerStore.joker.avatar
      }
      else if (jokerStore.tower.avatar) {
        if (!message.sender) {
          message.sender = {
            avatar: jokerStore.tower.avatar,
          }
        }
        else if (typeof message.sender === 'object') {
          message.sender.avatar = jokerStore.tower.avatar
        }
      }
    })
    return session
  })
})
</script>

<template>
  <div class="masonry mx-auto columns-1 gap-4 px-4 sm:columns-1">
    <div
      v-for="(session, i) in sessions"
      :key="i"
      class="masonry-item mx-auto mb-4 w-375px inline-flex flex-col"
    >
      <div class="p-2 text-sm op-60">
        {{ session.name }}
      </div>
      <ChatSessionUI
        :session="session"
        :show-action="true"
      />
    </div>
  </div>
</template>

<style lang="scss">
.masonry {
  .masonry-item {
    break-inside: avoid;
  }
}
</style>
