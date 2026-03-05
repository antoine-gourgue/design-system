<script setup lang="ts">
import { inject, computed } from 'vue'
import { DsTabsKey } from '../utils/tabs'
import { cn } from '../utils/cn'

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
    <slot />
  </div>
</template>
