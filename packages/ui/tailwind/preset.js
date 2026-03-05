/**
 * design-system-antoinegourgue — Tailwind CSS v3 Preset
 *
 * Usage in tailwind.config.ts:
 *   import dsPreset from 'design-system-antoinegourgue/tailwind/preset'
 *   export default { presets: [dsPreset], ... }
 */

/** @type {import('tailwindcss').Config} */
const dsPreset = {
  darkMode: 'class',

  theme: {
    extend: {
      /**
       * Design System color tokens mapped to CSS variables.
       * These work at runtime via the CSS variables defined in base.css.
       */
      colors: {
        ds: {
          // Backgrounds
          bg: 'var(--ds-bg)',
          'bg-subtle': 'var(--ds-bg-subtle)',
          'bg-muted': 'var(--ds-bg-muted)',
          'bg-elevated': 'var(--ds-bg-elevated)',

          // Foregrounds
          fg: 'var(--ds-fg)',
          'fg-muted': 'var(--ds-fg-muted)',
          'fg-subtle': 'var(--ds-fg-subtle)',
          'fg-inverted': 'var(--ds-fg-inverted)',

          // Borders
          border: 'var(--ds-border)',
          'border-muted': 'var(--ds-border-muted)',
          'border-strong': 'var(--ds-border-strong)',

          // Primary
          primary: 'var(--ds-primary)',
          'primary-hover': 'var(--ds-primary-hover)',
          'primary-active': 'var(--ds-primary-active)',
          'primary-fg': 'var(--ds-primary-fg)',
          'primary-subtle': 'var(--ds-primary-subtle)',
          'primary-muted': 'var(--ds-primary-muted)',

          // Secondary
          secondary: 'var(--ds-secondary)',
          'secondary-hover': 'var(--ds-secondary-hover)',
          'secondary-fg': 'var(--ds-secondary-fg)',

          // Danger
          danger: 'var(--ds-danger)',
          'danger-hover': 'var(--ds-danger-hover)',
          'danger-fg': 'var(--ds-danger-fg)',
          'danger-subtle': 'var(--ds-danger-subtle)',

          // Success
          success: 'var(--ds-success)',
          'success-hover': 'var(--ds-success-hover)',
          'success-fg': 'var(--ds-success-fg)',
          'success-subtle': 'var(--ds-success-subtle)',

          // Warning
          warning: 'var(--ds-warning)',
          'warning-hover': 'var(--ds-warning-hover)',
          'warning-fg': 'var(--ds-warning-fg)',
          'warning-subtle': 'var(--ds-warning-subtle)',

          // Info
          info: 'var(--ds-info)',
          'info-hover': 'var(--ds-info-hover)',
          'info-fg': 'var(--ds-info-fg)',
          'info-subtle': 'var(--ds-info-subtle)',

          // Focus ring
          ring: 'var(--ds-ring)',
          'ring-offset': 'var(--ds-ring-offset)',
        },
      },

      /**
       * Border radius tokens
       */
      borderRadius: {
        'ds-xs': 'var(--ds-radius-xs)',
        'ds-sm': 'var(--ds-radius-sm)',
        'ds-md': 'var(--ds-radius-md)',
        'ds-lg': 'var(--ds-radius-lg)',
        'ds-xl': 'var(--ds-radius-xl)',
        'ds-2xl': 'var(--ds-radius-2xl)',
      },

      /**
       * Box shadow tokens
       */
      boxShadow: {
        'ds-sm': 'var(--ds-shadow-sm)',
        'ds-md': 'var(--ds-shadow-md)',
        'ds-lg': 'var(--ds-shadow-lg)',
        'ds-xl': 'var(--ds-shadow-xl)',
      },

      /**
       * Typography tokens
       */
      fontFamily: {
        ds: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        'ds-mono': [
          '"SF Mono"',
          '"Fira Code"',
          '"Fira Mono"',
          '"Roboto Mono"',
          'monospace',
        ],
      },

      /**
       * Transition timing functions
       */
      transitionTimingFunction: {
        'ds-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ds-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ds-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ds-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },

      /**
       * Transition durations
       */
      transitionDuration: {
        'ds-fast': '100ms',
        'ds-base': '150ms',
        'ds-slow': '200ms',
        'ds-slower': '300ms',
      },

      /**
       * Animation keyframes
       */
      keyframes: {
        'ds-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'ds-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'ds-fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'ds-fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'ds-slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ds-slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ds-scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'ds-skeleton': {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },

      animation: {
        'ds-spin': 'ds-spin 1s linear infinite',
        'ds-pulse': 'ds-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ds-fade-in': 'ds-fade-in 150ms ease-ds-out',
        'ds-fade-out': 'ds-fade-out 150ms ease-ds-in',
        'ds-slide-up': 'ds-slide-up 150ms cubic-bezier(0, 0, 0.2, 1)',
        'ds-slide-down': 'ds-slide-down 150ms cubic-bezier(0, 0, 0.2, 1)',
        'ds-scale-in': 'ds-scale-in 150ms cubic-bezier(0, 0, 0.2, 1)',
        'ds-skeleton': 'ds-skeleton 2s linear infinite',
      },

      /**
       * Ring offset color to match theme
       */
      ringOffsetColor: {
        'ds-bg': 'var(--ds-bg)',
        'ds-ring-offset': 'var(--ds-ring-offset)',
      },

      /**
       * Ring color
       */
      ringColor: {
        'ds-ring': 'var(--ds-ring)',
      },
    },
  },

  plugins: [],
}

module.exports = dsPreset
