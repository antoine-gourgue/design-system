<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsModalProps {
  /** Control visibility via v-model */
  modelValue?: boolean
  /** Modal title (rendered in header) */
  title?: string
  /** Descriptive text below title */
  description?: string
  /** Size of the modal dialog */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Close on backdrop click */
  closeOnBackdrop?: boolean
  /** Close on ESC key */
  closeOnEsc?: boolean
  /** Show close button in header */
  showClose?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsModalProps>(), {
  modelValue: false,
  size: 'md',
  closeOnBackdrop: true,
  closeOnEsc: true,
  showClose: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'open': []
}>()

/* ── Size map ── */
const sizeClass: Record<NonNullable<DsModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
}

/* ── Focus trap ── */
const dialogRef = ref<HTMLElement | null>(null)
const previousFocus = ref<HTMLElement | null>(null)

function getFocusableElements(): HTMLElement[] {
  if (!dialogRef.value)
    return []
  return Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(el => !el.hasAttribute('disabled'))
}

function trapFocus(event: KeyboardEvent) {
  if (!props.modelValue)
    return
  const focusable = getFocusableElements()
  if (!focusable.length)
    return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    }
    else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}

function handleEsc(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnEsc && props.modelValue) {
    close()
  }
}

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (props.closeOnBackdrop && event.target === event.currentTarget) {
    close()
  }
}

/* ── Body scroll lock ── */
watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      previousFocus.value = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      emit('open')
      await nextTick()
      const focusable = getFocusableElements()
      if (focusable.length)
        focusable[0].focus()
    }
    else {
      document.body.style.overflow = ''
      await nextTick()
      previousFocus.value?.focus()
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', handleEsc)
  document.addEventListener('keydown', trapFocus)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEsc)
  document.removeEventListener('keydown', trapFocus)
  document.body.style.overflow = ''
})

const dialogClasses = computed(() =>
  cn(
    'relative w-full bg-ds-bg-elevated rounded-ds-xl shadow-ds-xl',
    'border border-ds-border',
    'animate-ds-scale-in',
    'motion-reduce:animate-none',
    sizeClass[props.size ?? 'md'],
    props.class,
  ),
)
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-ds-slow ease-ds-out"
      leave-active-class="transition-opacity duration-ds-base ease-ds-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        style="background-color: var(--ds-overlay)"
        role="presentation"
        @click="handleBackdropClick"
      >
        <!-- Dialog -->
        <div
          ref="dialogRef"
          :class="dialogClasses"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="title ? 'ds-modal-title' : undefined"
          :aria-describedby="description ? 'ds-modal-description' : undefined"
          @click.stop
        >
          <!-- Header -->
          <div
            v-if="title || $slots.header || showClose"
            class="flex items-start justify-between gap-4 px-6 py-5 border-b border-ds-border"
          >
            <div v-if="$slots.header">
              <slot name="header"></slot>
            </div>
            <div v-else class="flex-1 min-w-0">
              <h2
                v-if="title"
                id="ds-modal-title"
                class="text-base font-semibold font-ds text-ds-fg leading-tight"
              >
                {{ title }}
              </h2>
              <p
                v-if="description"
                id="ds-modal-description"
                class="mt-1 text-sm text-ds-fg-muted font-ds"
              >
                {{ description }}
              </p>
            </div>
            <button
              v-if="showClose"
              type="button"
              class="shrink-0 rounded-ds-sm p-1 text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-subtle transition-colors duration-ds-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
              aria-label="Close modal"
              @click="close"
            >
              <!-- X icon -->
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

          <!-- Body -->
          <div class="px-6 py-5">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="flex flex-wrap items-center justify-end gap-3 px-6 py-4 border-t border-ds-border"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
