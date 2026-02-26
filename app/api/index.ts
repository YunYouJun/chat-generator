import { getQQAvatar } from '~~/packages/chat-ui'

/**
 * Fetch QQ avatar base64 from server API
 */
export async function fetchQQAvatar(qq: number) {
  const url = getQQAvatar({ qq })
  return $fetch('/api/qq/avatar', {
    query: { url },
  })
}
