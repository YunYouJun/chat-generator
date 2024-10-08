import { defineSession } from '../../utils'

export default defineSession({
  id: 3,
  title: '多喝热水',
  members: [],
  messages: [
    { content: '多喝点温热的水', sender: { type: 'user' } },
    { content: '早晚天气比较冷 衣服一定要注意', sender: { type: 'user' } },
    { content: '早上可以喝一杯热牛奶', sender: { type: 'user' } },
    { content: '换季的时候是容易感冒', sender: { type: 'user' } },
    { content: '是我没有照顾好你', sender: { type: 'user' } },
    { content: '不是 是昨晚给别人口了' },
  ],
})
