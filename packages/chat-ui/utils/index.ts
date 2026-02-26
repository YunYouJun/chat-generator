/**
 * Get QQ avatar URL
 * Note: q1.qlogo.cn is unavailable due to TLS restrictions,
 * using qlogo2.store.qq.com as alternative.
 */
export function getQQAvatar(params: {
  qq: number
  size?: number
}) {
  return `https://qlogo2.store.qq.com/qzone/${params.qq}/${params.qq}/${params.size || 100}`
}
