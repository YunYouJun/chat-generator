import type { ChatMessageItem } from '~~/packages/chat-ui'

export * from './define'

/**
 * Parse a QA message to a list of chat messages.
 * Q: Hello?
 * A: World!
 */
export function parseQAMessage(qaMessage: string) {
  const messages = qaMessage.split('\n')
  const parsedMessages: ChatMessageItem[] = []
  messages.forEach((message) => {
    const prefix = message.split(': ')[0]
    const content = message.replace(`${prefix}: `, '')
    if (!prefix)
      return
    const sender: ChatMessageItem['sender'] = prefix.startsWith('A') ? { type: 'user' } : undefined
    let parsedMsg: ChatMessageItem = { content: '' }
    if (!sender) {
      message = message.replace(/^Q:? ?/, '')
      parsedMsg = { content }
    }
    else {
      message = message.replace(/^A:? ?/, '')
      parsedMsg = { content, sender }
    }

    // banned
    if (prefix.endsWith('!')) {
      parsedMsg.banned = true
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
