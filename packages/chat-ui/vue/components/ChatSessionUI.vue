<script setup lang="ts">
import { toBlob, toJpeg, toPixelData, toPng, toSvg } from 'html-to-image'
import { copyImageToClipboard } from 'copy-image-clipboard'
import type { Options } from 'html-to-image/lib/types'
import type { ChatMember, ChatMessageItem, ChatSession } from '../../types'

const props = defineProps<{
  session: ChatSession
}>()

/**
 * get sender from id
 * @param message
 */
function getSender(message: ChatMessageItem): ChatMember | undefined {
  if (typeof message.sender === 'string') {
    return props.session.members.find(member => member.id === message.sender)
  }
  return message.sender
}

const sessionRef = ref<HTMLElement | null>(null)

const toPngOptions: Options = {
}

function copy() {
  const el = sessionRef.value
  if (!el) {
    return
  }
  toPng(el, toPngOptions)
    .then((dataUrl: string) => {
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
    })
}
</script>

<template>
  <div ref="sessionRef" class="w-375px flex flex-col gap-4 rounded-lg bg-#111 p-6">
    <QqChatBubble
      v-for="(message, i) in session.messages"
      :key="i"
      :sender="getSender(message)"
      :message="message"
    />
  </div>

  <div class="w-full flex rounded">
    <button class="flex-1 bg-black p-2 hover:bg-#111" @click="copy">
      COPY
    </button>
    <button class="flex-1 bg-black p-2 hover:bg-#111" @click="download">
      DOWNLOAD
    </button>
  </div>
</template>
