<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsAvatarSkeletonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'rounded' | 'square'
  class?: string
}

const props = withDefaults(defineProps<DsAvatarSkeletonProps>(), {
  size: 'md',
  shape: 'circle',
})

const sizeClass = computed(() => ({
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-16',
}[props.size]))

const shapeClass = computed(() => ({
  circle: 'rounded-full',
  rounded: 'rounded-ds-lg',
  square: 'rounded-none',
}[props.shape]))
</script>

<template>
  <div
    :class="cn('animate-pulse bg-ds-bg-muted shrink-0', sizeClass, shapeClass, props.class)"
    aria-hidden="true"
    role="presentation"
  ></div>
</template>
