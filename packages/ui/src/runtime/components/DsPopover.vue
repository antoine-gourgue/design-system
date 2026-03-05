<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsPopoverProps {
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  class?: string
}

const props = withDefaults(defineProps<DsPopoverProps>(), {
  side: 'bottom',
  align: 'start',
})

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}
function close() {
  isOpen.value = false
}

function onOutside(e: MouseEvent) {
  const target = e.target as Node
  if (!triggerRef.value?.contains(target) && !contentRef.value?.contains(target)) {
    close()
  }
}

watch(isOpen, (val) => {
  if (val) {
    nextTick(() => document.addEventListener('mousedown', onOutside))
  }
  else {
    document.removeEventListener('mousedown', onOutside)
  }
})
onUnmounted(() => document.removeEventListener('mousedown', onOutside))

const positionClasses: Record<string, string> = {
  'bottom-start': 'top-full mt-2 left-0',
  'bottom-center': 'top-full mt-2 left-1/2 -translate-x-1/2',
  'bottom-end': 'top-full mt-2 right-0',
  'top-start': 'bottom-full mb-2 left-0',
  'top-center': 'bottom-full mb-2 left-1/2 -translate-x-1/2',
  'top-end': 'bottom-full mb-2 right-0',
  'left-start': 'right-full mr-2 top-0',
  'left-center': 'right-full mr-2 top-1/2 -translate-y-1/2',
  'left-end': 'right-full mr-2 bottom-0',
  'right-start': 'left-full ml-2 top-0',
  'right-center': 'left-full ml-2 top-1/2 -translate-y-1/2',
  'right-end': 'left-full ml-2 bottom-0',
}

const posKey = `${props.side}-${props.align}`
const posClass = positionClasses[posKey] ?? 'top-full mt-2 left-0'
</script>

<template>
  <div class="relative inline-flex">
    <!-- Trigger -->
    <div ref="triggerRef" class="inline-flex" @click="toggle">
      <slot name="trigger"></slot>
    </div>

    <!-- Content -->
    <Transition name="popover">
      <div
        v-if="isOpen"
        ref="contentRef"
        :class="cn('absolute z-40 min-w-48 rounded-ds-lg border border-ds-border bg-ds-bg-elevated shadow-ds-lg p-3', posClass, props.class)"
        role="dialog"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.popover-enter-active,
.popover-leave-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.popover-enter-from,
.popover-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
