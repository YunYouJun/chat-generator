import { getQQAvatar } from '~~/packages/chat-ui/utils'

/**
 * fetchQQAvatar from internal API
 */
export async function fetchQQAvatar(qq: number) {
  const base64 = await $fetch('/api/qq/avatar', {
    query: {
      url: getQQAvatar({
        qq,
      }),
    },
  })
  return base64
}
