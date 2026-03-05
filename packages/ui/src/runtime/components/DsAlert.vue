<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const alertVariants = cva(
  'relative w-full rounded-ds-lg border px-4 py-3.5 text-sm font-ds',
  {
    variants: {
      variant: {
        default: 'bg-ds-bg-subtle border-ds-border text-ds-fg',
        info: 'bg-ds-info-subtle border-ds-info/20 text-ds-fg [&>svg]:text-ds-info',
        success: 'bg-ds-success-subtle border-ds-success/20 text-ds-fg [&>svg]:text-ds-success',
        warning: 'bg-ds-warning-subtle border-ds-warning/20 text-ds-fg [&>svg]:text-ds-warning',
        destructive: 'bg-ds-danger-subtle border-ds-danger/20 text-ds-fg [&>svg]:text-ds-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type AlertVariants = VariantProps<typeof alertVariants>

export interface DsAlertProps {
  variant?: AlertVariants['variant']
  title?: string
  class?: string
}

const props = withDefaults(defineProps<DsAlertProps>(), {
  variant: 'default',
})

const classes = computed(() => cn(alertVariants({ variant: props.variant }), props.class))

const iconPaths: Record<NonNullable<AlertVariants['variant']>, string> = {
  default: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  destructive: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
}

const iconPath = computed(() => iconPaths[props.variant ?? 'default'])
</script>

<template>
  <div :class="classes" role="alert">
    <div class="flex gap-3">
      <!-- Icon -->
      <svg
        class="size-4 shrink-0 mt-0.5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" :d="iconPath" />
      </svg>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <p v-if="title" class="font-semibold leading-snug mb-1">{{ title }}</p>
        <div class="text-ds-fg-muted leading-relaxed [&>p]:m-0">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
