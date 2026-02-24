import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons(),
    presetTypography(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: {
    primary: 'bg-primary-light text-white dark:(bg-primary-dark text-black)',
    secondary: 'bg-secondary-light text-black dark:(bg-secondary-dark text-white)',
  },
  theme: {
    colors: {
      background: {
        light: '#FDFBF7',
        dark: '#1C1B1A',
      },
      primary: {
        light: '#2A2928',
        dark: '#F3F0EA',
      },
      secondary: {
        light: '#F3F0EA',
        dark: '#2A2928',
      },
    },
  },
})
