<script setup lang="ts">
import { collections } from '~/config'

definePageMeta({
  layout: 'home',
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/noto:left-speech-bubble.svg',
    },
  ],
})

const { checkFirstVisit } = useGuide()

const CHAT_BASE_WIDTH = 375

const previewContainerRef = ref<HTMLElement | null>(null)

function updatePreviewScales() {
  const containers = document.querySelectorAll('.preview-container')
  containers.forEach((el) => {
    const containerWidth = el.clientWidth
    const scale = containerWidth / CHAT_BASE_WIDTH
    ;(el as HTMLElement).style.setProperty('--preview-scale', String(scale))
  })
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  checkFirstVisit()
  updatePreviewScales()
  resizeObserver = new ResizeObserver(() => {
    updatePreviewScales()
  })
  const containers = document.querySelectorAll('.preview-container')
  containers.forEach(el => resizeObserver!.observe(el))
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <div class="px-4 py-3">
    <!-- iOS style grid -->
    <div class="grid grid-cols-2 gap-3 sm:(grid-cols-3 gap-4)">
      <RouterLink
        v-for="(dataset, key) in collections"
        :key="key"
        :to="`/dataset/${key}`"
        class="ios-pressable"
      >
        <div class="overflow-hidden rounded-$ios-radius-lg bg-$ios-card-bg shadow-sm">
          <!-- Preview area -->
          <div ref="previewContainerRef" class="preview-container relative h-28 overflow-hidden bg-$c-bg-chat sm:h-48">
            <div v-if="dataset.sessions[0]" class="pointer-events-none absolute left-0 top-0 origin-top-left" :style="{ width: `${CHAT_BASE_WIDTH}px`, transform: `scale(var(--preview-scale, 0.48))` }">
              <ChatSessionUI :session="dataset.sessions[0]" />
            </div>
            <div v-else class="h-full flex items-center justify-center text-$ios-tertiary-label">
              <div class="i-ri-chat-3-line text-3xl" />
            </div>
            <!-- Gradient fade -->
            <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-$ios-card-bg to-transparent" />
          </div>
          <!-- Label -->
          <div class="flex items-center gap-1.5 px-3 pb-2.5 pt-2">
            <span class="text-lg leading-none">{{ dataset.emoji }}</span>
            <span class="text-13px font-semibold tracking-tight text-$ios-label">{{ dataset.name }}</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
