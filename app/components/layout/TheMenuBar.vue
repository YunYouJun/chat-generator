<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/' || path.startsWith('/dataset'))
    return '聊天记录合集'
  if (path === '/user')
    return '编辑'
  if (path === '/about')
    return '关于'
  if (path === '/settings')
    return '设置'
  if (path === '/random')
    return '随机'
  return '聊天记录'
})

const showBack = computed(() => {
  return route.path !== '/' && route.path !== '/user' && route.path !== '/settings'
})

function goBack() {
  if (window.history.length > 1) {
    console.log('window.history.length', window.history.length)
    router.back()

  }
  else
    navigateTo('/')
}
</script>

<template>
  <div class="h-44px flex items-center justify-center px-4">
    <!-- Left: Back button -->
    <div class="absolute left-3 flex items-center">
      <button
        v-if="showBack"
        class="ios-pressable flex items-center gap-0.5 text-$ios-blue"
        @click="goBack"
      >
        <div class="i-ri-arrow-left-s-line text-2xl" />
        <span class="text-17px">返回</span>
      </button>
    </div>

    <!-- Center: Title -->
    <div class="text-17px font-semibold tracking-tight">
      {{ pageTitle }}
    </div>
  </div>
</template>
