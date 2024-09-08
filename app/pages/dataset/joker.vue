<script setup lang="ts">
import { DATASETS } from '~~/packages/datasets'

const jokerStore = useJokerStore()

useHead({
  title: '小丑 - Joker',
  meta: [
    {
      name: 'keywords',
      content: '聊天记录, 生成器, 小丑, 模拟器',
    },
  ],
  // favicon
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/icons/noto:clown-face.svg',
    },
  ],
})

const isExchanged = ref(false)
const sessions = computed(() => getDataSetById('joker')?.sessions || [])

/**
 * 立场交换
 */
function exchange() {
  const tower = { ...jokerStore.tower }
  jokerStore.tower.qq = jokerStore.joker.qq
  jokerStore.tower.avatar = jokerStore.joker.avatar
  jokerStore.joker.qq = tower.qq
  jokerStore.joker.avatar = tower.avatar

  isExchanged.value = !isExchanged.value
}

const { copy } = useClipboard()
const toast = useToast()
/**
 * 复制链接
 */
function copyLink() {
  const url = new URL(window.location.href)
  url.searchParams.set('jokerQQ', jokerStore.joker.qq?.toString() || '')
  url.searchParams.set('towerQQ', jokerStore.tower.qq?.toString() || '')
  copy(url.toString()).then(() => {
    toast.add({
      severity: 'success',
      summary: '复制成功',
      detail: '已将链接复制到剪贴板',
      life: 3000,
    })
  })
}
</script>

<template>
  <div>
    <h2 class="my-2 text-2xl font-medium">
      🤡 Joker
    </h2>

    <div class="mx-auto my-8 max-w-md flex items-center justify-between gap-2 px-3">
      <CGAvatarInput v-model:qq="jokerStore.tower.qq" v-model:avatar="jokerStore.tower.avatar" nickname="她/他" />
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <button
            class="button inline-flex items-center justify-center rounded-full bg-blue-500 p-2 text-white"
            @click="exchange"
          >
            <div
              class="transform transition"
              :class="{
                'rotate-90': isExchanged,
              }" i-ri:exchange-2-line
            />
          </button>
          <span text-xs op-60>立场交换</span>
        </div>

        <div class="flex flex-col gap-1">
          <button
            class="button inline-flex items-center justify-center border rounded-full p-2"
            @click="copyLink"
          >
            <div
              class="transform transition"
              i-ri:file-copy-2-line
            />
          </button>
          <span text-xs op-60>复制链接</span>
        </div>
      </div>
      <CGAvatarInput v-model:qq="jokerStore.joker.qq" v-model:avatar="jokerStore.joker.avatar" nickname="小丑" />
    </div>

    <ChatSessionList :sessions="sessions" />
  </div>
</template>
