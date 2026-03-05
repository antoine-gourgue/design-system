<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsDrawerFooterProps {
  class?: string
}

const props = defineProps<DsDrawerFooterProps>()
</script>

<template>
  <div :class="cn('shrink-0 border-t border-ds-border px-6 py-4 flex items-center gap-3', props.class)">
    <slot />
  </div>
</template>
