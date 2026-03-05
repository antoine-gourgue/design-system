<script setup lang="ts">
import { useToast } from '../composables/useToast'
import DsToast from './DsToast.vue'

export interface DsToastProviderProps {
  /** Screen position of the toast stack */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  /** Max toasts shown simultaneously */
  max?: number
}

const { position, max } = withDefaults(defineProps<DsToastProviderProps>(), {
  position: 'bottom-right',
  max: 5,
})

const { toasts, dismiss } = useToast()

const positionClasses: Record<NonNullable<DsToastProviderProps['position']>, string> = {
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed z-[9999] flex flex-col gap-2 pointer-events-none" :class="[
        positionClasses[position],
      ]"
      aria-label="Notifications"
      role="region"
      aria-live="polite"
    >
      <TransitionGroup
        tag="div"
        class="flex flex-col gap-2"
        enter-active-class="transition-all duration-ds-slow ease-ds-out"
        leave-active-class="transition-all duration-ds-base ease-ds-in absolute w-full"
        enter-from-class="opacity-0 translate-y-2 scale-95"
        leave-to-class="opacity-0 scale-95"
        move-class="transition-transform duration-ds-slow"
      >
        <DsToast
          v-for="toast in [...toasts].reverse().slice(0, max)"
          :key="toast.id"
          :toast="toast"
          :on-dismiss="dismiss"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>
