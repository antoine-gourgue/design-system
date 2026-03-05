import type { Config } from 'tailwindcss'
import dsPreset from 'design-system-antoinegourgue/tailwind/preset'

export default {
  presets: [dsPreset],
  content: [
    './app/**/*.{vue,ts,js}',
    '../../packages/ui/src/**/*.{vue,ts,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'ui-monospace',
          'monospace',
        ],
      },
      maxWidth: {
        'docs': '48rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
