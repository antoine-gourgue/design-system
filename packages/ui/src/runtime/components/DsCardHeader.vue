<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsCardHeaderProps {
  /** Add a bottom border separator */
  divided?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsCardHeaderProps>(), {
  divided: false,
})

const classes = computed(() =>
  cn(
    'flex flex-col gap-1 px-6 py-5',
    props.divided && 'border-b border-ds-border',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
