export interface ChatDataSet {
  id: string
  name: string
  /**
   * 会话合集
   */
  sessions: ChatSession[]
}

// 一次完整的会话

export interface ChatMember {
  /**
   * 发送者ID
   *
   */
  id?: string
  /**
   * 发送者 QQ
   * https://q1.qlogo.cn/g?b=qq&nk=910426929&s=100
   */
  qq?: number
  /**
   * 头衔
   * @external for QQ
   */
  title?: string
  /**
   * 用户昵称
   */
  nickname?: string
  /**
   * 用户头像
   */
  avatar?: string
  /**
   * 发送者类型
   * @default 'user'
   */
  type?: 'user' | 'system'
}

/**
 * 会话
 */
export interface ChatSession {
  /**
   * 会话ID
   */
  id?: string
  /**
   * 会话名称
   */
  name?: string
  /**
   * 会话成员
   */
  members: ChatMember[]
  /**
   * 会话消息
   */
  messages: ChatMessageItem[]
}

export interface ChatMessageItem {
  /**
   * 消息 ID
   */
  id?: string
  /**
   * 发送者 ID
   * 传入字符串时，会直接使用字符串作为 ID（传入 ID 时，会从传入的用户列表中查找）
   */
  sender?: ChatMember | string
  /**
   * 消息内容
   */
  content: string
  /**
   * 消息时间
   */
  time?: Date | string
  /**
   * 消息类型
   * @default 'text'
   */
  type?: 'text' | 'image'
}
