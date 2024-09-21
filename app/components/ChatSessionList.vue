<script setup lang="ts">
import type { ChatDataSet } from '~~/packages/chat-ui'

withDefaults(defineProps<{
  sessions: ChatDataSet['sessions']
}>(), {
  sessions: () => [],
})

const uStore = useUserStore()
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
        {{ session.title }}
      </div>
      <ChatSessionUI
        :session="session"
        :show-action="true"
        :q-avatar="uStore.she.avatar"
        :a-avatar="uStore.me.avatar"
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
