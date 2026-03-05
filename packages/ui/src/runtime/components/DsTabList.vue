<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '../utils/cn'
import { DsTabsKey } from '../utils/tabs'

export interface DsTabListProps {
  class?: string
}

const props = defineProps<DsTabListProps>()

const tabs = inject(DsTabsKey)

const variant = computed(() => tabs?.variant.value ?? 'line')

const listClasses = computed(() => {
  const base = 'flex items-center'
  const variants: Record<string, string> = {
    line: cn(base, 'gap-0 border-b border-ds-border'),
    enclosed: cn(base, 'gap-1 p-1 bg-ds-bg-subtle rounded-ds-lg'),
    pills: cn(base, 'gap-1'),
  }
  return cn(variants[variant.value] ?? variants.line, props.class)
})
</script>

<template>
  <div :class="listClasses" role="tablist">
    <slot></slot>
  </div>
</template>
