import { getQQAvatar } from '~~/packages/chat-ui'

/**
 * Fetch QQ avatar base64 from server API
 */
export async function fetchQQAvatar(qq: number) {
  const url = getQQAvatar({ qq })
  try {
    return await $fetch('/api/qq/avatar', {
      query: { url },
    })
  }
  catch (err) {
    console.error('[fetchQQAvatar] failed for QQ:', qq, err)
    return ''
  }
}
