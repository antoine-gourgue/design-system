<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsStatCardProps {
  label: string
  value: string | number
  /** e.g. "+12%" or "-3.4%" */
  trend?: string
  /** true = up (positive), false = down (negative) */
  trendUp?: boolean
  description?: string
  class?: string
}

const props = defineProps<DsStatCardProps>()

const trendClass = computed(() => {
  if (props.trend == null) return ''
  return props.trendUp
    ? 'text-ds-success'
    : 'text-ds-danger'
})
</script>

<template>
  <div
    :class="cn(
      'bg-ds-bg-elevated border border-ds-border rounded-ds-xl px-5 py-4 flex flex-col gap-3 shadow-ds-sm',
      props.class,
    )"
  >
    <!-- Label -->
    <p class="text-xs font-medium text-ds-fg-muted uppercase tracking-wide">{{ label }}</p>

    <!-- Value + trend row -->
    <div class="flex items-end justify-between gap-2">
      <p class="text-3xl font-bold text-ds-fg leading-none tracking-tight">{{ value }}</p>

      <span
        v-if="trend"
        :class="cn(
          'inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full',
          trendUp
            ? 'bg-ds-success-subtle text-ds-success'
            : 'bg-ds-danger-subtle text-ds-danger',
        )"
      >
        <!-- Arrow icon -->
        <svg
          v-if="trendUp"
          xmlns="http://www.w3.org/2000/svg" class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg" class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {{ trend }}
      </span>
    </div>

    <!-- Optional description -->
    <p v-if="description" class="text-xs text-ds-fg-subtle leading-relaxed">{{ description }}</p>

    <!-- Slot for custom content (e.g. sparkline) -->
    <slot />
  </div>
</template>
