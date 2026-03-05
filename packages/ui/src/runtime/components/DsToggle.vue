<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '../utils/cn'

export interface DsToggleProps {
  modelValue?: boolean
  variant?: 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsToggleProps>(), {
  modelValue: false,
  variant: 'outline',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const toggle = cva(
  'inline-flex items-center justify-center rounded-ds-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        outline: 'border border-ds-border bg-ds-bg hover:bg-ds-bg-muted data-[state=on]:border-ds-primary data-[state=on]:bg-ds-primary-subtle data-[state=on]:text-ds-primary',
        ghost: 'bg-transparent hover:bg-ds-bg-muted data-[state=on]:bg-ds-primary-subtle data-[state=on]:text-ds-primary',
      },
      size: {
        sm: 'h-8 px-2.5 text-xs gap-1.5',
        md: 'h-9 px-3 text-sm gap-2',
        lg: 'h-10 px-4 text-sm gap-2',
      },
    },
    defaultVariants: { variant: 'outline', size: 'md' },
  },
)
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-pressed="modelValue"
    :data-state="modelValue ? 'on' : 'off'"
    :disabled="disabled"
    :class="cn(toggle({ variant, size }), props.class)"
    @click="emit('update:modelValue', !modelValue)"
  >
    <slot></slot>
  </button>
</template>
