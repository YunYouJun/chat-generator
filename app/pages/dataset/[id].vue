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
  <div>
    <h2 class="my-2 text-2xl font-medium">
      {{ dataset.emoji }} {{ dataset.name }}
    </h2>

    <ChatSessionList
      :sessions="dataset?.sessions"
    />
  </div>
</template>
