<script setup lang="ts">
import { getQQAvatar } from '~~/packages/chat-ui/utils'

const props = defineProps<{
  qq?: number
  avatar?: string
  nickname?: string
}>()

const emit = defineEmits<{
  'update:qq': [qq: number]
  'update:avatar': [avatar: string]
}>()

const qqAvatar = ref<string>('')

/**
 * Query QQ avatar
 * @param qq
 */
async function queryQQAvatar(qq: number) {
  const base64 = await $fetch('/api/qq/avatar', {
    query: {
      url: getQQAvatar({
        qq,
      }),
    },
  })
  qqAvatar.value = typeof base64 === 'string' ? base64 : ''

  emit('update:avatar', qqAvatar.value)
}

const iAvatar = computed(() => {
  return props.avatar || qqAvatar.value
})

/**
 * Update QQ
 * @param event
 */
function updateQQ(event: Event) {
  emit('update:qq', Number((event.target as HTMLInputElement).value))
}

onMounted(() => {
  if (props.qq) {
    queryQQAvatar(props.qq)
  }
})
</script>

<template>
  <div class="inline-flex flex-col items-center justify-center gap-2">
    <div class="size-16 rounded-full" @click="queryQQAvatar(qq || 0)">
      <img v-if="iAvatar" :src="iAvatar" alt="avatar" class="size-16 rounded-full">
      <div v-else class="size-16 rounded-full bg-gray" />
    </div>

    <div class="text-black/60 dark:text-white">
      {{ nickname }}
    </div>

    <div class="flex gap-2">
      <input
        class="w-30 border rounded bg-transparent p-2 text-sm text-black/60 shadow focus:border-dark outline-none!"
        dark="text-white border-white/60 focus:border-white"
        type="number"
        :value="qq" @input="updateQQ"
        @keyup.enter="queryQQAvatar(qq || 0)"
      >
      <!-- <div
        class="size-10 flex cursor-pointer items-center justify-center gap-1 rounded-full bg-blue p-2"
        @click="queryQQAvatar(qq)"
      >
        <div class="text-white" i-ri-qq-fill />
      </div> -->
    </div>
  </div>
</template>
