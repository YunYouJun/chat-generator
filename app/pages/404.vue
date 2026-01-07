<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main p="x4 y10" text="center dark-600 dark:gray-200">
    <div text-4xl>
      <div i-ri-chat-2-line inline-block />
    </div>
    <h3 class="my-4 text-8xl font-thin">
      404
    </h3>
    <div>
      还没有找到新的聊天记录
    </div>
    <div>
      <button btn text-sm m="3 t8" p="y-2 x-3" @click="router.push('/')">
        返回主页
      </button>
    </div>
  </main>
</template>
