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
  theme: {
    fontFamily: {
      display: '\'Inter Tight\', \'Inter\', system-ui, sans-serif',
      label: '\'IBM Plex Mono\', ui-monospace, monospace',
    },
    colors: {
      taupe: {
        50: '#fbfaf9',
        100: '#f3f1f1',
        200: '#e8e4e3',
        300: '#d8d2d0',
        400: '#aba09c',
        500: '#7c6d67',
        600: '#5b4f4b',
        700: '#473c39',
        800: '#2b2422',
        900: '#1d1816',
        950: '#0c0a09',
      },
    },
  },
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
})
