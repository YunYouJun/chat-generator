import { ref } from 'vue'

export interface ToastMessage {
  severity?: 'success' | 'error' | 'info'
  summary?: string
  detail?: string
  life?: number
}

const toasts = ref<(ToastMessage & { id: number, visible: boolean })[]>([])
let toastId = 0

export function useIosToast() {
  function add(msg: ToastMessage) {
    const id = ++toastId
    const toast = { ...msg, id, visible: false }
    toasts.value.push(toast)

    requestAnimationFrame(() => {
      const t = toasts.value.find(t => t.id === id)
      if (t)
        t.visible = true
    })

    setTimeout(() => {
      close(id)
    }, msg.life || 3000)
  }

  function close(id: number) {
    const t = toasts.value.find(t => t.id === id)
    if (t)
      t.visible = false
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 300)
  }

  return { toasts, add, close }
}
