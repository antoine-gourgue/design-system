<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsScrollAreaProps {
  maxHeight?: string
  maxWidth?: string
  orientation?: 'vertical' | 'horizontal' | 'both'
  class?: string
}

const props = withDefaults(defineProps<DsScrollAreaProps>(), {
  orientation: 'vertical',
})

const overflowClass: Record<string, string> = {
  vertical: 'overflow-y-auto overflow-x-hidden',
  horizontal: 'overflow-x-auto overflow-y-hidden',
  both: 'overflow-auto',
}
</script>

<template>
  <div
    :class="cn(
      'relative rounded-ds-md ds-scroll-area',
      overflowClass[orientation],
      props.class,
    )"
    :style="{
      maxHeight,
      maxWidth,
    }"
  >
    <slot></slot>
  </div>
</template>

<style>
/* Custom thin scrollbar using design tokens */
.ds-scroll-area {
  scrollbar-width: thin;
  scrollbar-color: var(--ds-border) transparent;
}
.ds-scroll-area::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.ds-scroll-area::-webkit-scrollbar-track {
  background: transparent;
}
.ds-scroll-area::-webkit-scrollbar-thumb {
  background-color: var(--ds-border);
  border-radius: 9999px;
}
.ds-scroll-area::-webkit-scrollbar-thumb:hover {
  background-color: var(--ds-fg-muted);
}
</style>
