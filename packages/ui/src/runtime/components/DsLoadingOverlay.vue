<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsLoadingOverlayProps {
  visible?: boolean
  label?: string
  blur?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsLoadingOverlayProps>(), {
  visible: false,
  blur: true,
})
</script>

<template>
  <div :class="cn('relative', props.class)">
    <slot></slot>
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[inherit] bg-ds-bg/60"
        :class="[blur ? 'backdrop-blur-[2px]' : '']"
        aria-busy="true"
        aria-live="polite"
        :aria-label="label ?? 'Loading'"
      >
        <DsSpinner size="lg" />
        <span v-if="label" class="text-sm font-medium text-ds-fg-muted">{{ label }}</span>
      </div>
    </Transition>
  </div>
</template>
