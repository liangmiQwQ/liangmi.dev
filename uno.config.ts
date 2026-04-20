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
