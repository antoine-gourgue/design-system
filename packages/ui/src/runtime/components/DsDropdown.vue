<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { cn } from '../utils/cn'

export interface DsDropdownItem {
  label: string
  value?: string
  icon?: string
  disabled?: boolean
  destructive?: boolean
  divider?: boolean
}

export interface DsDropdownProps {
  /** Dropdown menu items */
  items?: DsDropdownItem[]
  /** Placement relative to trigger */
  placement?: 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top'
  /** Disable the dropdown */
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsDropdownProps>(), {
  items: () => [],
  placement: 'bottom-start',
  disabled: false,
})

const emit = defineEmits<{
  select: [item: DsDropdownItem]
  open: []
  close: []
}>()

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const focusedIndex = ref(-1)

function open() {
  if (props.disabled) return
  isOpen.value = true
  focusedIndex.value = -1
  emit('open')
  nextTick(() => {
    const items = menuRef.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled])')
    items?.[0]?.focus()
    focusedIndex.value = 0
  })
}

function close() {
  isOpen.value = false
  emit('close')
  nextTick(() => triggerRef.value?.focus())
}

function toggle() {
  isOpen.value ? close() : open()
}

function selectItem(item: DsDropdownItem) {
  if (item.disabled) return
  emit('select', item)
  close()
}

function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return

  const items = Array.from(
    menuRef.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled])') ?? [],
  )

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusedIndex.value = Math.min(focusedIndex.value + 1, items.length - 1)
      items[focusedIndex.value]?.focus()
      break
    case 'ArrowUp':
      event.preventDefault()
      focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
      items[focusedIndex.value]?.focus()
      break
    case 'Home':
      event.preventDefault()
      focusedIndex.value = 0
      items[0]?.focus()
      break
    case 'End':
      event.preventDefault()
      focusedIndex.value = items.length - 1
      items[items.length - 1]?.focus()
      break
    case 'Escape':
      close()
      break
    case 'Tab':
      close()
      break
  }
}

function handleOutsideClick(event: MouseEvent) {
  const target = event.target as Node
  if (!triggerRef.value?.contains(target) && !menuRef.value?.contains(target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick, true)
})

/* ── Placement classes ── */
const menuPlacementClass = computed(() => {
  const map: Record<NonNullable<DsDropdownProps['placement']>, string> = {
    'bottom-start': 'top-full left-0 mt-1',
    'bottom-end': 'top-full right-0 mt-1',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
    'top-start': 'bottom-full left-0 mb-1',
    'top-end': 'bottom-full right-0 mb-1',
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
  }
  return map[props.placement ?? 'bottom-start']
})
</script>

<template>
  <div class="relative inline-block" @keydown="handleKeydown">
    <!-- Trigger -->
    <div
      ref="triggerRef"
      @click="toggle"
    >
      <slot name="trigger" :open="isOpen" :toggle="toggle" />
    </div>

    <!-- Menu -->
    <Transition
      enter-active-class="transition-all duration-ds-base ease-ds-out"
      leave-active-class="transition-all duration-ds-fast ease-ds-in"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="menuRef"
        :class="cn(
          'absolute z-50 min-w-[10rem] w-max',
          'bg-ds-bg-elevated border border-ds-border rounded-ds-lg shadow-ds-lg',
          'py-1 overflow-hidden',
          'motion-reduce:transition-none',
          menuPlacementClass,
          props.class,
        )"
        role="menu"
        :aria-orientation="'vertical'"
      >
        <!-- Default slot (custom content) -->
        <slot v-if="$slots.default" />

        <!-- Items list -->
        <template v-else>
          <template v-for="(item, index) in items" :key="index">
            <!-- Divider -->
            <div
              v-if="item.divider"
              class="my-1 h-px bg-ds-border-muted"
              role="separator"
            />

            <!-- Menu item -->
            <button
              v-else
              type="button"
              class="flex w-full items-center gap-2 px-3 py-2 text-sm font-ds text-left
                     transition-colors duration-ds-fast
                     focus-visible:outline-none focus-visible:bg-ds-bg-subtle"
              :class="[
                item.disabled
                  ? 'text-ds-fg-subtle cursor-not-allowed'
                  : item.destructive
                    ? 'text-ds-danger hover:bg-ds-danger-subtle'
                    : 'text-ds-fg hover:bg-ds-bg-subtle',
              ]"
              role="menuitem"
              :aria-disabled="item.disabled ? true : undefined"
              @click="selectItem(item)"
            >
              <slot name="item-icon" :item="item" />
              {{ item.label }}
            </button>
          </template>
        </template>
      </div>
    </Transition>
  </div>
</template>
