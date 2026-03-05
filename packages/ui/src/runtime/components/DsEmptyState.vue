<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsEmptyStateProps {
  title: string
  description?: string
  class?: string
}

const props = defineProps<DsEmptyStateProps>()
</script>

<template>
  <div :class="cn('flex flex-col items-center justify-center py-16 px-6 text-center gap-5', props.class)">
    <!-- Icon slot — default: inbox icon -->
    <div class="flex items-center justify-center size-14 rounded-ds-xl bg-ds-bg-muted text-ds-fg-muted">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </slot>
    </div>

    <!-- Text -->
    <div class="flex flex-col gap-1 max-w-xs">
      <p class="text-base font-semibold text-ds-fg">
        {{ title }}
      </p>
      <p v-if="description" class="text-sm text-ds-fg-muted leading-relaxed">
        {{ description }}
      </p>
    </div>

    <!-- CTA slot -->
    <div v-if="$slots.default" class="flex items-center gap-3 flex-wrap justify-center">
      <slot></slot>
    </div>
  </div>
</template>
