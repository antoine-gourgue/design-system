<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsPaginationProps {
  /** Current page — use with v-model */
  modelValue: number
  /** Total number of items */
  total: number
  /** Items per page */
  perPage?: number
  /** Number of sibling pages shown on each side of the current page */
  siblings?: number
  /** Always show first and last page buttons */
  showEdges?: boolean
  /** Disable all interactions */
  disabled?: boolean
}

const props = withDefaults(defineProps<DsPaginationProps>(), {
  perPage: 10,
  siblings: 1,
  showEdges: true,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', page: number): void
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / (props.perPage ?? 10))))

/**
 * Build the page list with ellipsis markers.
 * Returns an array of numbers and the string 'ellipsis'.
 */
const pages = computed((): (number | 'ellipsis')[] => {
  const total = totalPages.value
  const current = props.modelValue
  const siblings = props.siblings ?? 1
  const showEdges = props.showEdges

  // Window = [current - siblings … current + siblings]
  const windowStart = Math.max(showEdges ? 2 : 1, current - siblings)
  const windowEnd = Math.min(showEdges ? total - 1 : total, current + siblings)

  const items: (number | 'ellipsis')[] = []

  if (showEdges) {
    items.push(1)
    if (windowStart > 2)
      items.push('ellipsis')
  }

  for (let p = windowStart; p <= windowEnd; p++) {
    items.push(p)
  }

  if (showEdges) {
    if (windowEnd < total - 1)
      items.push('ellipsis')
    if (total > 1)
      items.push(total)
  }

  // Deduplicate (edge case: windowStart === 1)
  return items.filter((v, i, arr) => arr.indexOf(v) === i)
})

function go(page: number) {
  if (props.disabled)
    return
  const clamped = Math.max(1, Math.min(totalPages.value, page))
  if (clamped !== props.modelValue) {
    emit('update:modelValue', clamped)
  }
}

// Base button classes
function btn(active: boolean, disabled: boolean) {
  return cn(
    'inline-flex items-center justify-center h-9 min-w-9 px-2 rounded-ds-md text-sm font-medium transition-colors select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-1',
    active
      ? 'bg-ds-primary text-ds-primary-fg pointer-events-none'
      : disabled
        ? 'text-ds-fg-subtle cursor-not-allowed'
        : 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted cursor-pointer',
  )
}
</script>

<template>
  <nav
    role="navigation"
    aria-label="Pagination"
    :class="cn('flex items-center gap-1', disabled && 'opacity-50 pointer-events-none')"
  >
    <!-- Previous -->
    <button
      type="button"
      :disabled="disabled || modelValue <= 1"
      aria-label="Go to previous page"
      :class="btn(false, modelValue <= 1)"
      @click="go(modelValue - 1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Pages + ellipsis -->
    <template v-for="(item, i) in pages" :key="i">
      <!-- Ellipsis -->
      <span
        v-if="item === 'ellipsis'"
        class="inline-flex items-center justify-center h-9 min-w-9 text-sm text-ds-fg-subtle select-none"
        aria-hidden="true"
      >
        &hellip;
      </span>

      <!-- Page button -->
      <button
        v-else
        type="button"
        :disabled="disabled"
        :aria-label="`Go to page ${item}`"
        :aria-current="item === modelValue ? 'page' : undefined"
        :class="btn(item === modelValue, false)"
        @click="go(item)"
      >
        {{ item }}
      </button>
    </template>

    <!-- Next -->
    <button
      type="button"
      :disabled="disabled || modelValue >= totalPages"
      aria-label="Go to next page"
      :class="btn(false, modelValue >= totalPages)"
      @click="go(modelValue + 1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</template>
