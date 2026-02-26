<script setup lang="ts">
import { kApp, kButton, kToast } from 'konsta/vue'
import { appName } from '~/constants'

useHead({
  title: appName,
  meta: [
    {
      name: 'keywords',
      content: '聊天记录, 生成器, 小丑, 模拟器',
    },
  ],
})

const color = useColorMode()
const isDark = computed(() => color.value === 'dark')
const { toasts, close } = useIosToast()

const route = useRoute()
const currentTab = computed(() => {
  const path = route.path
  if (path === '/' || path.startsWith('/dataset'))
    return 'home'
  if (path === '/user')
    return 'user'
  if (path === '/settings' || path === '/about')
    return 'settings'
  return 'home'
})
</script>

<template>
  <kApp theme="ios" :dark="isDark">
    <div class="min-h-screen bg-$ios-grouped-bg text-$ios-label font-sans">
      <!-- iOS Navigation Bar -->
      <div class="ios-glass fixed left-0 right-0 top-0 z-99 border-b-0.5 border-$ios-separator" style="padding-top: var(--sat)">
        <TheMenuBar />
      </div>

      <VitePwaManifest />

      <!-- Main Content -->
      <div class="h-screen flex flex-col" style="padding-top: calc(var(--sat) + 44px); padding-bottom: calc(var(--sab) + 50px)">
        <div class="flex-1 overflow-auto">
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </div>
      </div>

      <!-- iOS Tab Bar -->
      <div class="ios-glass fixed bottom-0 left-0 right-0 z-99 border-t-0.5 border-$ios-separator" style="padding-bottom: var(--sab)">
        <div class="h-50px flex items-end justify-around px-4">
          <RouterLink to="/" aria-label="聊天" class="flex flex-1 flex-col items-center justify-center gap-0.5 pb-1 pt-1.5" :class="currentTab === 'home' ? 'text-$ios-blue' : 'text-$ios-secondary-label'">
            <div class="text-xl" :class="currentTab === 'home' ? 'i-ri-chat-1-fill' : 'i-ri-chat-1-line'" />
            <span class="text-10px">聊天</span>
          </RouterLink>
          <RouterLink to="/user" aria-label="编辑" class="flex flex-1 flex-col items-center justify-center gap-0.5 pb-1 pt-1.5" :class="currentTab === 'user' ? 'text-$ios-blue' : 'text-$ios-secondary-label'">
            <div class="text-xl" :class="currentTab === 'user' ? 'i-ri-edit-fill' : 'i-ri-edit-line'" />
            <span class="text-10px">编辑</span>
          </RouterLink>
          <RouterLink to="/settings" aria-label="设置" class="flex flex-1 flex-col items-center justify-center gap-0.5 pb-1 pt-1.5" :class="currentTab === 'settings' ? 'text-$ios-blue' : 'text-$ios-secondary-label'">
            <div class="text-xl" :class="currentTab === 'settings' ? 'i-ri-settings-3-fill' : 'i-ri-settings-3-line'" />
            <span class="text-10px">设置</span>
          </RouterLink>
        </div>
      </div>

      <!-- Guide Overlay -->
      <CGGuideOverlay />

      <kToast
        v-for="toast in toasts"
        :key="toast.id"
        position="center"
        :opened="toast.visible"
      >
        <template #button>
          <kButton clear inline rounded @click="close(toast.id)">
            关闭
          </kButton>
        </template>
        <div class="flex shrink items-center gap-2">
          <div v-if="toast.severity === 'success'" class="i-ri-check-line" />
          <div v-else-if="toast.severity === 'error'" class="i-ri-close-line" />
          <div v-else class="i-ri-information-line" />
          <span>{{ toast.summary }}<template v-if="toast.detail"> · {{ toast.detail }}</template></span>
        </div>
      </kToast>
    </div>
  </kApp>
</template>

<style>
html,
body,
#__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  background: var(--cg-c-bg);
  color: var(--cg-c-text);
}

html.dark {
  background: var(--cg-c-bg);
  color: var(--cg-c-text);
}
</style>
