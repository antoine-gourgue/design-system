<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { cn } from '../utils/cn'
import DsButton from './DsButton.vue'

export interface DsAlertDialogProps {
  modelValue?: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  /** Styles the confirm button as destructive (red) */
  variant?: 'default' | 'destructive'
  loading?: boolean
}

const props = withDefaults(defineProps<DsAlertDialogProps>(), {
  modelValue: false,
  title: 'Are you sure?',
  description: 'This action cannot be undone.',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'default',
  loading: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

function close() { emit('update:modelValue', false) }
function confirm() { emit('confirm') }
function cancel() { emit('cancel'); close() }

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) cancel()
}

watch(() => props.modelValue, (val) => {
  if (val) {
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="alert-dialog-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="alertdialog"
        aria-modal="true"
        :aria-labelledby="title"
        :aria-describedby="description"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" @click="cancel" />

        <!-- Panel -->
        <Transition name="alert-dialog-scale">
          <div
            v-if="modelValue"
            class="relative w-full max-w-md rounded-ds-xl border border-ds-border bg-ds-bg-elevated shadow-ds-xl p-6 space-y-4"
          >
            <!-- Icon for destructive -->
            <div
              v-if="variant === 'destructive'"
              class="flex size-11 items-center justify-center rounded-full bg-ds-danger-subtle text-ds-danger mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>

            <!-- Text -->
            <div>
              <h2 class="text-base font-semibold text-ds-fg leading-snug">{{ title }}</h2>
              <p class="mt-1 text-sm text-ds-fg-muted leading-relaxed">
                <slot>{{ description }}</slot>
              </p>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-3 pt-2">
              <DsButton variant="ghost" :disabled="loading" @click="cancel">{{ cancelLabel }}</DsButton>
              <DsButton
                :variant="variant === 'destructive' ? 'danger' : 'default'"
                :loading="loading"
                @click="confirm"
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

<style scoped>
.alert-dialog-fade-enter-active,
.alert-dialog-fade-leave-active { transition: opacity 0.15s ease; }
.alert-dialog-fade-enter-from,
.alert-dialog-fade-leave-to { opacity: 0; }

.alert-dialog-scale-enter-active,
.alert-dialog-scale-leave-active { transition: transform 0.15s ease, opacity 0.15s ease; }
.alert-dialog-scale-enter-from,
.alert-dialog-scale-leave-to { transform: scale(0.96); opacity: 0; }
</style>
