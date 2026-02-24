import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWind4, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons(),
    presetTypography(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      warmbg: {
        light: '#FDFBF7',
        dark: '#1C1B1A',
      },
      warmfg: {
        light: '#2A2928',
        dark: '#F3F0EA',
      },
    },
  },
})
