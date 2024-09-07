import type { ChatMember, ChatMessageItem, ChatSession } from '~~/packages/chat-ui'

export function defineSession(session: ChatSession) {
  return session
}

/**
 * Parse a QA message to a list of chat messages.
 * Q: Hello?
 * A: World!
 */
export function parseQAMessage(qaMessage: string) {
  const messages = qaMessage.split('\n')
  const parsedMessages: ChatMessageItem[] = []
  messages.forEach((message) => {
    const sender: ChatMessageItem['sender'] = message.startsWith('A:') ? { type: 'user' } : undefined
    if (!sender) {
      message = message.replace(/^Q:? ?/, '')
      parsedMessages.push({ content: message })
    }
    else {
      message = message.replace(/^A:? ?/, '')
      parsedMessages.push({ content: message, sender })
    }
  })
  return parsedMessages
}
