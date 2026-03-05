<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsButtonSkeletonProps {
  size?: 'sm' | 'md' | 'lg'
  /** Approximate width — pass 'full' for full-width */
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'full'
  rounded?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsButtonSkeletonProps>(), {
  size: 'md',
  width: 'auto',
  rounded: false,
})

const sizeClasses: Record<NonNullable<DsButtonSkeletonProps['size']>, string> = {
  sm: 'h-8 rounded-ds-sm',
  md: 'h-10 rounded-ds-md',
  lg: 'h-12 rounded-ds-lg',
}

const widthClasses: Record<NonNullable<DsButtonSkeletonProps['width']>, string> = {
  auto: 'w-24',
  sm: 'w-16',
  md: 'w-24',
  lg: 'w-32',
  full: 'w-full',
}

const classes = computed(() =>
  cn(
    'relative overflow-hidden bg-ds-bg-muted',
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:animate-ds-skeleton motion-reduce:before:animate-none',
    sizeClasses[props.size ?? 'md'],
    widthClasses[props.width ?? 'auto'],
    props.rounded ? '!rounded-full' : '',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" aria-hidden="true" role="presentation" />
</template>
