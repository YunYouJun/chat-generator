<script setup lang="ts">
import type { Options } from 'html-to-image/lib/types'
import type { ChatMember, ChatMessageItem, ChatSession } from '../../types'
import { convertMessagesToQAText, parseQAMessage } from '~~/packages/datasets/utils'

import { copyImageToClipboard } from 'copy-image-clipboard'
import { toPng } from 'html-to-image'
import { useToast } from 'primevue/usetoast'
import { A_AVATAR_SYMBOL, Q_AVATAR_SYMBOL } from '../constants'

const props = defineProps<{
  session: ChatSession
  /**
   * show action buttons
   */
  showAction?: boolean

  /**
   * Q avatar
   * other avatar
   */
  qAvatar?: string
  /**
   * A avatar
   * self avatar
   */
  aAvatar?: string
}>()

// provide for bubble
provide(Q_AVATAR_SYMBOL, computed(() => props.qAvatar || ''))
provide(A_AVATAR_SYMBOL, computed(() => props.aAvatar || ''))

/**
 * get sender from id
 * @param message
 */
function getSender(message: ChatMessageItem): ChatMember | undefined {
  if (typeof message.sender === 'string') {
    return props.session.members?.find(member => member.id === message.sender)
  }
  return message.sender
}

const sessionRef = ref<HTMLElement | null>(null)
const parsedQAMessages = computed(() => {
  if (typeof props.session.messages === 'string') {
    return parseQAMessage(props.session.messages)
  }
  return props.session.messages
})

const toPngOptions: Options = {}

const toast = useToast()
/**
 * copy image
 */
function copyImage() {
  const el = sessionRef.value
  if (!el) {
    return
  }
  toPng(el, toPngOptions)
    .then((dataUrl: string) => {
      toast.add({
        severity: 'success',
        summary: '拷贝成功',
        detail: '已将图片拷贝到剪贴板',
        life: 3000,
      })
      copyImageToClipboard(dataUrl)
    })
}

const { copy } = useClipboard()
/**
 * copy text
 * @example
 * Q: Hello!
 * A: Hi!
 */
function copyText() {
  const el = sessionRef.value
  if (!el) {
    return
  }

  const qaText = convertMessagesToQAText(parsedQAMessages.value)
  copy(qaText)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: '拷贝成功',
        detail: '已将文本拷贝到剪贴板',
        life: 3000,
      })
    })
}

function download() {
  const el = sessionRef.value
  if (!el) {
    return
  }
  toPng(el, toPngOptions)
    .then((dataUrl: string) => {
      const a = document.createElement('a')
      a.href = dataUrl
      const filename = `${props.session.id || props.session.title || 'joker'}-chat-generator.png`
      a.download = filename
      a.click()

      toast.add({
        severity: 'success',
        summary: '下载成功',
        detail: '已下载图片',
        life: 3000,
      })
    })
}

const router = useRouter()
const uStore = useUserStore()
function custom() {
  const qaText = convertMessagesToQAText(parsedQAMessages.value)
  uStore.sessionText = qaText
  router.push({
    path: '/user',
  })
}
</script>

<template>
  <div
    ref="sessionRef"
    class="chat-session-ui w-full flex flex-col gap-4 bg-#f2f2f2 p-6"
    dark="bg-#111"
  >
    <QqChatBubble
      v-for="(message, i) in parsedQAMessages"
      :key="i"
      :sender="getSender(message)"
      :message="message"
    />
  </div>

  <div v-if="showAction" class="mt-1 w-full flex gap-1 rounded">
    <CGButton @click="copyImage">
      <div i-ri:image-line />
    </CGButton>
    <CGButton @click="copyText">
      <div i-ri:file-copy-2-line />
    </CGButton>
    <CGButton @click="download">
      <div i-ri:download-2-line />
    </CGButton>
    <CGButton @click="custom">
      <div i-ri:settings-line />
    </CGButton>
  </div>
</template>
