import type { ChatDataSet, ChatMessageItem } from '@yunlefun/chat-ui'

export * from './joker'
export const DATASETS = [
  ...Object.entries(import.meta.glob<{
    default: ChatDataSet['sessions']
  }>('./csv/*.json', { eager: true }))
    .map(([key, value]) => {
      return {
        id: key.slice('./csv/'.length, -'.json'.length),
        sessions: value.default,
      }
    }),
]
