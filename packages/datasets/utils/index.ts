import type { ChatMessageItem } from '~~/packages/chat-ui'

export * from './define'

/**
 * Parse a QA message to a list of chat messages.
 * Q: Hello?
 * A: World!
 * Q(美少女): 你好？
 * A(小楚南): 世界！
 */
export function parseQAMessage(qaMessage: string) {
  const messages = qaMessage.split('\n')
  const parsedMessages: ChatMessageItem[] = []
  messages.forEach((message) => {
    // 从 Q(): 解析出 sender 昵称
    // 从 A(): 解析出 sender 昵称

    const sender: ChatMessageItem['sender'] = {}
    const parsedMsg: ChatMessageItem = { content: message, sender }

    const firstChar = message[0] || ''
    if (['Q', 'A', 'T'].includes(firstChar)) {
      switch (firstChar) {
        case 'Q':
          sender.type = 'friend'
          break
        case 'A':
          sender.type = 'user'
          break
          // 时间戳
        case 'T':
          sender.type = 'system'
          parsedMsg.content = message.slice('T: '.length)
          break
      }
      message = message.slice(1)
      let [prefix, ...contentArr] = message.split(': ')
      // 还原 content
      const content = contentArr.join(': ')
      // banned
      if (prefix?.endsWith('!')) {
        prefix = prefix.slice(0, -1)
        parsedMsg.banned = true
      }
      // 从 (nickname) 解析出 sender 昵称
      if (prefix && prefix.startsWith('(') && prefix.endsWith(')'))
        sender.nickname = prefix?.slice(1, -1)
      parsedMsg.content = content
    }

    parsedMessages.push(parsedMsg)
  })
  return parsedMessages
}

/**
 * Convert a list of chat messages to QA message text.
 */
export function convertMessagesToQAText(messages: ChatMessageItem[]) {
  return messages.map((message) => {
    if (typeof message.sender === 'object' && message.sender.type === 'user') {
      return `A${
        message.banned ? '!' : ''
      }: ${message.content}`
    }
    return `Q: ${message.content}`
  }).join('\n')
}
