<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsDrawerContentProps {
  class?: string
}

const props = defineProps<DsDrawerContentProps>()
</script>

<template>
  <div :class="cn('flex-1 overflow-y-auto px-6 py-5', props.class)">
    <slot />
  </div>
</template>
