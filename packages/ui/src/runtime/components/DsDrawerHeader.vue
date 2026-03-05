<script setup lang="ts">
import { inject } from 'vue'
import { cn } from '../utils/cn'

export interface DsDrawerHeaderProps {
  title?: string
  description?: string
  showClose?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsDrawerHeaderProps>(), {
  showClose: true,
})

const close = inject<() => void>('drawer:close')
</script>

<template>
  <div :class="cn('flex items-start justify-between gap-4 px-6 py-5 border-b border-ds-border shrink-0', props.class)">
    <div class="min-w-0 flex-1">
      <slot name="title">
        <h2 v-if="title" class="text-base font-semibold text-ds-fg leading-tight">
          {{ title }}
        </h2>
      </slot>
      <slot name="description">
        <p v-if="description" class="mt-1 text-sm text-ds-fg-muted">
          {{ description }}
        </p>
      </slot>
      <slot />
    </div>
    <button
      v-if="showClose"
      type="button"
      class="shrink-0 rounded-ds-md p-1.5 text-ds-fg-muted hover:bg-ds-bg-muted hover:text-ds-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
      aria-label="Close drawer"
      @click="close?.()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
