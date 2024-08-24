<script setup lang="ts">
import { jokerChatDataSet } from '~~/packages/datasets'
</script>

<template>
  <div class="flex gap-8">
    <template
      v-for="(session, i) in jokerChatDataSet.sessions"
      :key="i"
    >
      <ChatSessionUI
        :session="session"
      />
    </template>
  </div>
</template>
