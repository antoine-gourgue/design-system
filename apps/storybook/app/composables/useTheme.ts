import { ref, watchEffect } from 'vue'

const dark = ref(false)
let initialized = false

export function useTheme() {
  if (import.meta.client && !initialized) {
    initialized = true
    // Only apply dark if user explicitly chose it — light is the default
    const saved = localStorage.getItem('docs-theme')
    dark.value = saved === 'dark'
    applyTheme()
  }

  function toggle() {
    dark.value = !dark.value
    applyTheme()
    if (import.meta.client) {
      localStorage.setItem('docs-theme', dark.value ? 'dark' : 'light')
    }
  }

  function applyTheme() {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark.value)
    }
  }

  return { dark, toggle }
}
