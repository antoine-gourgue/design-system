<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const skeletonVariants = cva(
  [
    'relative overflow-hidden',
    'bg-ds-bg-muted',
    // Shimmer animation via pseudo element (using Tailwind animate)
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:animate-ds-skeleton',
    'motion-reduce:before:animate-none motion-reduce:before:hidden',
  ].join(' '),
  {
    variants: {
      shape: {
        rectangle: 'rounded-ds-sm',
        rounded: 'rounded-ds-md',
        circle: '!rounded-full',
        pill: '!rounded-full',
        text: 'rounded-ds-xs',
      },
    },
    defaultVariants: {
      shape: 'rectangle',
    },
  },
)

type SkeletonVariants = VariantProps<typeof skeletonVariants>

export interface DsSkeletonProps {
  shape?: SkeletonVariants['shape']
  /** Width (e.g. '100%', '200px', '8rem') */
  width?: string | number
  /** Height (e.g. '16px', '1rem') */
  height?: string | number
  class?: string
}

const props = withDefaults(defineProps<DsSkeletonProps>(), {
  shape: 'rectangle',
})

const classes = computed(() =>
  cn(
    skeletonVariants({ shape: props.shape }),
    props.class,
  ),
)

const styles = computed(() => {
  const s: Record<string, string> = {}
  if (props.width !== undefined) {
    s.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height !== undefined) {
    s.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return s
})
</script>

<template>
  <div
    :class="classes"
    :style="styles"
    aria-hidden="true"
    role="presentation"
  />
</template>
