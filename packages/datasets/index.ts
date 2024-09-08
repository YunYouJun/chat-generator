import type { ChatDataSet } from '@yunlefun/chat-ui'

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
