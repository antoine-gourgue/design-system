<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsInputSkeletonProps {
  size?: 'sm' | 'md' | 'lg'
  /** Show a label above the input */
  showLabel?: boolean
  /** Show help text below the input */
  showHelp?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsInputSkeletonProps>(), {
  size: 'md',
  showLabel: true,
  showHelp: false,
})

const sizeClasses: Record<NonNullable<DsInputSkeletonProps['size']>, string> = {
  sm: 'h-8 rounded-ds-sm',
  md: 'h-10 rounded-ds-md',
  lg: 'h-12 rounded-ds-md',
}

function shimmer(extra = '') {
  return cn(
    'relative overflow-hidden bg-ds-bg-muted',
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:animate-ds-skeleton motion-reduce:before:animate-none',
    extra,
  )
}
</script>

<template>
  <div :class="cn('space-y-1.5', props.class)" aria-hidden="true" role="presentation">
    <!-- Label -->
    <div v-if="showLabel" :class="shimmer('h-4 w-1/4 rounded-ds-xs')" />

    <!-- Input field -->
    <div :class="shimmer(cn('w-full', sizeClasses[size ?? 'md']))" />

    <!-- Help text -->
    <div v-if="showHelp" :class="shimmer('h-3 w-2/5 rounded-ds-xs')" />
  </div>
</template>
