import { useStorage } from '@vueuse/core'
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

export const useUserStore = defineStore('user', () => {
  const route = useRoute()
  const meQQ = Number.parseInt(route.query.meQQ as string | '910426929')
  const sheQQ = Number.parseInt(route.query.sheQQ as string)

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

  // init
  if (meQQ)
    me.value.qq = meQQ
  if (sheQQ)
    she.value.qq = sheQQ

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

    exchange,
    isExchanged,

    copyLink,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

// /**
//  * Current named of the user.
//  */
// const savedName = ref('')
// const previousNames = ref(new Set<string>())

// const usedNames = computed(() => Array.from(previousNames.value))
// const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

// /**
//  * Changes the current name of the user and saves the one that was used
//  * before.
//  *
//  * @param name - new name to set
//  */
// function setNewName(name: string) {
//   if (savedName.value)
//     previousNames.value.add(savedName.value)

//   savedName.value = name
// }
