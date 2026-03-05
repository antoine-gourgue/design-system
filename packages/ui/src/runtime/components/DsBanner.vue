<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsBannerProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'default'
  dismissible?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsBannerProps>(), {
  variant: 'info',
  dismissible: true,
})

const visible = ref(true)

const variantClasses = {
  default: 'bg-ds-bg-subtle border-ds-border text-ds-fg',
  info: 'bg-ds-info-subtle border-ds-info/20 text-ds-info',
  success: 'bg-ds-success-subtle border-ds-success/20 text-ds-success',
  warning: 'bg-ds-warning-subtle border-ds-warning/20 text-ds-warning',
  danger: 'bg-ds-danger-subtle border-ds-danger/20 text-ds-danger',
}

const iconPaths: Record<string, string> = {
  default: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  danger: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="-translate-y-2 opacity-0"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="-translate-y-2 opacity-0"
  >
    <div
      v-if="visible"
      role="alert"
      :class="cn(
        'w-full flex items-center gap-3 px-4 py-3 border-b text-sm font-medium',
        variantClasses[variant],
        props.class,
      )"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" :d="iconPaths[variant]" />
      </svg>
      <div class="flex-1 text-sm">
        <slot></slot>
      </div>
      <button
        v-if="dismissible"
        type="button"
        aria-label="Dismiss"
        class="shrink-0 rounded-ds-sm p-0.5 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
        @click="visible = false"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>
