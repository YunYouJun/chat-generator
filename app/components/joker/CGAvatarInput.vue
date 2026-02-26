<script setup lang="ts">
import { fetchQQAvatar } from '~/api'

defineProps<{
  nickname?: string
}>()

const qq = defineModel('qq', { type: Number })
const avatar = defineModel('avatar', { type: String })

const uStore = useUserStore()
const customAvatar = ref<string>('')
const qqAvatar = ref<string>('')

const qqInput = ref('')

async function queryQQAvatar(qqNum: number | {
  name: string
  qq: number
}) {
  let curQQ = qqNum
  if (typeof qqNum === 'object') {
    curQQ = qqNum.qq
  }
  const base64 = await fetchQQAvatar(curQQ as number)
  qqAvatar.value = typeof base64 === 'string' ? base64 : ''
  avatar.value = qqAvatar.value
  uStore.addUser({
    qq: curQQ as number,
    avatar: qqAvatar.value,
  })
}

const iAvatar = computed(() => {
  return avatar.value || customAvatar.value || qqAvatar.value
})

const uploadAvatarInput = ref<HTMLInputElement | null>(null)

function uploadAvatar() {
  uploadAvatarInput.value?.click()
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement)?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      customAvatar.value = reader.result as string
      avatar.value = customAvatar.value
      qq.value = 0
    }
    reader.readAsDataURL(file)
  }
}

function onSelectUser(user: { qq?: number, avatar?: string }) {
  if (user.qq) {
    qq.value = user.qq
    qqInput.value = user.qq.toString()
    queryQQAvatar(user.qq)
  }
}

function onInputSubmit() {
  const num = Number.parseInt(qqInput.value)
  if (num) {
    qq.value = num
    queryQQAvatar(num)
  }
}

const showDropdown = ref(false)

function onInputBlur() {
  setTimeout(() => showDropdown.value = false, 200)
}

onMounted(() => {
  if (qq.value) {
    qqInput.value = qq.value.toString()
    queryQQAvatar(qq.value)
  }
})
</script>

<template>
  <div class="inline-flex flex-col items-center justify-center gap-2">
    <div
      class="custom-avatar-wrapper relative size-16 cursor-pointer rounded-full"
      @click="uploadAvatar"
    >
      <img
        v-if="iAvatar" :src="iAvatar" alt="avatar"
        class="size-16 rounded-full object-cover object-center"
      >
      <div v-else class="size-16 rounded-full bg-gray-300 dark:bg-gray-600" />
      <input
        ref="uploadAvatarInput" type="file" class="hidden"
        accept="image/*"
        @change="onFileChange"
      >
      <div
        class="upload-avatar-handler absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white op-0 transition"
      >
        <div i-ri:upload-2-line />
      </div>
    </div>

    <div class="text-sm text-$ios-secondary-label">
      {{ nickname }}
    </div>

    <div class="flex flex-col gap-2">
      <div class="relative">
        <input
          v-model="qqInput"
          type="number"
          placeholder="QQ号"
          class="w-full rounded-lg border border-$ios-separator bg-$ios-card-bg px-3 py-2 text-xs outline-none transition focus:border-$ios-blue"
          @keyup.enter="onInputSubmit"
          @focus="showDropdown = true"
          @blur="onInputBlur"
        >
        <!-- Dropdown for previous users -->
        <div
          v-if="showDropdown && uStore.previousUsers.length"
          class="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl bg-$ios-card-bg shadow-lg"
        >
          <div
            v-for="user in uStore.previousUsers"
            :key="user.qq"
            class="flex items-center gap-2 px-3 py-2 text-xs transition active:bg-black/5 dark:active:bg-white/5"
            @mousedown.prevent="onSelectUser(user)"
          >
            <img
              v-if="user.avatar"
              class="size-5 rounded-full"
              :src="user.avatar"
            >
            <span>{{ user.qq }}</span>
            <div
              class="ml-auto text-$ios-red op-60 hover:op-100"
              i-ri-close-circle-line
              @mousedown.prevent.stop="uStore.removeUser(user)"
            />
          </div>
        </div>
      </div>

      <button
        class="ios-pressable flex items-center justify-center gap-2 rounded-lg border border-$ios-separator bg-$ios-card-bg p-2 text-xs shadow-sm"
        @click="onInputSubmit"
      >
        <div i-ri:qq-line class="text-$ios-blue" />
        <span>获取 QQ 头像</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.custom-avatar-wrapper {
  &:hover {
    .upload-avatar-handler {
      opacity: 1;
    }
  }
}
</style>
