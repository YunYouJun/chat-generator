import { defineSession } from '../../utils'

export default defineSession({
  id: 5,
  name: '互删',
  members: [],
  messages: [
    { content: '喜欢你有错吗', sender: { type: 'user' } },
    { content: '😅' },
    { content: '要么闭嘴，要么互删' },
    { content: '对不起，我不说了', sender: { type: 'user' } },
  ],
})
