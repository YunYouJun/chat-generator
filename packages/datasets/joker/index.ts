import type { ChatDataSet } from '@yunlefun/chat-ui'
import jokerData from '../csv/joker.json'

export const jokerChatDataSet: ChatDataSet = {
  id: 'joker',
  emoji: '🤡',
  name: 'Joker',
  sessions: [
    // ...Object.values(import.meta.glob<{
    //   default: ChatSession
    // }>('./data/*.ts', { eager: true }))
    //   .map(session => session.default),
    ...jokerData,
  ],
}
