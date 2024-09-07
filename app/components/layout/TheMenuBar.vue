<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { collections, submitSheetUrl } from '~/config'

const items = ref([
  {
    label: '聊天记录',
    icon: 'i-ri-chat-1-line',
    to: '/',
  },
  {
    label: '分类',
    icon: 'i-ri-menu-search-line',
    items: Object.keys(collections).map((key) => {
      const collection = collections[key as keyof typeof collections]
      return {
        label: collection.name,
        emoji: collection.emoji,
        to: `/dataset/${key}`,
        badge: collection.sessions.length,
      }
    }),
  },
  {
    label: '投稿',
    icon: 'i-ri-file-list-3-line',
    to: submitSheetUrl,
    target: '_blank',
  },
])
</script>

<template>
  <Menubar :model="items">
    <!-- <template #start>
      <div class="flex items-center">
        📝 聊天记录合集
      </div>
    </template> -->
    <template #item="{ item, props, hasSubmenu, root }">
      <NuxtLink v-ripple class="flex items-center" v-bind="props.action" :to="item.to" :target="item.target">
        <span :class="item.icon" />
        <span class="ml-1">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
        <span v-if="item.shortcut" class="border-surface bg-emphasis text-muted-color ml-auto border rounded p-1 text-xs">{{ item.shortcut }}</span>
        <i v-if="hasSubmenu" class="i-ri-arrow-down-s-line" :class="[{ 'i-ri-arrow-down-s-line ml-2': root, 'i-ri-arrow-right-s-line ml-auto': !root }]" />
      </NuxtLink>
    </template>
    <template #end>
      <div class="flex items-center justify-center gap-2">
        <DarkToggle class="size-8 text-base" />
      </div>
    </template>
  </Menubar>
</template>
