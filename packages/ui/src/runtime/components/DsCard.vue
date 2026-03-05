<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { computed } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(defineProps<DsCardProps>(), {
  shadow: 'sm',
  radius: 'lg',
  hoverable: false,
  padding: 'none',
})

const cardVariants = cva(
  [
    'bg-ds-bg-elevated text-ds-fg',
    'border border-ds-border',
    'overflow-hidden',
    'transition-shadow duration-ds-base ease-ds-smooth',
    'motion-reduce:transition-none',
  ].join(' '),
  {
    variants: {
      shadow: {
        none: '',
        sm: 'shadow-ds-sm',
        md: 'shadow-ds-md',
        lg: 'shadow-ds-lg',
      },
      radius: {
        sm: 'rounded-ds-sm',
        md: 'rounded-ds-md',
        lg: 'rounded-ds-lg',
        xl: 'rounded-ds-xl',
      },
      hoverable: {
        true: 'hover:shadow-ds-lg cursor-pointer',
        false: '',
      },
      padding: {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-7',
      },
    },
    defaultVariants: {
      shadow: 'sm',
      radius: 'lg',
      hoverable: false,
      padding: 'none',
    },
  },
)

type CardVariants = VariantProps<typeof cardVariants>

export interface DsCardProps {
  shadow?: CardVariants['shadow']
  radius?: CardVariants['radius']
  hoverable?: CardVariants['hoverable']
  /** Direct padding on the card — use 'none' when composing with DsCardContent */
  padding?: CardVariants['padding']
  class?: string
}

const classes = computed(() =>
  cn(
    cardVariants({
      shadow: props.shadow,
      radius: props.radius,
      hoverable: props.hoverable,
      padding: props.padding,
    }),
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
