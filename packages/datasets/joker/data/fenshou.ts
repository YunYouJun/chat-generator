import { defineSession } from '../../utils'

export default defineSession({
  id: 'fenshou',
  name: '分手',
  members: [],
  messages: [
    {
      content: '我是他家长，你就是他女朋友吧。你不要狡辩，我已经和他班主任打听过你了，我真的不知道你怎么想的怎么会选择跟他在一起，劝你一句不要在他一个皮物身上浪费时回。就他长得这样怪不得只会整天抱着个手机找网上的朋友，脾气烂的要死一点就炸，说一句动不动就吵家里的财气都被他作没了，我真不知道我生他出来于嘛，不知道这样的男人你以后嫁给他干什么。你真是睛了眼跟他在一起，我劝你们赶紧分手，他这辈子都是娶不到老婆的料。',
      sender: { type: 'user' },
    },
    { content: '谢谢您' },
    { content: '？', sender: { type: 'user' } },
    { content: '谢谢您告诉了我他自卑的源头' },
    { content: '我是不会跟他分手的' },
    { content: '你们不爱他，我替你们爱他' },
  ],
})
