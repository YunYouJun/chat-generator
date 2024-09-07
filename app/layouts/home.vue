<template>
  <main class="relative text-center">
    <div class="relative p-6">
      <slot />

      <DarkToggle class="absolute right-5 top-5" />
      <TheFooter />
    </div>
    <!-- <Footer />
    <div class="mx-auto mt-5 text-center text-sm opacity-25">
      [Home Layout]
    </div> -->
  </main>
</template>
