import { defineSession } from '../../utils'

export default defineSession({
  id: 2,
  name: '月色真美',
  members: [],
  messages: [
    {
      content: '可以和我说一句月色真美吗',
    },
    {
      content: '月色真美',
      sender: { type: 'user' },
    },
    {
      content: '你是真丑',
    },
  ],
})
