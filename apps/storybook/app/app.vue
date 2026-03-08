<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'
import { useTheme } from '~/composables/useTheme'

const sidebarOpen = ref(false)
const searchOpen = ref(false)
  useHead({
    script: [
      {
        key: 'umami-analytics',
        src: 'https://umami.antoinegourgue.dev/script.js',
        async: true,
        'data-website-id': '5b2dea89-0050-4568-885f-a4e46272184b',
      },
    ],
  })

// Initialize theme on client — light is the default, dark only if explicitly saved
const { dark } = useTheme()
onMounted(() => {
  if (import.meta.client) {
    const saved = localStorage.getItem('docs-theme')
    document.documentElement.classList.toggle('dark', saved === 'dark')
  }
})

// Global Cmd+K / Ctrl+K shortcut
if (import.meta.client) {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      searchOpen.value = true
    }
  })
}
</script>

<template>
  <div class="min-h-screen bg-ds-bg font-ds text-ds-fg antialiased">
    <!-- Topbar -->
    <DocsTopbar
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @open-search="searchOpen = true"
    />

    <!-- Sidebar -->
    <DocsSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Main content -->
    <div class="lg:pl-64 pt-14 flex flex-col min-h-screen">
      <main class="flex-1">
        <NuxtPage />
      </main>
      <DocsFooter />
    </div>

    <!-- Search modal -->
    <DocsSearch :open="searchOpen" @close="searchOpen = false" />

    <!-- Global toast notifications -->
    <DsToastProvider />
  </div>
</template>
