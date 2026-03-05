<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsMenubarMenuItem {
  label: string
  shortcut?: string
  disabled?: boolean
  separator?: boolean
  action?: () => void
}

export interface DsMenubarMenu {
  label: string
  items: DsMenubarMenuItem[]
}

export interface DsMenubarProps {
  menus?: DsMenubarMenu[]
  class?: string
}

const props = withDefaults(defineProps<DsMenubarProps>(), {
  menus: () => [],
})

const activeMenu = ref<number | null>(null)

function toggleMenu(i: number) {
  activeMenu.value = activeMenu.value === i ? null : i
}

function closeAll() {
  activeMenu.value = null
}

function handleAction(fn?: () => void) {
  fn?.()
  closeAll()
}
</script>

<template>
  <div
    :class="cn('relative flex items-center border-b border-ds-border bg-ds-bg px-2', props.class)"
    @keydown.escape="closeAll"
  >
    <div
      v-for="(menu, i) in menus"
      :key="i"
      class="relative"
    >
      <button
        type="button"
        :class="cn(
          'px-3 py-1.5 text-sm font-medium rounded-ds-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
          activeMenu === i ? 'bg-ds-primary text-white' : 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-subtle',
        )"
        @click="toggleMenu(i)"
      >
        {{ menu.label }}
      </button>

      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="scale-95 opacity-0"
        leave-active-class="transition duration-75 ease-in"
        leave-to-class="scale-95 opacity-0"
      >
        <div
          v-if="activeMenu === i"
          class="absolute left-0 top-full mt-0.5 w-52 rounded-ds-lg border border-ds-border bg-ds-bg shadow-ds-md py-1 z-50"
        >
          <template v-for="(item, j) in menu.items" :key="j">
            <div v-if="item.separator" class="my-1 border-t border-ds-border" />
            <button
              v-else
              type="button"
              :disabled="item.disabled"
              :class="cn(
                'w-full flex items-center justify-between px-3 py-1.5 text-sm text-left transition-colors',
                item.disabled ? 'opacity-40 cursor-not-allowed text-ds-fg-muted' : 'text-ds-fg hover:bg-ds-bg-subtle cursor-pointer',
              )"
              @click="handleAction(item.action)"
            >
              {{ item.label }}
              <kbd v-if="item.shortcut" class="text-xs text-ds-fg-subtle font-mono bg-ds-bg-muted px-1.5 py-0.5 rounded">{{ item.shortcut }}</kbd>
            </button>
          </template>
        </div>
      </Transition>
    </div>

    <div
      v-if="activeMenu !== null"
      class="fixed inset-0 z-40"
      @click="closeAll"
    />
  </div>
</template>
