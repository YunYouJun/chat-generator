<script setup lang="ts">
import { toPng } from 'html-to-image'
import { copyImageToClipboard } from 'copy-image-clipboard'
import type { Options } from 'html-to-image/lib/types'

import { useToast } from 'primevue/usetoast'
import type { ChatMember, ChatMessageItem, ChatSession } from '../../types'

const props = defineProps<{
  session: ChatSession
  /**
   * show action buttons
   */
  showAction?: boolean

  /**
   * self avatar
   */
  selfAvatar?: string
  /**
   * other avatar
   */
  otherAvatar?: string
}>()

/**
 * get sender from id
 * @param message
 */
function getSender(message: ChatMessageItem): ChatMember | undefined {
  if (typeof message.sender === 'string') {
    return props.session.members.find(member => member.id === message.sender)
  }

  if (props.selfAvatar && message.sender?.type === 'user') {
    message.sender.avatar = props.selfAvatar
  }
  else if (props.otherAvatar) {
    if (message.sender) {
      message.sender.avatar = props.otherAvatar
    }
    else {
      message.sender = {
        avatar: props.otherAvatar,
      }
    }
  }
  return message.sender
}

const sessionRef = ref<HTMLElement | null>(null)

const toPngOptions: Options = {}

const toast = useToast()
function copy() {
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

function download() {
  const el = sessionRef.value
  if (!el) {
    return
  }
  toPng(el, toPngOptions)
    .then((dataUrl: string) => {
      const a = document.createElement('a')
      a.href = dataUrl
      const filename = `${props.session.id || props.session.name || 'joker'}-chat-generator.png`
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
</script>

<template>
  <div
    ref="sessionRef"
    class="chat-session-ui w-full flex flex-col gap-4 bg-#f2f2f2 p-6"
    dark="bg-#111"
  >
    <QqChatBubble
      v-for="(message, i) in session.messages"
      :key="i"
      :sender="getSender(message)"
      :message="message"
    />
  </div>

  <div v-if="showAction" class="mt-1 w-full flex gap-1 rounded">
    <CGButton @click="copy">
      <div i-ri:file-copy-2-line />
    </CGButton>
    <CGButton @click="download">
      <div i-ri:download-2-line />
    </CGButton>
  </div>
</template>
