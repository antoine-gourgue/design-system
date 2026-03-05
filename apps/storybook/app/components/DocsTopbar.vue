<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { dark, toggle } = useTheme()
const { dsVersion } = useAppConfig()

const emit = defineEmits<{
  toggleSidebar: []
  openSearch: []
}>()
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 h-14 border-b border-ds-border bg-ds-bg/95 backdrop-blur-md">
    <div class="flex h-full items-center gap-4 px-4 lg:px-6 max-w-screen-2xl mx-auto">

      <!-- ── LEFT: Hamburger + Logo ── -->
      <div class="flex items-center gap-3 shrink-0 lg:w-60">
        <!-- Mobile sidebar toggle -->
        <button
          type="button"
          class="lg:hidden flex items-center justify-center size-8 rounded-ds-md text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
          aria-label="Toggle navigation"
          @click="emit('toggleSidebar')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Logo + name -->
        <NuxtLink
          to="/"
          class="group flex items-center gap-2.5 rounded-ds-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
        >
          <img src="/logo.png" alt="Logo" class="size-9 object-contain dark:invert" />
          <div class="flex items-baseline gap-1.5">
            <span class="text-sm font-bold text-ds-fg tracking-tight font-ds">DDS</span>
            <span class="hidden sm:inline-block text-[10px] font-medium text-ds-fg-muted/70 bg-ds-bg-muted border border-ds-border rounded-full px-1.5 py-0.5 leading-none font-mono">
              v{{ dsVersion }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- ── CENTER: Search ── -->
      <div class="flex-1 flex justify-center">
        <button
          type="button"
          class="hidden sm:flex w-full max-w-md items-center gap-2.5 h-9 pl-3 pr-2.5 rounded-ds-lg border border-ds-border text-ds-fg-muted text-sm bg-ds-bg-muted/40 hover:bg-ds-bg-muted hover:border-ds-border/80 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring group"
          aria-label="Search documentation"
          @click="emit('openSearch')"
        >
          <svg class="size-3.5 shrink-0 text-ds-fg-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
          </svg>
          <span class="flex-1 text-left text-[13px] truncate">Search components, guides...</span>
          <kbd class="hidden md:inline-flex items-center gap-px h-5 px-1.5 text-[10px] font-mono text-ds-fg-muted/60 bg-ds-bg border border-ds-border rounded leading-none shrink-0">
            ⌘K
          </kbd>
        </button>
      </div>

      <!-- ── RIGHT: Actions ── -->
      <div class="flex items-center gap-1 shrink-0">

        <!-- Mobile: search icon only -->
        <button
          type="button"
          class="sm:hidden flex items-center justify-center size-8 rounded-ds-md text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
          aria-label="Search"
          @click="emit('openSearch')"
        >
          <svg class="size-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
          </svg>
        </button>

        <!-- GitHub -->
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center size-8 rounded-ds-md text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>

        <!-- npm -->
        <a
          href="https://www.npmjs.com/package/design-system-antoinegourgue"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center size-8 rounded-ds-md text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
          aria-label="npm package"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 0v24h24V0H0zm19.2 19.2H12v-9.6H7.2v9.6H4.8V4.8h14.4v14.4z"/>
          </svg>
        </a>

        <!-- Divider -->
        <div class="w-px h-5 bg-ds-border mx-1" aria-hidden="true" />

        <!-- Theme toggle -->
        <button
          type="button"
          class="flex items-center justify-center size-8 rounded-ds-md text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
          :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggle"
        >
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 rotate-45 scale-75"
            enter-to-class="opacity-100 rotate-0 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 rotate-0 scale-100"
            leave-to-class="opacity-0 -rotate-45 scale-75"
            mode="out-in"
          >
            <!-- Sun icon (shown in dark → click to go light) -->
            <svg v-if="dark" key="sun" xmlns="http://www.w3.org/2000/svg" class="size-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <!-- Moon icon (shown in light → click to go dark) -->
            <svg v-else key="moon" xmlns="http://www.w3.org/2000/svg" class="size-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </Transition>
        </button>
      </div>

    </div>
  </header>
</template>
