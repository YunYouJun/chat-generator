<template>
  <main class="pt-4 text-center">
    <slot />
    <!-- <Footer /> -->
    <NuxtLink class="absolute left-5 top-5" i-ri:home-2-line to="/" />
    <DarkToggle class="absolute right-5 top-5" />

    <TheFooter />
  </main>
</template>
