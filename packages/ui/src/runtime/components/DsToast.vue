<script setup lang="ts">
import type { ToastItem } from '../composables/useToast'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed } from 'vue'
import { cn } from '../utils/cn'

const props = defineProps<DsToastSingleProps>()

const toastVariants = cva(
  [
    'relative flex items-start gap-3 w-full max-w-sm',
    'rounded-ds-lg border p-4',
    'shadow-ds-lg',
    'font-ds',
    'pointer-events-auto',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-ds-bg-elevated text-ds-fg border-ds-border',
        success: 'bg-ds-success-subtle text-ds-fg border-ds-success border-opacity-20',
        error: 'bg-ds-danger-subtle text-ds-fg border-ds-danger border-opacity-20',
        warning: 'bg-ds-warning-subtle text-ds-fg border-ds-warning border-opacity-20',
        info: 'bg-ds-primary-subtle text-ds-fg border-ds-primary border-opacity-20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type ToastVariants = VariantProps<typeof toastVariants>

/* ── Icons per variant ── */
const variantIcon: Record<string, { path: string, color: string }> = {
  default: {
    path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'text-ds-fg-muted',
  },
  success: {
    path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'text-ds-success',
  },
  error: {
    path: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'text-ds-danger',
  },
  warning: {
    path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    color: 'text-ds-warning',
  },
  info: {
    path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'text-ds-primary',
  },
}

export interface DsToastSingleProps {
  toast: ToastItem
  onDismiss?: (id: string) => void
}

const classes = computed(() =>
  cn(toastVariants({ variant: props.toast.variant as ToastVariants['variant'] })),
)

const icon = computed(() => variantIcon[props.toast.variant ?? 'default'] ?? variantIcon.default)
</script>

<template>
  <div :class="classes" role="alert" aria-live="polite" aria-atomic="true">
    <!-- Icon -->
    <svg
      class="size-5 shrink-0 mt-0.5"
      :class="icon.color"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" :d="icon.path" />
    </svg>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold leading-snug text-ds-fg">
        {{ toast.title }}
      </p>
      <p v-if="toast.description" class="mt-1 text-sm text-ds-fg-muted leading-normal">
        {{ toast.description }}
      </p>
    </div>

    <!-- Dismiss button -->
    <button
      v-if="toast.dismissible"
      type="button"
      class="shrink-0 rounded-ds-xs p-0.5 text-ds-fg-muted hover:text-ds-fg
             transition-colors duration-ds-fast
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
      aria-label="Dismiss notification"
      @click="onDismiss?.(toast.id)"
    >
      <svg
        class="size-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
