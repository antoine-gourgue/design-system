<script setup lang="ts">
import { provide, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsAccordionProps {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  class?: string
}

const props = withDefaults(defineProps<DsAccordionProps>(), {
  type: 'single',
})

const openItems = ref<Set<string>>(
  new Set(
    props.defaultValue
      ? Array.isArray(props.defaultValue)
        ? props.defaultValue
        : [props.defaultValue]
      : [],
  ),
)

function toggle(value: string) {
  if (props.type === 'single') {
    if (openItems.value.has(value)) {
      openItems.value = new Set()
    } else {
      openItems.value = new Set([value])
    }
  } else {
    const next = new Set(openItems.value)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    openItems.value = next
  }
}

provide('accordion', { openItems, toggle })
</script>

<template>
  <div :class="cn('w-full font-ds', props.class)">
    <slot />
  </div>
</template>
