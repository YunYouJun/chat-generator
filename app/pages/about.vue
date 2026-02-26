<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/about').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
})

const body = computed(() => home.value?.body)
const { tocItems, activeId, scrollTo } = useContentToc(body)

const tocExpanded = ref(true)

function handleScrollTo(id: string) {
  scrollTo(id)
  tocExpanded.value = false
}
</script>

<template>
  <div class="mx-4 py-4">
    <!-- TOC -->
    <div v-if="tocItems.length" class="m-auto mb-3 max-w-2xl">
      <button
        class="flex w-full items-center justify-between rounded-$ios-radius-md bg-$ios-card-bg px-4 py-3 shadow-sm ios-pressable"
        @click="tocExpanded = !tocExpanded"
      >
        <div class="flex items-center gap-2">
          <div class="i-ri-list-unordered text-$ios-blue text-base" />
          <span class="text-15px font-medium text-$ios-label">目录</span>
          <span class="text-12px text-$ios-secondary-label">{{ tocItems.length }} 个章节</span>
        </div>
        <div
          class="i-ri-arrow-down-s-line text-$ios-secondary-label text-lg transition-transform duration-250"
          :class="{ 'rotate-180': tocExpanded }"
        />
      </button>

      <Transition name="toc">
        <div v-show="tocExpanded" class="mt-1 overflow-hidden rounded-$ios-radius-md bg-$ios-card-bg shadow-sm">
          <button
            v-for="(item, index) in tocItems"
            :key="item.id"
            class="group flex w-full items-center text-left ios-pressable"
            :class="[item.depth === 3 ? 'pl-10' : 'pl-4']"
            @click="handleScrollTo(item.id)"
          >
            <div
              class="flex flex-1 items-center gap-2 py-2.5 pr-4"
              :class="{ 'border-b-0.5 border-$ios-separator': index < tocItems.length - 1 }"
            >
              <div
                class="size-1.5 shrink-0 rounded-full"
                :class="activeId === item.id ? 'bg-$ios-blue' : 'bg-$ios-separator'"
              />
              <span
                class="text-15px transition-colors duration-200"
                :class="activeId === item.id ? 'font-medium text-$ios-blue' : 'text-$ios-label'"
              >
                {{ item.text }}
              </span>
            </div>
          </button>
        </div>
      </Transition>
    </div>

    <!-- Content -->
    <ContentRenderer
      v-if="home"
      class="ios-markdown m-auto max-w-2xl rounded-$ios-radius-md bg-$ios-card-bg px-5 py-5 text-left shadow-sm prose md:px-8"
      :value="home"
    />
    <div v-else class="flex flex-col items-center justify-center py-20 text-center text-$ios-secondary-label">
      <div class="i-ri-file-text-line mb-3 text-4xl opacity-40" />
      <span class="text-15px">About not found</span>
    </div>
  </div>
</template>

<style scoped>
.toc-enter-active,
.toc-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  max-height: 300px;
  opacity: 1;
}

.toc-enter-from,
.toc-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
}
</style>
