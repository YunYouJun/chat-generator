<script setup lang="ts">
import { DATASETS } from '~~/packages/datasets'

const route = useRoute<'dataset-id'>()
const id = route.params.id

const dataset = computed(() => DATASETS.find(dataset => dataset.id === id) ?? {
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
