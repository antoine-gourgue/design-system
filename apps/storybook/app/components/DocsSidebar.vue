<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { nav } from '~/data/nav'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const route = useRoute()

function isActive(href: string): boolean {
  return route.path === href
}

function isGroupActive(items: { href: string }[]): boolean {
  return items.some(item => route.path === item.href || route.path.startsWith(item.href + '/'))
}
</script>

<template>
  <!-- Mobile overlay -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-40 bg-black/40 lg:hidden"
      @click="emit('close')"
    />
  </Transition>

  <!-- Sidebar panel -->
  <aside
    :class="[
      'fixed top-14 left-0 bottom-0 z-40 w-64 bg-ds-bg border-r border-ds-border overflow-y-auto',
      'transition-transform duration-200 ease-out',
      'lg:translate-x-0',
      open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <nav class="px-4 py-6 space-y-6">
      <div v-for="group in nav" :key="group.title">
        <p class="mb-2 px-2 text-xs font-semibold tracking-wider uppercase text-ds-fg-subtle font-ds">
          {{ group.title }}
        </p>
        <ul class="space-y-0.5">
          <li v-for="item in group.items" :key="item.href">
            <NuxtLink
              :to="item.href"
              :class="[
                'flex items-center gap-2 px-2 py-1.5 text-sm rounded-ds-md font-ds transition-colors duration-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
                isActive(item.href)
                  ? 'bg-ds-primary-subtle text-ds-primary font-medium'
                  : 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted',
              ]"
              @click="emit('close')"
            >
              {{ item.title }}
              <span
                v-if="item.badge"
                class="ml-auto text-xs bg-ds-primary-subtle text-ds-primary px-1.5 py-0.5 rounded-full font-medium"
              >
                {{ item.badge }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
