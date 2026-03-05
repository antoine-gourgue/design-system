<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsHoverCardProps {
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  openDelay?: number
  closeDelay?: number
  class?: string
}

const props = withDefaults(defineProps<DsHoverCardProps>(), {
  side: 'bottom',
  align: 'start',
  openDelay: 200,
  closeDelay: 100,
})

const isOpen = ref(false)
let openTimer: ReturnType<typeof setTimeout>
let closeTimer: ReturnType<typeof setTimeout>

function open() {
  clearTimeout(closeTimer)
  openTimer = setTimeout(() => {
    isOpen.value = true
  }, props.openDelay)
}

function close() {
  clearTimeout(openTimer)
  closeTimer = setTimeout(() => {
    isOpen.value = false
  }, props.closeDelay)
}

const positionClasses: Record<string, string> = {
  'bottom-start': 'top-full mt-2 left-0',
  'bottom-center': 'top-full mt-2 left-1/2 -translate-x-1/2',
  'bottom-end': 'top-full mt-2 right-0',
  'top-start': 'bottom-full mb-2 left-0',
  'top-center': 'bottom-full mb-2 left-1/2 -translate-x-1/2',
  'top-end': 'bottom-full mb-2 right-0',
  'right-start': 'left-full ml-2 top-0',
  'left-start': 'right-full mr-2 top-0',
}

const posClass = positionClasses[`${props.side}-${props.align}`] ?? 'top-full mt-2 left-0'
</script>

<template>
  <div class="relative inline-flex" @mouseenter="open" @mouseleave="close">
    <slot name="trigger"></slot>

    <Transition name="hovercard">
      <div
        v-if="isOpen"
        :class="cn('absolute z-40 w-72 rounded-ds-xl border border-ds-border bg-ds-bg-elevated shadow-ds-lg p-4', posClass, props.class)"
        role="tooltip"
        @mouseenter="open"
        @mouseleave="close"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.hovercard-enter-active,
.hovercard-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.hovercard-enter-from,
.hovercard-leave-to { opacity: 0; transform: translateY(-4px) scale(0.98); }
</style>
