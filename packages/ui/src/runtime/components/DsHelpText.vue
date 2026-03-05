<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsHelpTextProps {
  /** ID so the associated input can reference it via aria-describedby */
  id?: string
  /** Display as error text (red) */
  error?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsHelpTextProps>(), {
  error: false,
})

const classes = computed(() =>
  cn(
    'text-xs font-ds leading-normal',
    'transition-colors duration-ds-fast',
    props.error ? 'text-ds-danger' : 'text-ds-fg-muted',
    props.class,
  ),
)
</script>

<template>
  <p :id="id" :class="classes" :role="error ? 'alert' : undefined">
    <slot></slot>
  </p>
</template>
