<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsCardFooterProps {
  /** Add a top border separator */
  divided?: boolean
  /** Alignment of footer content */
  align?: 'left' | 'center' | 'right' | 'between'
  class?: string
}

const props = withDefaults(defineProps<DsCardFooterProps>(), {
  divided: true,
  align: 'right',
})

const alignClass: Record<NonNullable<DsCardFooterProps['align']>, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
}

const classes = computed(() =>
  cn(
    'flex flex-wrap items-center gap-3 px-6 py-4',
    alignClass[props.align ?? 'right'],
    props.divided && 'border-t border-ds-border',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
