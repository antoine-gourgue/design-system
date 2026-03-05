<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsToggleGroupItem {
  value: string
  label: string
  icon?: string
  disabled?: boolean
}

export interface DsToggleGroupProps {
  modelValue?: string | string[]
  items: DsToggleGroupItem[]
  type?: 'single' | 'multiple'
  variant?: 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsToggleGroupProps>(), {
  type: 'single',
  variant: 'outline',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | string[]): void
}>()

const sizeClasses: Record<string, string> = {
  sm: 'h-8 px-2.5 text-xs',
  md: 'h-9 px-3 text-sm',
  lg: 'h-10 px-4 text-sm',
}

function isActive(value: string): boolean {
  if (Array.isArray(props.modelValue)) return props.modelValue.includes(value)
  return props.modelValue === value
}

function toggle(value: string) {
  if (props.type === 'single') {
    emit('update:modelValue', isActive(value) ? '' : value)
  } else {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const idx = current.indexOf(value)
    if (idx >= 0) current.splice(idx, 1)
    else current.push(value)
    emit('update:modelValue', current)
  }
}
</script>

<template>
  <div
    role="group"
    :class="cn('inline-flex items-center gap-1 rounded-ds-lg border border-ds-border bg-ds-bg p-1', props.class)"
  >
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      role="switch"
      :aria-pressed="isActive(item.value)"
      :data-state="isActive(item.value) ? 'on' : 'off'"
      :disabled="disabled || item.disabled"
      :class="cn(
        'inline-flex items-center justify-center rounded-ds-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring disabled:pointer-events-none disabled:opacity-50',
        sizeClasses[size],
        isActive(item.value)
          ? 'bg-ds-primary text-white shadow-sm'
          : 'bg-transparent text-ds-fg-muted hover:bg-ds-bg-muted hover:text-ds-fg'
      )"
      @click="toggle(item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
