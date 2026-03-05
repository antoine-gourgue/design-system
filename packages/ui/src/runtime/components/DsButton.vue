<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { computed } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(defineProps<DsButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  fullWidth: false,
  rounded: false,
  as: 'button',
  type: 'button',
})

/* ── CVA variant definition ── */
const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2 shrink-0',
    'font-medium font-ds',
    'select-none whitespace-nowrap',
    'border border-transparent',
    // Transitions (overridden by motion-reduce)
    'transition-all duration-ds-base ease-ds-smooth',
    'motion-reduce:transition-none motion-reduce:transform-none',
    // Focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ds-ring-offset',
    // Disabled
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-ds-primary text-ds-primary-fg',
          'hover:bg-ds-primary-hover',
          'active:scale-[0.98]',
        ].join(' '),
        secondary: [
          'bg-ds-secondary text-ds-secondary-fg border-ds-border',
          'hover:bg-ds-secondary-hover',
          'active:scale-[0.98]',
        ].join(' '),
        ghost: [
          'bg-transparent text-ds-fg',
          'hover:bg-ds-bg-subtle',
          'active:scale-[0.98]',
        ].join(' '),
        destructive: [
          'bg-ds-danger text-ds-danger-fg',
          'hover:bg-ds-danger-hover',
          'active:scale-[0.98]',
        ].join(' '),
        link: [
          'bg-transparent text-ds-primary underline-offset-4',
          'hover:underline',
          'h-auto px-0 py-0',
        ].join(' '),
        outline: [
          'bg-transparent text-ds-fg border-ds-border',
          'hover:bg-ds-bg-subtle',
          'active:scale-[0.98]',
        ].join(' '),
      },
      size: {
        'sm': 'h-8 px-3 text-xs rounded-ds-sm gap-1.5',
        'md': 'h-10 px-4 text-sm rounded-ds-md',
        'lg': 'h-12 px-6 text-base rounded-ds-lg gap-2.5',
        'icon': 'h-10 w-10 rounded-ds-md',
        'icon-sm': 'h-8 w-8 rounded-ds-sm',
        'icon-lg': 'h-12 w-12 rounded-ds-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      rounded: {
        true: '!rounded-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      rounded: false,
    },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>

/* ── Props ── */
export interface DsButtonProps {
  /** Visual style of the button */
  variant?: ButtonVariants['variant']
  /** Size of the button */
  size?: ButtonVariants['size']
  /** Show loading spinner and disable interaction */
  loading?: boolean
  /** Disable the button */
  disabled?: boolean
  /** Expand to full container width */
  fullWidth?: ButtonVariants['fullWidth']
  /** Fully rounded (pill shape) */
  rounded?: ButtonVariants['rounded']
  /** Render as different HTML element */
  as?: 'button' | 'a'
  /** href when as="a" */
  href?: string
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset'
  /** Additional CSS classes */
  class?: string
}

/* ── Computed classes ── */
const classes = computed(() =>
  cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
      fullWidth: props.fullWidth,
      rounded: props.rounded,
    }),
    props.class,
  ),
)

/* ── Spinner size ── */
const spinnerSize = computed(() => {
  if (props.size === 'sm' || props.size === 'icon-sm')
    return 'size-3.5'
  if (props.size === 'lg' || props.size === 'icon-lg')
    return 'size-5'
  return 'size-4'
})
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :disabled="as === 'button' ? (disabled || loading) : undefined"
    :aria-disabled="disabled || loading ? true : undefined"
    :aria-busy="loading ? true : undefined"
    :href="as === 'a' ? href : undefined"
    :type="as === 'button' ? type : undefined"
  >
    <!-- Left icon slot -->
    <span v-if="$slots.leftIcon && !loading" class="shrink-0" aria-hidden="true">
      <slot name="leftIcon"></slot>
    </span>

    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="shrink-0 animate-ds-spin" :class="[spinnerSize]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Default slot (label) -->
    <slot></slot>

    <!-- Right icon slot -->
    <span v-if="$slots.rightIcon && !loading" class="shrink-0" aria-hidden="true">
      <slot name="rightIcon"></slot>
    </span>
  </component>
</template>
