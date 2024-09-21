import type { ChatDataSet } from '@yunlefun/chat-ui'
import { collectionTOC } from '~~/config'

export const DATASETS = [
  ...Object.entries(import.meta.glob<{
    default: ChatDataSet['sessions']
  }>('./csv/*.json', { eager: true }))
    .map(([key, value]) => {
      const id = key.slice('./csv/'.length, -'.json'.length)
      const toc = collectionTOC.find(toc => toc.id === id)
      return {
        ...toc,
        sessions: value.default,
      }
    }),
]
