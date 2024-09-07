<script setup lang="ts">
import { submitSheetUrl } from '../config'
</script>

<template>
  <div class="w-full flex justify-center bg-black/5 p-4 shadow">
    <a
      class="flex items-center justify-center gap-1 hover:underline"
      :href="submitSheetUrl" target="_blank" alt="投稿表格"
    >
      <div class="i-vscode-icons:file-type-excel" />
      <span class="op-80">投稿表格</span>
    </a>
  </div>
</template>
