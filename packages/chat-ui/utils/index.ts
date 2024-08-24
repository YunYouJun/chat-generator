export function getQQAvatar(params: {
  qq: number
  size?: number
}) {
  return `https://q1.qlogo.cn/g?b=qq&nk=${params.qq}&s=${params.size || 100}`
}
