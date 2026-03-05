<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors select-none',
  {
    variants: {
      variant: {
        default: 'bg-ds-bg-muted text-ds-fg border border-ds-border',
        primary: 'bg-ds-primary-subtle text-ds-primary border border-ds-primary/20',
        success: 'bg-ds-success-subtle text-ds-success border border-ds-success/20',
        danger: 'bg-ds-danger-subtle text-ds-danger border border-ds-danger/20',
        warning: 'bg-ds-warning-subtle text-ds-warning border border-ds-warning/20',
        info: 'bg-ds-info-subtle text-ds-info border border-ds-info/20',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)

type TagVariants = VariantProps<typeof tagVariants>

export interface DsTagProps {
  variant?: TagVariants['variant']
  size?: TagVariants['size']
  removable?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsTagProps>(), {
  variant: 'default',
  size: 'md',
  removable: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const classes = computed(() => cn(tagVariants({ variant: props.variant, size: props.size }), props.class))
</script>

<template>
  <span :class="classes">
    <slot />
    <button
      v-if="removable && !disabled"
      type="button"
      aria-label="Remove"
      class="inline-flex items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-opacity -mr-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
      @click.stop="emit('remove')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>
