<script setup lang="ts">
import { submitSheetUrl } from '../config'
</script>

<template>
  <div class="mx-4 flex justify-center rounded-xl bg-$ios-card-bg p-3 shadow-sm">
    <a
      class="flex items-center justify-center gap-2 text-sm text-$ios-blue transition active:opacity-60"
      :href="submitSheetUrl" target="_blank" alt="投稿表格"
    >
      <div class="i-vscode-icons:file-type-excel" />
      <span>投稿表格</span>
      <div i-ri-external-link-line class="text-xs" />
    </a>
  </div>
</template>
