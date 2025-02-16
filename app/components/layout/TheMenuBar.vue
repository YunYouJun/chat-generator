<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { collectionTOC } from '~~/config'
import { submitSheetUrl } from '~/config'

const uStore = useUserStore()
const items = ref([
  {
    label: '聊天记录',
    icon: 'i-ri-chat-1-line',
    to: '/',
  },
  {
    label: '十景',
    icon: 'i-ri-menu-search-line',
    items: collectionTOC.map((collection) => {
      return {
        label: collection.name,
        emoji: collection.emoji,
        to: `/dataset/${collection.id}`,
        badge: collection.sessions?.length,
      }
    }),
  },
  {
    label: '投稿',
    icon: 'i-ri-file-list-3-line',
    to: submitSheetUrl,
    target: '_blank',
  },
  {
    label: '关于',
    icon: 'i-ri-information-line',
    to: '/about',
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
      <NuxtLink
        v-ripple
        class="flex items-center" v-bind="props.action" :to="item.to" :target="item.target"
      >
        <span :class="item.icon" />
        <span v-if="item.emoji">{{ item.emoji }}</span>
        <span class="ml-1">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
        <span v-if="item.shortcut" class="bg-emphasis border-surface text-muted-color ml-auto border rounded p-1 text-xs">{{ item.shortcut }}</span>
        <i v-if="hasSubmenu" class="i-ri-arrow-down-s-line" :class="[{ 'i-ri-arrow-down-s-line ml-2': root, 'i-ri-arrow-right-s-line ml-auto': !root }]" />
      </NuxtLink>
    </template>
    <template #end>
      <div class="flex items-center justify-center gap-2">
        <a href="https://github.com/YunYouJun/chat-generator" target="_blank" class="size-8 inline-flex items-center justify-center">
          <div i-ri-github-line />
        </a>
        <DarkToggle class="size-8 text-base" />
        <RouterLink class="ml-1 inline-flex" to="/user">
          <Avatar
            v-if="uStore.me.avatar"
            size="normal" :image="uStore.me.avatar" shape="circle"
          />
          <DefaultColorAvatar v-else class="size-8">
            U
          </DefaultColorAvatar>
        </RouterLink>
      </div>
    </template>
  </Menubar>
</template>
