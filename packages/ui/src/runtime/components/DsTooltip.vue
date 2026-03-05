<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsTooltipProps {
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  class?: string
}

const props = withDefaults(defineProps<DsTooltipProps>(), {
  side: 'top',
  delay: 300,
})

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function show() {
  timer = setTimeout(() => { visible.value = true }, props.delay)
}

function hide() {
  if (timer) clearTimeout(timer)
  visible.value = false
}

const tooltipClasses = computed(() =>
  cn(
    'absolute z-50 px-2.5 py-1.5 text-xs font-medium font-ds rounded-ds-md',
    'bg-ds-fg text-ds-fg-inverted shadow-ds-md',
    'pointer-events-none whitespace-nowrap',
    'transition-opacity duration-ds-fast',
    visible.value ? 'opacity-100' : 'opacity-0',
    {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }[props.side],
    props.class,
  ),
)
</script>

<template>
  <div
    class="relative inline-flex"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <div
      :class="tooltipClasses"
      role="tooltip"
    >
      {{ content }}
    </div>
  </div>
</template>
