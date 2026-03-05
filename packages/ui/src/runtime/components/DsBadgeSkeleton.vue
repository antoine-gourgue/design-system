<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsBadgeSkeletonProps {
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsBadgeSkeletonProps>(), {
  size: 'md',
  rounded: false,
})

const sizeClasses: Record<NonNullable<DsBadgeSkeletonProps['size']>, string> = {
  sm: 'h-5 w-12 rounded-ds-xs',
  md: 'h-5 w-16 rounded-ds-sm',
  lg: 'h-6 w-20 rounded-ds-sm',
}

const classes = computed(() =>
  cn(
    'inline-flex relative overflow-hidden bg-ds-bg-muted',
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:animate-ds-skeleton motion-reduce:before:animate-none',
    sizeClasses[props.size ?? 'md'],
    props.rounded ? '!rounded-full' : '',
    props.class,
  ),
)
</script>

<template>
  <span :class="classes" aria-hidden="true" role="presentation"></span>
</template>
