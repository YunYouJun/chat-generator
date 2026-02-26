<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="flex flex-col items-center justify-center px-4 py-16 text-center">
    <div class="mb-6 text-5xl text-$ios-secondary-label">
      <div i-ri-chat-2-line />
    </div>
    <h3 class="my-2 text-6xl text-$ios-label font-thin tracking-tight">
      404
    </h3>
    <p class="mb-8 text-$ios-secondary-label">
      还没有找到新的聊天记录
    </p>
    <button
      class="btn"
      @click="router.push('/')"
    >
      返回主页
    </button>
  </main>
</template>
