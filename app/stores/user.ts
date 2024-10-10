import { useStorage } from '@vueuse/core'
import consola from 'consola'
import { acceptHMRUpdate, defineStore } from 'pinia'

export interface UserInfo {
  /**
   * QQ 号
   */
  qq?: number
  /**
   * 自定义头像
   */
  avatar?: string
}

export const rawSessionTextArr = [
  'A: Hello?',
  'Q: World!',
  'A!: Hello?',
]
export const rawSessionText = rawSessionTextArr.join('\n')

export const useUserStore = defineStore('user', () => {
  const route = useRoute()
  const meQQ = Number.parseInt(route.query.meQQ as string | '910426929')
  const sheQQ = Number.parseInt(route.query.sheQQ as string)

  // 历史设置过的 QQ
  const previousUsers = useStorage<UserInfo[]>('previous-qq', [])

  /**
   * 我
   */
  const me = useStorage<UserInfo>('cg:user:me', {
    qq: 0,
  })
  /**
   * 她/他
   */
  const she = useStorage<UserInfo>('cg:user:she', {
    qq: 0,
  })

  const sessionText = useStorage('cg:user:sessionText', rawSessionText)

  // init
  if (meQQ)
    me.value.qq = meQQ
  if (sheQQ)
    she.value.qq = sheQQ

  function addUser(user: UserInfo) {
    const pUser = previousUsers.value.find(u => u.qq === user.qq)
    if (pUser) {
      pUser.avatar = user.avatar
    }
    else {
      previousUsers.value.push(user)
    }
  }

  function removeUser(user: UserInfo) {
    consola.info('removeUser', user)
    consola.info(previousUsers.value.filter(u => u.qq !== user.qq))
    previousUsers.value = previousUsers.value.filter(u => u.qq !== user.qq)
  }

  const isExchanged = ref(false)
  /**
   * 立场交换
   */
  function exchange() {
    const rawShe = { ...she.value }
    she.value.qq = me.value.qq
    she.value.avatar = me.value.avatar
    me.value.qq = rawShe.qq
    me.value.avatar = rawShe.avatar

    isExchanged.value = !isExchanged.value
  }

  const { copy } = useClipboard()
  const toast = useToast()
  /**
   * 复制链接
   */
  function copyLink() {
    const url = new URL(window.location.href)
    url.searchParams.set('meQQ', me.value.qq?.toString() || '')
    url.searchParams.set('sheQQ', she.value.qq?.toString() || '')
    copy(url.toString()).then(() => {
      toast.add({
        severity: 'success',
        summary: '复制成功',
        detail: '已将链接复制到剪贴板',
        life: 3000,
      })
    })
  }

  return {
    me,
    she,
    sessionText,
    previousUsers,
    addUser,
    removeUser,

    exchange,
    isExchanged,

    copyLink,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
