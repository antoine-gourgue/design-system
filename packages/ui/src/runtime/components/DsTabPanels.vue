<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsTabPanelsProps {
  class?: string
}

const props = defineProps<DsTabPanelsProps>()
</script>

<template>
  <div :class="cn('mt-4', props.class)">
    <slot></slot>
  </div>
</template>
