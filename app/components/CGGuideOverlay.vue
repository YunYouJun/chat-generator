<script setup lang="ts">
const { showGuide, closeGuide } = useGuide()

const currentStep = ref(0)

const steps = [
  {
    icon: 'i-ri-chat-1-line',
    iconBg: 'bg-$ios-blue',
    title: '浏览聊天合集',
    desc: '首页展示各类聊天记录合集，点击卡片即可查看完整对话内容。',
  },
  {
    icon: 'i-ri-edit-line',
    iconBg: 'bg-$ios-green',
    title: '自定义编辑',
    desc: '在编辑页面，你可以设置双方头像（支持 QQ 头像获取），并输入自定义对话文本，实时预览聊天效果。',
  },
  {
    icon: 'i-ri-file-text-line',
    iconBg: 'bg-$ios-orange',
    title: '对话格式说明',
    desc: '使用简单的文本格式编写对话：\nA: 表示对方说的话\nQ: 表示我说的话\nT: 表示时间分割线\n末尾加 ! 表示已读（如 A!:）',
  },
  {
    icon: 'i-ri-download-2-line',
    iconBg: 'bg-purple-500',
    title: '导出与分享',
    desc: '每段对话都支持复制图片、复制文本、下载截图等操作，方便你保存和分享。',
  },
  {
    icon: 'i-ri-send-plane-line',
    iconBg: 'bg-pink-500',
    title: '投稿你的聊天',
    desc: '觉得有趣的聊天记录？欢迎通过投稿表格提交，你的内容可能会被收录到合集中！',
  },
]

const currentStepData = computed(() => steps[currentStep.value]!)

function next() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
  else {
    close()
  }
}

function close() {
  currentStep.value = 0
  closeGuide()
}

watch(showGuide, (v) => {
  if (v)
    currentStep.value = 0
})
</script>

<template>
  <Teleport to="body">
    <Transition name="guide-fade">
      <div
        v-if="showGuide"
        class="fixed inset-0 z-999 flex items-end justify-center sm:items-center"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="close" />

        <!-- Sheet -->
        <Transition name="guide-slide" appear>
          <div
            class="relative mx-auto max-w-sm w-full overflow-hidden rounded-t-2xl bg-$ios-card-bg shadow-2xl sm:rounded-2xl"
          >
            <!-- Close button -->
            <button
              class="absolute right-3 top-3 z-10 size-8 flex items-center justify-center rounded-full bg-$ios-grouped-bg text-$ios-secondary-label active:opacity-60"
              @click="close"
            >
              <div class="i-ri-close-line text-lg" />
            </button>

            <!-- Step content -->
            <div class="px-8 pb-6 pt-10">
              <!-- Icon -->
              <div class="mb-5 flex justify-center">
                <div
                  class="size-16 flex items-center justify-center rounded-2xl text-white shadow-lg"
                  :class="currentStepData.iconBg"
                >
                  <div class="text-3xl" :class="currentStepData.icon" />
                </div>
              </div>

              <!-- Title -->
              <h3 class="mb-3 text-center text-xl text-$ios-label font-bold tracking-tight">
                {{ currentStepData.title }}
              </h3>

              <!-- Description -->
              <p class="min-h-20 whitespace-pre-line text-center text-sm text-$ios-secondary-label leading-relaxed">
                {{ currentStepData.desc }}
              </p>

              <!-- Dots -->
              <div class="mb-5 mt-6 flex justify-center gap-1.5">
                <button
                  v-for="(_, i) in steps"
                  :key="i"
                  class="size-2 rounded-full transition-all duration-300"
                  :class="i === currentStep ? 'w-5 bg-$ios-blue' : 'bg-$ios-separator'"
                  @click="currentStep = i"
                />
              </div>

              <!-- Actions -->
              <div class="flex flex-col gap-2">
                <button
                  class="w-full rounded-xl bg-$ios-blue px-4 py-3 text-center text-sm text-white font-semibold shadow-sm transition active:(scale-97 opacity-80)"
                  @click="next"
                >
                  {{ currentStep < steps.length - 1 ? '下一步' : '开始使用' }}
                </button>
                <button
                  v-if="currentStep < steps.length - 1"
                  class="w-full rounded-xl px-4 py-2 text-center text-sm text-$ios-secondary-label transition active:opacity-60"
                  @click="close"
                >
                  跳过
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.guide-fade-enter-active,
.guide-fade-leave-active {
  transition: opacity 0.3s ease;
}
.guide-fade-enter-from,
.guide-fade-leave-to {
  opacity: 0;
}

.guide-slide-enter-active {
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.3s ease;
}
.guide-slide-leave-active {
  transition:
    transform 0.25s ease-in,
    opacity 0.2s ease;
}
.guide-slide-enter-from {
  transform: translateY(40px);
  opacity: 0;
}
.guide-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
