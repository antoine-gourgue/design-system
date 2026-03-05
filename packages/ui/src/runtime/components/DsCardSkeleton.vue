<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsCardSkeletonProps {
  /** Show avatar + title pattern in header */
  showAvatar?: boolean
  /** Number of body lines */
  lines?: number
  /** Show footer with action buttons */
  showFooter?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsCardSkeletonProps>(), {
  showAvatar: false,
  lines: 3,
  showFooter: true,
})

function skeletonLine(widthClass: string) {
  return cn(
    'h-3 rounded-ds-xs bg-ds-bg-muted relative overflow-hidden',
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:animate-ds-skeleton motion-reduce:before:animate-none',
    widthClass,
  )
}

const lineWidths = ['w-full', 'w-full', 'w-3/4', 'w-5/6', 'w-2/3', 'w-4/5']
</script>

<template>
  <div
    :class="cn('bg-ds-bg-elevated border border-ds-border rounded-ds-lg shadow-ds-sm overflow-hidden', props.class)"
    aria-hidden="true"
    role="presentation"
  >
    <!-- Header -->
    <div class="px-6 py-5 border-b border-ds-border">
      <div v-if="showAvatar" class="flex items-center gap-3">
        <!-- Avatar circle -->
        <div
          :class="cn(
            'shrink-0 size-10 rounded-full bg-ds-bg-muted relative overflow-hidden',
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-ds-skeleton motion-reduce:before:animate-none',
          )"
        />
        <div class="flex-1 space-y-2">
          <div :class="skeletonLine('w-1/3')" />
          <div :class="skeletonLine('w-1/4')" />
        </div>
      </div>
      <div v-else class="space-y-2">
        <div :class="skeletonLine('w-2/5')" />
        <div :class="skeletonLine('w-1/3 h-2.5')" />
      </div>
    </div>

    <!-- Content -->
    <div class="px-6 py-4 space-y-2.5">
      <div
        v-for="i in Math.min(lines, 6)"
        :key="i"
        :class="skeletonLine(lineWidths[(i - 1) % lineWidths.length] ?? 'w-full')"
      />
    </div>

    <!-- Footer -->
    <div v-if="showFooter" class="px-6 py-4 border-t border-ds-border flex justify-end gap-2">
      <div
        :class="cn(
          'h-8 w-20 rounded-ds-md bg-ds-bg-muted relative overflow-hidden',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-ds-skeleton motion-reduce:before:animate-none',
        )"
      />
      <div
        :class="cn(
          'h-8 w-16 rounded-ds-md bg-ds-bg-muted relative overflow-hidden',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-ds-skeleton motion-reduce:before:animate-none',
        )"
      />
    </div>
  </div>
</template>
