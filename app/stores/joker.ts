import type { ChatMember } from '~~/packages/chat-ui'
import { useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useJokerStore = defineStore('joker', () => {
  const route = useRoute()
  const jokerQQ = Number.parseInt(route.query.jokerQQ as string | '910426929')
  const towerQQ = Number.parseInt(route.query.towerQQ as string)

  const joker = useStorage<ChatMember>('cg:joker:joker', {
    qq: jokerQQ,
  })
  const tower = useStorage<ChatMember>('cg:joker:tower', {
    qq: towerQQ,
  })

  return {
    joker,
    tower,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useJokerStore, import.meta.hot))
