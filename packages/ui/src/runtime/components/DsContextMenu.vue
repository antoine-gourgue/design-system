<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsContextMenuItem {
  label?: string
  type?: 'item' | 'separator'
  icon?: string
  shortcut?: string
  disabled?: boolean
  danger?: boolean
  action?: () => void
}

export interface DsContextMenuProps {
  items: DsContextMenuItem[]
  class?: string
}

const props = defineProps<DsContextMenuProps>()

const isOpen = ref(false)
const position = ref({ x: 0, y: 0 })
const menuRef = ref<HTMLElement | null>(null)

function openMenu(e: MouseEvent) {
  e.preventDefault()
  isOpen.value = false

  // Use nextTick-like timeout to let DOM close previous
  requestAnimationFrame(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    let x = e.clientX
    let y = e.clientY
    const menuW = 200
    const menuH = 250
    if (x + menuW > vw)
      x = vw - menuW - 8
    if (y + menuH > vh)
      y = vh - menuH - 8

    position.value = { x, y }
    isOpen.value = true
  })
}

function closeMenu() {
  isOpen.value = false
}

function runAction(item: DsContextMenuItem) {
  if (item.disabled || item.type === 'separator')
    return
  item.action?.()
  closeMenu()
}

function onDocumentClick(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    closeMenu()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape')
    closeMenu()
}

// Add/remove global listeners
function addListeners() {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('contextmenu', onDocumentClick)
}
function removeListeners() {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('contextmenu', onDocumentClick)
}

onUnmounted(removeListeners)
</script>

<template>
  <div
    class="relative"
    @contextmenu="(e) => { addListeners(); openMenu(e); }"
  >
    <slot></slot>

    <Teleport to="body">
      <Transition name="ctx-pop">
        <div
          v-if="isOpen"
          ref="menuRef"
          :style="{ position: 'fixed', top: `${position.y}px`, left: `${position.x}px`, zIndex: 9999 }"
          :class="cn(
            'min-w-48 rounded-ds-lg border border-ds-border bg-ds-bg-elevated shadow-ds-xl py-1 overflow-hidden',
            props.class,
          )"
          role="menu"
        >
          <template v-for="(item, i) in items" :key="i">
            <div
              v-if="item.type === 'separator'"
              class="my-1 h-px bg-ds-border mx-2"
              role="separator"
            ></div>
            <button
              v-else
              type="button"
              role="menuitem"
              :disabled="item.disabled"
              :class="cn(
                'flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors',
                item.danger
                  ? 'text-ds-danger hover:bg-ds-danger-subtle'
                  : 'text-ds-fg hover:bg-ds-bg-muted',
                item.disabled && 'opacity-40 cursor-not-allowed',
              )"
              @click="runAction(item)"
            >
              <span class="flex-1">{{ item.label }}</span>
              <span v-if="item.shortcut" class="text-xs text-ds-fg-subtle">{{ item.shortcut }}</span>
            </button>
          </template>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.ctx-pop-enter-active,
.ctx-pop-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.ctx-pop-enter-from,
.ctx-pop-leave-to { opacity: 0; transform: scale(0.95); }
</style>
