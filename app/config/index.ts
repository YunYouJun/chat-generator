import type { ChatSession } from '~~/packages/chat-ui'
import { collectionTOC } from '~~/config'

/**
 * 投稿表格地址
 */
export const submitSheetUrl = 'https://yunlefun.feishu.cn/wiki/CP3LwoFW8idLg9kmTxhcPuLSnBf?sheet=6a7dc9'

export const collections: Record<string, {
  id: string
  name: string
  emoji: string
  sessions: ChatSession[]
}> = {}

collectionTOC.forEach((item) => {
  const sessions = getDataSetById(item.id)?.sessions || []
  collections[item.id] = {
    id: item.id,
    name: item.name || item.id,
    emoji: item.emoji || '',
    sessions,
  }
})
