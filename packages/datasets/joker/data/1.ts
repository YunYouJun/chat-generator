import { defineSession } from '../../utils'

export default defineSession({
  id: 1,
  title: '给你几个吃的就喜欢你？',
  members: [],
  messages: [
    {
      content: '那样，一直把你吊着或者耽误着你。我们还是可以继续为自己的生活而努力，不一定是要因为某个人某件事，你说呢？是吗？',
    },
    {
      content: '真的不行吗',
      sender: { type: 'user' },
    },
    {
      content: '可明明你日常也对我很好的啊',
      sender: { type: 'user' },
    },
    {
      content: '你也太自作多情了吧，给你几个吃的就喜欢你？',
    },
  ],
})
