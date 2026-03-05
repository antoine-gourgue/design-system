<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsSeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  class?: string
}

const props = withDefaults(defineProps<DsSeparatorProps>(), {
  orientation: 'horizontal',
})

const classes = computed(() =>
  cn(
    'shrink-0 bg-ds-border',
    props.orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
    props.class,
  ),
)
</script>

<template>
  <div
    :class="classes"
    role="separator"
    :aria-orientation="orientation"
  ></div>
</template>
