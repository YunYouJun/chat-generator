import { defineSession } from '../../utils'

export default defineSession({
  id: 6,
  title: '你也要去吗',
  members: [],
  messages: [
    { content: '明天下午两点叭' },
    { content: '买好啦 买了你经常坐的五排六七座', sender: { type: 'user' } },
    { content: '啊 你也要去吗' },
  ],
})
