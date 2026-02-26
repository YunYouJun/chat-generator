<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/about').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
})
</script>

<template>
  <div class="mx-4 py-4">
    <ContentRenderer
      v-if="home"
      class="about-content markdown-body m-auto max-w-2xl rounded-$ios-radius-md bg-$ios-card-bg px-5 py-5 text-left shadow-sm prose md:px-8"
      :value="home"
    />
    <div v-else class="flex flex-col items-center justify-center py-20 text-center text-$ios-secondary-label">
      <div class="i-ri-file-text-line mb-3 text-4xl opacity-40" />
      <span class="text-15px">About not found</span>
    </div>
  </div>
</template>

<style scoped>
.about-content :deep(h1) {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-top: 0;
  margin-bottom: 12px;
}

.about-content :deep(h2) {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-top: 24px;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 0.5px solid var(--ios-separator);
}

.about-content :deep(p) {
  font-size: 15px;
  line-height: 1.6;
  margin-top: 8px;
  margin-bottom: 8px;
  color: var(--ios-label);
}

.about-content :deep(blockquote) {
  margin: 16px 0;
  padding: 12px 16px;
  border-left: 3px solid var(--ios-blue);
  background: var(--ios-grouped-bg);
  border-radius: var(--ios-radius-sm);
  font-size: 15px;
  line-height: 1.6;
  color: var(--ios-secondary-label);
}

.about-content :deep(blockquote p) {
  margin: 4px 0;
  color: var(--ios-secondary-label);
}

.about-content :deep(a) {
  color: var(--ios-blue);
  text-decoration: none;
}

.about-content :deep(a:active) {
  opacity: 0.7;
}

.about-content :deep(ul),
.about-content :deep(ol) {
  padding-left: 20px;
  margin: 8px 0;
}

.about-content :deep(li) {
  font-size: 15px;
  line-height: 1.6;
  margin: 4px 0;
}

.about-content :deep(img) {
  border-radius: var(--ios-radius-md);
  margin: 16px auto;
  max-width: 100%;
  display: block;
}

.about-content :deep(strong) {
  font-weight: 600;
}

.about-content :deep(hr) {
  border: none;
  height: 0.5px;
  background: var(--ios-separator);
  margin: 20px 0;
}
</style>
