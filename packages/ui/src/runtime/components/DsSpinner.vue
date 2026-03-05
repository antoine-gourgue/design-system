<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  class?: string
}

const props = withDefaults(defineProps<DsSpinnerProps>(), {
  size: 'md',
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'size-3'
    case 'sm': return 'size-4'
    case 'md': return 'size-5'
    case 'lg': return 'size-6'
    case 'xl': return 'size-8'
  }
})
</script>

<template>
  <svg
    :class="cn('animate-ds-spin text-current shrink-0', sizeClass, props.class)"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="status"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="3"
    />
    <path
      class="opacity-80"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
</template>
