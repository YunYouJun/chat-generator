<script setup lang="ts">
const jokerStore = useJokerStore()
</script>

<template>
  <div>
    <h2 class="my-2 text-xl">
      🤡 Joker
    </h2>

    <div class="mx-auto my-8 max-w-md flex items-center justify-between gap-4 px-4">
      <CGAvatarInput v-model:qq="jokerStore.tower.qq" v-model:avatar="jokerStore.tower.avatar" nickname="她/他" />
      <CGAvatarInput v-model:qq="jokerStore.joker.qq" v-model:avatar="jokerStore.joker.avatar" nickname="小丑" />
    </div>
    <ChatSessionList />
  </div>
</template>
