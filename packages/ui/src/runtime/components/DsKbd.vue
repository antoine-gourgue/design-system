<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { computed } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(defineProps<{
  size?: KbdVariants['size']
  class?: string
}>(), {
  size: 'md',
})

const kbdVariants = cva(
  'inline-flex items-center justify-center font-mono font-medium border rounded leading-none select-none',
  {
    variants: {
      size: {
        sm: 'text-[10px] px-1.5 py-0.5 min-w-[1.25rem] gap-0.5',
        md: 'text-xs px-2 py-1 min-w-[1.5rem] gap-1',
        lg: 'text-sm px-2.5 py-1.5 min-w-[1.75rem] gap-1',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

type KbdVariants = VariantProps<typeof kbdVariants>

const classes = computed(() =>
  cn(
    kbdVariants({ size: props.size }),
    'bg-ds-bg-subtle text-ds-fg-muted border-ds-border shadow-[0_1px_0_0_var(--ds-border)]',
    props.class,
  ),
)
</script>

<template>
  <kbd :class="classes"><slot></slot></kbd>
</template>
