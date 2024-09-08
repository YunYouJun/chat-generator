import { collectionTOC } from '~~/config'
import type { ChatSession } from '~~/packages/chat-ui'

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
  item.sessions = getDataSetById(item.id)?.sessions || []
  collections[item.id] = item as any
})
