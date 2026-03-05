<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsTabsSkeletonProps {
  /** Number of tab items to show */
  tabs?: number
  /** Content lines inside panel */
  lines?: number
  /** Tab variant style */
  variant?: 'line' | 'enclosed' | 'pills'
  class?: string
}

const props = withDefaults(defineProps<DsTabsSkeletonProps>(), {
  tabs: 4,
  lines: 4,
  variant: 'line',
})

function shimmer(extra = '') {
  return cn(
    'relative overflow-hidden bg-ds-bg-muted',
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:animate-ds-skeleton motion-reduce:before:animate-none',
    extra,
  )
}

const tabWidths = ['w-20', 'w-16', 'w-24', 'w-16', 'w-20', 'w-18']
const lineWidths = ['w-full', 'w-full', 'w-3/4', 'w-5/6', 'w-2/3', 'w-4/5']

const tabListClass = {
  line: 'border-b border-ds-border pb-0 flex gap-0',
  enclosed: 'bg-ds-bg-subtle rounded-ds-lg p-1 flex gap-1',
  pills: 'flex gap-1',
}[props.variant ?? 'line']

const tabItemClass = {
  line: 'py-2.5 px-4 rounded-ds-sm',
  enclosed: 'py-1.5 px-3 rounded-ds-md',
  pills: 'py-1.5 px-3 rounded-full',
}[props.variant ?? 'line']
</script>

<template>
  <div :class="cn('w-full space-y-4', props.class)" aria-hidden="true" role="presentation">
    <!-- Tab list -->
    <div :class="cn('flex items-center', tabListClass)">
      <div
        v-for="i in Math.min(tabs, 6)"
        :key="i"
        :class="shimmer(cn('h-5', tabWidths[(i - 1) % tabWidths.length], tabItemClass))"
      />
    </div>

    <!-- Panel content -->
    <div class="space-y-2.5 pt-1">
      <div
        v-for="i in Math.min(lines, 6)"
        :key="i"
        :class="shimmer(cn('h-3 rounded-ds-xs', lineWidths[(i - 1) % lineWidths.length]))"
      />
    </div>
  </div>
</template>
