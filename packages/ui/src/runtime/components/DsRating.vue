<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsRatingProps {
  modelValue?: number
  max?: number
  readonly?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<DsRatingProps>(), {
  modelValue: 0,
  max: 5,
  readonly: false,
  disabled: false,
  size: 'md',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const hovered = ref(0)

const sizes: Record<string, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
}

function isFilled(star: number): boolean {
  const active = hovered.value || props.modelValue || 0
  return star <= active
}

function handleClick(star: number) {
  if (props.readonly || props.disabled) return
  // Toggle off if clicking same value
  emit('update:modelValue', star === props.modelValue ? 0 : star)
}
</script>

<template>
  <div
    :class="cn('flex items-center gap-0.5', props.class)"
    role="radiogroup"
    :aria-label="`Rating: ${modelValue} out of ${max}`"
  >
    <button
      v-for="star in max"
      :key="star"
      type="button"
      :disabled="readonly || disabled"
      :aria-label="`${star} star${star > 1 ? 's' : ''}`"
      :aria-pressed="star === modelValue"
      :class="cn(
        'transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring rounded-sm',
        !readonly && !disabled && 'hover:scale-110 cursor-pointer',
        (readonly || disabled) && 'cursor-default',
        disabled && 'opacity-50',
      )"
      @mouseenter="readonly || disabled ? undefined : (hovered = star)"
      @mouseleave="readonly || disabled ? undefined : (hovered = 0)"
      @click="handleClick(star)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :class="cn(
          sizes[size],
          'transition-colors',
          isFilled(star)
            ? 'fill-ds-warning text-ds-warning'
            : 'fill-none text-ds-border',
        )"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      >
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </button>
  </div>
</template>
