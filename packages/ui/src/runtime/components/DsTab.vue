<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '../utils/cn'
import { DsTabsKey } from '../utils/tabs'

export interface DsTabProps {
  /** Unique id that matches DsTabPanel's `value` */
  value: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsTabProps>(), {
  disabled: false,
})

const tabs = inject(DsTabsKey)
const isActive = computed(() => tabs?.activeTab.value === props.value)
const variant = computed(() => tabs?.variant.value ?? 'line')

function activate() {
  if (props.disabled)
    return
  tabs?.setActive(props.value)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    activate()
  }
}

const tabClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center gap-1.5',
    'text-sm font-medium font-ds',
    'transition-all duration-ds-base ease-ds-smooth',
    'motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-1',
    'select-none whitespace-nowrap',
    props.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
  ]

  if (variant.value === 'line') {
    return cn(
      ...base,
      'px-4 py-2.5 -mb-px border-b-2',
      isActive.value
        ? 'border-ds-primary text-ds-primary'
        : 'border-transparent text-ds-fg-muted hover:text-ds-fg hover:border-ds-border-strong',
      props.class,
    )
  }

  if (variant.value === 'enclosed') {
    return cn(
      ...base,
      'px-3 py-1.5 rounded-ds-md',
      isActive.value
        ? 'bg-ds-bg-elevated text-ds-fg shadow-ds-sm'
        : 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted',
      props.class,
    )
  }

  // pills
  return cn(
    ...base,
    'px-3 py-1.5 rounded-full',
    isActive.value
      ? 'bg-ds-primary text-ds-primary-fg'
      : 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-subtle',
    props.class,
  )
})
</script>

<template>
  <button
    type="button"
    :class="tabClasses"
    role="tab"
    :aria-selected="isActive"
    :aria-disabled="disabled ? true : undefined"
    :tabindex="isActive ? 0 : -1"
    @click="activate"
    @keydown="handleKeydown"
  >
    <slot></slot>
  </button>
</template>
