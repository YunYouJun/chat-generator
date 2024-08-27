import { defineSession } from '../../utils'

export default defineSession({
  id: 4,
  name: '我也想要男朋友',
  members: [],
  messages: [
    { content: '我也想要男朋友' },
    { content: '我来', sender: { type: 'user',  } },
    { content: '😭' },
    { content: '除了你' },
    { content: '🙁' },
  ],
})
