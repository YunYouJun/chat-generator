import { useStorage } from '@vueuse/core'

const hasSeenGuide = useStorage('cg:guide:seen', false)
const showGuide = ref(false)

export function useGuide() {
  function openGuide() {
    showGuide.value = true
  }

  function closeGuide() {
    showGuide.value = false
    hasSeenGuide.value = true
  }

  function checkFirstVisit() {
    if (!hasSeenGuide.value) {
      showGuide.value = true
    }
  }

  return {
    hasSeenGuide,
    showGuide,
    openGuide,
    closeGuide,
    checkFirstVisit,
  }
}
