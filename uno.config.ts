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
    'bg-background': 'bg-background-light dark:bg-background-dark',
    'bg-primary': 'bg-primary-light dark:bg-primary-dark',
    'bg-secondary': 'bg-secondary-light dark:bg-secondary-dark',
    'border-secondary': 'border-secondary-light dark:border-secondary-dark',
    'primary': 'bg-primary text-white dark:text-black',
    'secondary': 'bg-secondary text-black dark:text-white',
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
