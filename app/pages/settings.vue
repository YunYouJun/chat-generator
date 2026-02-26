<script setup lang="ts">
import { submitSheetUrl } from '~/config'

definePageMeta({
  layout: 'blank',
})

const uStore = useUserStore()
const color = useColorMode()

type AppearanceMode = 'light' | 'dark' | 'system'

const appearanceMode = computed<AppearanceMode>({
  get: () => {
    if (color.preference === 'system')
      return 'system'
    return color.preference as AppearanceMode
  },
  set: (v: AppearanceMode) => {
    color.preference = v
  },
})

const appearanceOptions: { value: AppearanceMode, label: string }[] = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
  { value: 'system', label: '跟随系统' },
]

const { openGuide } = useGuide()

const commitRef = (import.meta.env.VITE_COMMIT_REF as string)?.slice(0, 7) ?? ''
const buildTime = import.meta.env.VITE_APP_BUILD_TIME as string
const buildDate = buildTime ? new Date(Number(buildTime)).toLocaleDateString('zh-CN') : ''
</script>

<template>
  <div class="mx-auto max-w-lg px-4 py-3">
    <!-- Profile Section -->
    <div class="mb-6 flex flex-col items-center gap-2 pt-2">
      <RouterLink to="/user" class="ios-pressable">
        <img
          v-if="uStore.me.avatar"
          :src="uStore.me.avatar"
          class="size-20 rounded-full object-cover shadow-sm"
          alt="我的头像"
        >
        <DefaultColorAvatar v-else class="size-20 text-2xl shadow-sm">
          U
        </DefaultColorAvatar>
      </RouterLink>
      <RouterLink to="/user" class="text-sm text-$ios-blue">
        编辑头像
      </RouterLink>
    </div>

    <!-- Appearance -->
    <div class="mb-6">
      <div class="px-4 pb-1.5 text-13px text-$ios-secondary-label">
        外观
      </div>
      <div class="overflow-hidden rounded-$ios-radius-md bg-$ios-card-bg">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="size-7 flex items-center justify-center rounded-md bg-indigo-500 text-white">
              <div class="i-ri-contrast-2-line text-base" />
            </div>
            <span class="text-$ios-label">外观</span>
          </div>
        </div>
        <!-- iOS Segmented Control -->
        <div class="px-4 pb-3">
          <div class="flex rounded-lg bg-$ios-grouped-bg p-0.5">
            <button
              v-for="opt in appearanceOptions"
              :key="opt.value"
              class="relative flex-1 rounded-md px-3 py-1.5 text-center text-13px font-medium transition-all duration-200"
              :class="appearanceMode === opt.value
                ? 'bg-$ios-card-bg text-$ios-label shadow-sm'
                : 'text-$ios-secondary-label'"
              @click="appearanceMode = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div class="mb-6">
      <div class="px-4 pb-1.5 text-13px text-$ios-secondary-label">
        投稿
      </div>
      <div class="overflow-hidden rounded-$ios-radius-md bg-$ios-card-bg">
        <a
          :href="submitSheetUrl"
          target="_blank"
          class="flex items-center justify-between px-4 py-3 active:bg-black/5 dark:active:bg-white/5"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 flex items-center justify-center rounded-md bg-$ios-orange text-white">
              <div class="i-ri-file-list-3-line text-base" />
            </div>
            <span class="text-$ios-label">提交聊天记录</span>
          </div>
          <div class="flex items-center text-$ios-tertiary-label">
            <div class="i-ri-external-link-line text-sm" />
            <div class="i-ri-arrow-right-s-line text-lg text-$ios-separator" />
          </div>
        </a>
      </div>
    </div>

    <!-- Help -->
    <div class="mb-6">
      <div class="px-4 pb-1.5 text-13px text-$ios-secondary-label">
        帮助
      </div>
      <div class="overflow-hidden rounded-$ios-radius-md bg-$ios-card-bg">
        <button
          class="w-full flex items-center justify-between px-4 py-3 active:bg-black/5 dark:active:bg-white/5"
          @click="openGuide"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 flex items-center justify-center rounded-md bg-$ios-teal text-white">
              <div class="i-ri-questionnaire-line text-base" />
            </div>
            <span class="text-$ios-label">使用说明</span>
          </div>
          <div class="i-ri-arrow-right-s-line text-lg text-$ios-separator" />
        </button>
      </div>
    </div>

    <!-- About -->
    <div class="mb-6">
      <div class="px-4 pb-1.5 text-13px text-$ios-secondary-label">
        关于
      </div>
      <div class="overflow-hidden rounded-$ios-radius-md bg-$ios-card-bg">
        <RouterLink
          to="/about"
          class="flex items-center justify-between px-4 py-3 active:bg-black/5 dark:active:bg-white/5"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 flex items-center justify-center rounded-md bg-$ios-blue text-white">
              <div class="i-ri-information-line text-base" />
            </div>
            <span class="text-$ios-label">关于项目</span>
          </div>
          <div class="i-ri-arrow-right-s-line text-lg text-$ios-separator" />
        </RouterLink>
        <div class="ml-14 h-0.5px bg-$ios-separator" />
        <a
          href="https://github.com/YunYouJun/chat-generator"
          target="_blank"
          class="flex items-center justify-between px-4 py-3 active:bg-black/5 dark:active:bg-white/5"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 flex items-center justify-center rounded-md bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800">
              <div class="i-ri-github-fill text-base" />
            </div>
            <span class="text-$ios-label">GitHub</span>
          </div>
          <div class="flex items-center gap-1 text-$ios-tertiary-label">
            <span class="text-sm">YunYouJun</span>
            <div class="i-ri-arrow-right-s-line text-lg text-$ios-separator" />
          </div>
        </a>
        <div class="ml-14 h-0.5px bg-$ios-separator" />
        <a
          href="https://space.bilibili.com/1579790"
          target="_blank"
          class="flex items-center justify-between px-4 py-3 active:bg-black/5 dark:active:bg-white/5"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 flex items-center justify-center rounded-md bg-pink-500 text-white">
              <div class="i-ri-bilibili-line text-base" />
            </div>
            <span class="text-$ios-label">B 站</span>
          </div>
          <div class="flex items-center gap-1 text-$ios-tertiary-label">
            <span class="text-sm">云游君</span>
            <div class="i-ri-arrow-right-s-line text-lg text-$ios-separator" />
          </div>
        </a>
      </div>
    </div>

    <!-- App Info -->
    <div class="flex flex-col items-center gap-1 pb-4 pt-2 text-$ios-tertiary-label">
      <p class="text-xs">
        v0.0.1 · {{ buildDate }}
        <a
          v-if="commitRef"
          :href="`https://github.com/YunYouJun/chat-generator/commit/${commitRef}`"
          target="_blank"
          class="text-$ios-blue"
        >{{ commitRef }}</a>
      </p>
    </div>
  </div>
</template>
