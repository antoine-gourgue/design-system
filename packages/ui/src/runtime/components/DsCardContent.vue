<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsCardContentProps {
  /** Remove default padding */
  flush?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsCardContentProps>(), {
  flush: false,
})

const classes = computed(() =>
  cn(
    !props.flush && 'px-6 py-4',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
