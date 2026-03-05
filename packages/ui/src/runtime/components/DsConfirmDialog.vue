<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsConfirmDialogProps {
  modelValue?: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'primary'
  loading?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsConfirmDialogProps>(), {
  modelValue: false,
  title: 'Are you sure?',
  description: 'This action cannot be undone.',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'danger',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

function onConfirm() {
  emit('confirm')
}

function onCancel() {
  emit('update:modelValue', false)
  emit('cancel')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') onCancel()
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="alertdialog"
        aria-modal="true"
        @keydown="onKeydown"
      >
        <div class="absolute inset-0 bg-ds-overlay" @click="onCancel" />
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="scale-95 opacity-0"
          leave-active-class="transition duration-100 ease-in"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-if="modelValue"
            :class="cn(
              'relative z-10 w-full max-w-sm bg-ds-bg rounded-ds-xl border border-ds-border shadow-ds-xl p-6 space-y-4',
              props.class,
            )"
          >
            <div
              v-if="variant === 'danger'"
              class="mx-auto w-10 h-10 rounded-full bg-ds-danger-subtle flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-ds-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div
              v-else
              class="mx-auto w-10 h-10 rounded-full bg-ds-primary-subtle flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-ds-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="text-center space-y-1.5">
              <h2 class="text-base font-semibold text-ds-fg">{{ title }}</h2>
              <p class="text-sm text-ds-fg-muted">{{ description }}</p>
            </div>
            <slot />
            <div class="flex gap-3 pt-1">
              <DsButton variant="outline" class="flex-1" :disabled="loading" @click="onCancel">
                {{ cancelLabel }}
              </DsButton>
              <DsButton
                :variant="variant === 'danger' ? 'destructive' : 'primary'"
                class="flex-1"
                :loading="loading"
                @click="onConfirm"
              >
                {{ confirmLabel }}
              </DsButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
