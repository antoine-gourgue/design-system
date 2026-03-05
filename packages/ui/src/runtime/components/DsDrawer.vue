<script setup lang="ts">
import { onUnmounted, provide, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsDrawerProps {
  modelValue?: boolean
  side?: 'left' | 'right' | 'bottom' | 'top'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  class?: string
}

const props = withDefaults(defineProps<DsDrawerProps>(), {
  modelValue: false,
  side: 'right',
  size: 'md',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

function close() {
  emit('update:modelValue', false)
  emit('close')
}

provide('drawer:close', close)
provide('drawer:side', () => props.side)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue)
    close()
}

watch(() => props.modelValue, (val) => {
  if (val) {
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
  }
  else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

const sizeClasses: Record<NonNullable<DsDrawerProps['side']>, Record<NonNullable<DsDrawerProps['size']>, string>> = {
  left: { sm: 'w-64', md: 'w-80', lg: 'w-[480px]', xl: 'w-[600px]', full: 'w-screen' },
  right: { sm: 'w-64', md: 'w-80', lg: 'w-[480px]', xl: 'w-[600px]', full: 'w-screen' },
  bottom: { sm: 'h-48', md: 'h-72', lg: 'h-96', xl: 'h-[520px]', full: 'h-screen' },
  top: { sm: 'h-48', md: 'h-72', lg: 'h-96', xl: 'h-[520px]', full: 'h-screen' },
}

const positionClasses: Record<NonNullable<DsDrawerProps['side']>, string> = {
  right: 'right-0 top-0 h-full flex-col',
  left: 'left-0 top-0 h-full flex-col',
  bottom: 'bottom-0 left-0 w-full flex-col rounded-t-ds-xl',
  top: 'top-0 left-0 w-full flex-col rounded-b-ds-xl',
}

const borderClasses: Record<NonNullable<DsDrawerProps['side']>, string> = {
  right: 'border-l',
  left: 'border-r',
  bottom: 'border-t',
  top: 'border-b',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-overlay">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-ds-overlay"
          aria-hidden="true"
          @click="close"
        ></div>

        <!-- Panel -->
        <Transition :name="`drawer-slide-${side}`">
          <div
            v-if="modelValue"
            :class="cn(
              'absolute flex bg-ds-bg-elevated border-ds-border shadow-ds-xl',
              positionClasses[side],
              borderClasses[side],
              sizeClasses[side][size],
              props.class,
            )"
          >
            <!-- Drag handle for top/bottom drawers -->
            <div
              v-if="side === 'bottom' || side === 'top'"
              class="flex justify-center pt-3 pb-1 shrink-0"
            >
              <div class="w-10 h-1 rounded-full bg-ds-border-strong opacity-50"></div>
            </div>

            <!-- Slot content (DsDrawerHeader + DsDrawerContent + DsDrawerFooter) -->
            <slot></slot>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-overlay-enter-active,
.drawer-overlay-leave-active { transition: opacity 0.2s ease; }
.drawer-overlay-enter-from,
.drawer-overlay-leave-to { opacity: 0; }

.drawer-slide-right-enter-active,
.drawer-slide-right-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-slide-right-enter-from,
.drawer-slide-right-leave-to { transform: translateX(100%); }

.drawer-slide-left-enter-active,
.drawer-slide-left-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-slide-left-enter-from,
.drawer-slide-left-leave-to { transform: translateX(-100%); }

.drawer-slide-bottom-enter-active,
.drawer-slide-bottom-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-slide-bottom-enter-from,
.drawer-slide-bottom-leave-to { transform: translateY(100%); }

.drawer-slide-top-enter-active,
.drawer-slide-top-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-slide-top-enter-from,
.drawer-slide-top-leave-to { transform: translateY(-100%); }
</style>
