<script setup lang="ts">
const route = useRoute<'dataset-id'>()
const id = route.params.id

const dataset = computed(() => getDataSetById(id) ?? {
  id: 0,
  title: '未知数据集',
  sessions: [],
})
</script>

<template>
  <ChatSessionList
    :sessions="dataset?.sessions"
  />
</template>
