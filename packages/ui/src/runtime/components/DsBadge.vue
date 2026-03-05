<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center gap-1',
    'font-medium font-ds',
    'border',
    'select-none whitespace-nowrap',
    'transition-colors duration-ds-base ease-ds-smooth',
    'motion-reduce:transition-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-ds-secondary text-ds-secondary-fg border-ds-border',
        primary: 'bg-ds-primary-subtle text-ds-primary border-ds-primary border-opacity-20',
        success: 'bg-ds-success-subtle text-ds-success border-ds-success border-opacity-20',
        warning: 'bg-ds-warning-subtle text-ds-warning border-ds-warning border-opacity-20',
        danger: 'bg-ds-danger-subtle text-ds-danger border-ds-danger border-opacity-20',
        solid: 'bg-ds-fg text-ds-bg border-ds-fg',
        outline: 'bg-transparent text-ds-fg border-ds-border',
      },
      size: {
        sm: 'text-xs px-1.5 py-0.5 rounded-ds-xs',
        md: 'text-xs px-2 py-0.5 rounded-ds-sm',
        lg: 'text-sm px-2.5 py-1 rounded-ds-sm',
      },
      dot: {
        true: '',
        false: '',
      },
      rounded: {
        true: '!rounded-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      dot: false,
      rounded: false,
    },
  },
)

type BadgeVariants = VariantProps<typeof badgeVariants>

export interface DsBadgeProps {
  variant?: BadgeVariants['variant']
  size?: BadgeVariants['size']
  /** Show a small dot indicator before the label */
  dot?: BadgeVariants['dot']
  rounded?: BadgeVariants['rounded']
  class?: string
}

const props = withDefaults(defineProps<DsBadgeProps>(), {
  variant: 'default',
  size: 'md',
  dot: false,
  rounded: false,
})

const classes = computed(() =>
  cn(
    badgeVariants({
      variant: props.variant,
      size: props.size,
      dot: props.dot,
      rounded: props.rounded,
    }),
    props.class,
  ),
)

const dotColorClass = computed(() => {
  const map: Record<NonNullable<BadgeVariants['variant']>, string> = {
    default: 'bg-ds-fg-muted',
    primary: 'bg-ds-primary',
    success: 'bg-ds-success',
    warning: 'bg-ds-warning',
    danger: 'bg-ds-danger',
    solid: 'bg-ds-bg',
    outline: 'bg-ds-fg-muted',
  }
  return map[props.variant ?? 'default']
})
</script>

<template>
  <span :class="classes">
    <!-- Optional leading dot -->
    <span
      v-if="dot"
      :class="[dotColorClass, 'inline-block rounded-full shrink-0']"
      :style="{ width: '6px', height: '6px' }"
      aria-hidden="true"
    />

    <!-- Leading icon slot -->
    <span v-if="$slots.icon" class="shrink-0" aria-hidden="true">
      <slot name="icon" />
    </span>

    <slot />
  </span>
</template>
