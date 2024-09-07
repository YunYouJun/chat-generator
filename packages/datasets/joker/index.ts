import jokerData from '../csv/joker.json'
import { defineDataSet } from '../utils'

export const jokerChatDataSet = defineDataSet({
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
})
