import { defineSession } from '../utils'

export default defineSession({
  id: 'chidejiuxihuanni',
  title: 'Example',
  members: [
    {
      id: 'joker',
      nickname: 'Joker',
      type: 'user',
    },
    {
      id: 'tower',
      nickname: '塔',
      type: 'system',
    },
  ],
  messages: [
    {
      content: 'Hello!',
      time: new Date(),
      sender: 'joker',
    },
    {
      content: 'World!',
      time: new Date(),
      sender: 'tower',
    },
    {
      content: 'Ping',
      time: new Date(),
      sender: 'joker',
    },
    {
      content: 'Pong',
      time: new Date(),
      sender: 'tower',
    },
  ],
})
