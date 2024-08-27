import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { ChatMember } from '~~/packages/chat-ui'

export const useJokerStore = defineStore('joker', () => {
  const joker = useStorage<ChatMember>('cg:joker:joker', {
    qq: 910426929,
  })
  const tower = useStorage<ChatMember>('cg:joker:tower', {
    qq: undefined,
  })

  return {
    joker,
    tower,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useJokerStore, import.meta.hot))
