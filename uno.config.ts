import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-5 py-2.5 rounded-xl inline-flex items-center justify-center bg-$ios-blue text-white font-semibold cursor-pointer active:opacity-70 active:scale-97 transition-all duration-200 disabled:cursor-default disabled:opacity-50'],
    ['icon-btn', 'inline-flex items-center justify-center cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 active:scale-95 text-$ios-blue'],
    ['ios-nav', 'h-11 flex items-center justify-between px-4'],
    ['ios-section', 'mx-4 rounded-xl bg-$ios-card-bg overflow-hidden'],
    ['ios-pressable', 'active:opacity-70 active:scale-97 transition-all duration-200'],
  ],
  theme: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
