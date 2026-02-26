<script setup lang="ts">
const route = useRoute<'dataset-id'>()
const id = route.params.id

const dataset = computed(() => getDataSetById(id) ?? {
  id: 0,
  emoji: '❓',
  name: '未知数据集',
  sessions: [],
})
</script>

<template>
  <div class="px-2">
    <h2 class="my-3 text-xl font-semibold tracking-tight">
      {{ dataset.emoji }} {{ dataset.name }}
    </h2>

    <ChatSessionList
      :sessions="dataset?.sessions"
    />
  </div>
</template>
