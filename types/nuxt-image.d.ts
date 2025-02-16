// temporary for https://github.com/vuejs/language-tools/issues/5183
declare module '@nuxt/image/dist/runtime/components/NuxtImg.vue' {
  const NuxtImg: {
    new (): {
      $attrs: Record<string, unknown>
    }
  }
  export default NuxtImg
}
