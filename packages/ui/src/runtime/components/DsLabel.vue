<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsLabelProps {
  /** The id of the input this label is for */
  for?: string
  /** Mark the field as required */
  required?: boolean
  /** Mark the field as disabled (muted style) */
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsLabelProps>(), {
  required: false,
  disabled: false,
})

const classes = computed(() =>
  cn(
    'block text-sm font-medium font-ds leading-none',
    'transition-colors duration-ds-fast',
    props.disabled ? 'text-ds-fg-subtle cursor-not-allowed' : 'text-ds-fg',
    props.class,
  ),
)
</script>

<template>
  <label :for="props.for" :class="classes">
    <slot></slot>
    <span v-if="required" class="ml-1 text-ds-danger" aria-hidden="true">*</span>
  </label>
</template>
