import type { ChatDataSet, ChatSession } from '@yunlefun/chat-ui'

export const jokerChatDataSet: ChatDataSet = {
  id: 'joker',
  name: 'Joker',
  sessions: [
    ...Object.values(import.meta.glob<{
      default: ChatSession
    }>('./data/*.ts', { eager: true }))
      .map(session => session.default),
  ],
}
