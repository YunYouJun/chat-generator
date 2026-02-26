<template>
  <div class="px-4 py-4">
    <CurrentVersion />
    <div class="w-full flex items-center justify-center gap-2 text-xs text-$ios-secondary-label">
      <a
        class="flex items-center justify-center gap-1 transition active:opacity-60"
        href="https://github.com/YunYouJun"
        target="_blank"
      >
        <div i-ri:github-fill />
        <span>Code</span>
      </a>
      <span class="op-40">by</span>
      <a
        class="flex items-center justify-center gap-1 transition active:opacity-60"
        href="https://space.bilibili.com/1579790"
        target="_blank"
      >
        <div i-ri:bilibili-line class="text-pink-400" />
        <span>云游君</span>
      </a>
    </div>
  </div>
</template>
