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

/**
 * Query QQ avatar
 * @param qq
 */
async function queryQQAvatar(qq: number | {
  name: string
  qq: number
}) {
  let curQQ = qq
  if (typeof qq === 'object') {
    curQQ = qq.qq
  }
  else {
    curQQ = qq
  }
  const base64 = await fetchQQAvatar(curQQ)
  qqAvatar.value = typeof base64 === 'string' ? base64 : ''

  avatar.value = qqAvatar.value

  uStore.addUser({
    qq: curQQ,
    avatar: qqAvatar.value,
  })
}

const iAvatar = computed(() => {
  return avatar.value || customAvatar.value || qqAvatar.value
})

const uploadAvatarInput = ref<HTMLInputElement | null>(null)
/**
 * Upload avatar
 * file input
 */
function uploadAvatar() {
  uploadAvatarInput.value?.click()

  uploadAvatarInput.value?.addEventListener('change', async () => {
    const file = uploadAvatarInput.value?.files?.[0]
    if (file) {
      // to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result as string)
        }
        reader.readAsDataURL(file)
      })
      customAvatar.value = base64

      avatar.value = customAvatar.value
      qq.value = 0
    }
  })
}

onMounted(() => {
  if (qq.value) {
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
      <div v-else class="size-16 rounded-full bg-gray" />
      <input
        ref="uploadAvatarInput" type="file" class="hidden"
        accept="image/*"
        @change="uploadAvatar"
      >
      <div
        class="upload-avatar-handler absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white text-shadow op-0 transition"
      >
        <div i-ri:upload-2-line />
      </div>
    </div>

    <div class="text-black/60 dark:text-white">
      {{ nickname }}
    </div>

    <div class="flex flex-col gap-2">
      <div class="relative flex items-center justify-center gap-2">
        <!-- <input
          class="w-31 border rounded bg-transparent p-2 text-sm text-black/60 shadow focus:border-dark outline-none!"
          dark="text-white border-white/60 focus:border-white"
          type="number"
          :value="qq" placeholder="输入QQ号查询"
          @input="updateQQ"
          @keyup.enter="queryQQAvatar(qq || 0)"
        > -->
        <Select
          :model-value="qq"
          editable
          type="number"
          :options="uStore.previousUsers"
          option-label="qq"
          option-value="qq"
          placeholder="输入/选择 QQ 号查询"
          class="w-full text-xs"
          @update:model-value="(val) => {
            qq = Number(val)
          }"
          @blur="queryQQAvatar(qq || 0)"
          @keyup.enter="queryQQAvatar(qq || 0)"
        >
          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <img
                class="size-6 rounded-full"
                :alt="slotProps.option.qq"
                :src="slotProps.option.avatar"
              >
              <div>{{ slotProps.option.qq }}</div>

              <div
                class="absolute right-2 op-80 hover:op-100"
                i-ri-close-circle-line
                @click.prevent.stop="uStore.removeUser(slotProps.option)"
              />
            </div>
          </template>
        </Select>
      </div>

      <button
        class="flex items-center justify-center gap-2 rounded p-2 text-xs shadow"
        border="~ dark:gray"
        hover="bg-blue-500 text-white"
        active="bg-blue-600"
        @click="queryQQAvatar(qq || 0)"
      >
        <div class="cursor-pointer" i-ri:qq-line />
        <span class="flex items-center justify-center gap-1">
          <span>获取</span>
          <!-- <div i-ri:qq-fill /> -->
          QQ
          <span>头像</span>
        </span>
      </button>

      <!-- <div
        class="size-10 flex cursor-pointer items-center justify-center gap-1 rounded-full bg-blue p-2"
        @click="queryQQAvatar(qq)"
      >
        <div class="text-white" i-ri-qq-fill />
      </div> -->
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
