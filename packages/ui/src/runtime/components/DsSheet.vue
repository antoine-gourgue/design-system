<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { cn } from '../utils/cn'

export interface DsSheetProps {
  modelValue?: boolean
  side?: 'left' | 'right' | 'bottom' | 'top'
  size?: 'sm' | 'md' | 'lg' | 'full'
  title?: string
  description?: string
  class?: string
}

const props = withDefaults(defineProps<DsSheetProps>(), {
  modelValue: false,
  side: 'right',
  size: 'md',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}

// ESC to close
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) close()
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

const sizeMap: Record<string, Record<string, string>> = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-[480px]',
    full: 'w-screen',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-[480px]',
    full: 'w-screen',
  },
  top: {
    sm: 'h-48',
    md: 'h-72',
    lg: 'h-96',
    full: 'h-screen',
  },
  bottom: {
    sm: 'h-48',
    md: 'h-72',
    lg: 'h-96',
    full: 'h-screen',
  },
}

const panelBase: Record<string, string> = {
  left: 'left-0 top-0 h-full flex-col',
  right: 'right-0 top-0 h-full flex-col',
  top: 'top-0 left-0 w-full flex-col',
  bottom: 'bottom-0 left-0 w-full flex-col',
}

const enterFrom: Record<string, string> = {
  left: '-translate-x-full',
  right: 'translate-x-full',
  top: '-translate-y-full',
  bottom: 'translate-y-full',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
          @click="close"
        />

        <!-- Panel -->
        <Transition :name="`sheet-slide-${side}`">
          <div
            v-if="modelValue"
            :class="cn(
              'absolute flex bg-ds-bg-elevated border-ds-border shadow-ds-xl',
              panelBase[side],
              side === 'left' || side === 'right' ? 'border-r' : 'border-b',
              side === 'right' && 'border-l border-r-0',
              side === 'top' && 'border-b border-t-0',
              sizeMap[side][size],
              props.class,
            )"
          >
            <!-- Header -->
            <div class="flex items-start justify-between gap-4 px-6 py-5 border-b border-ds-border">
              <div>
                <h2 v-if="title" class="text-base font-semibold text-ds-fg">{{ title }}</h2>
                <p v-if="description" class="mt-0.5 text-sm text-ds-fg-muted">{{ description }}</p>
                <slot v-if="!title && !description" name="header" />
              </div>
              <button
                type="button"
                class="shrink-0 rounded-ds-md p-1.5 text-ds-fg-muted hover:bg-ds-bg-muted hover:text-ds-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
                aria-label="Close"
                @click="close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto px-6 py-5">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="border-t border-ds-border px-6 py-4 flex items-center gap-3">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-fade-enter-active,
.sheet-fade-leave-active { transition: opacity 0.2s ease; }
.sheet-fade-enter-from,
.sheet-fade-leave-to { opacity: 0; }

.sheet-slide-right-enter-active,
.sheet-slide-right-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.sheet-slide-right-enter-from,
.sheet-slide-right-leave-to { transform: translateX(100%); }

.sheet-slide-left-enter-active,
.sheet-slide-left-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.sheet-slide-left-enter-from,
.sheet-slide-left-leave-to { transform: translateX(-100%); }

.sheet-slide-bottom-enter-active,
.sheet-slide-bottom-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.sheet-slide-bottom-enter-from,
.sheet-slide-bottom-leave-to { transform: translateY(100%); }

.sheet-slide-top-enter-active,
.sheet-slide-top-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.sheet-slide-top-enter-from,
.sheet-slide-top-leave-to { transform: translateY(-100%); }
</style>
