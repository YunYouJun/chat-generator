<script setup lang="ts">
import { jokerChatDataSet } from '~~/packages/datasets'
</script>

<template>
  <div class="flex flex-wrap gap-8">
    <div
      v-for="(session, i) in jokerChatDataSet.sessions"
      :key="i"
    >
      <ChatSessionUI
        :session="session"
      />
    </div>
  </div>
</template>
