<script setup lang="ts">
import { jokerChatDataSet } from '~~/packages/datasets'

const jokerStore = useJokerStore()

const sessions = ref(jokerChatDataSet.sessions)

// TODO: inject avatar from store for ChatSessionUI
watch(() => [
  jokerStore.joker.avatar,
  jokerStore.tower.avatar,
], () => {
  sessions.value = jokerChatDataSet.sessions.map((session) => {
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
}, {
  immediate: true,
})

onMounted(() => {
  // vanilla JS

  // const msnry = new Masonry('.masonry', {
  // // options...
  //   itemSelector: '.masonry-item',
  //   columnWidth: 375,
  // })
})
</script>

<template>
  <div class="masonry columns-1">
    <div
      v-for="(session, i) in sessions"
      :key="i"
      class="masonry-item mx-auto mb-4 w-375px break-inside-avoid"
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
@media screen and (min-width: 800px) {
  .masonry {
    column-count: 2;
    column-gap: 1rem;
  }
}

@media screen and (min-width: 1200px) {
  .masonry {
    column-count: 3;
  }
}

@media screen and (min-width: 1600px) {
  .masonry {
    column-count: 4;
  }
}
</style>
