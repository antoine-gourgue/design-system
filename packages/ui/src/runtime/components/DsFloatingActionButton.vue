<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsFabAction {
  id: string
  label: string
  icon?: string // SVG path d attribute
  onClick?: () => void
}

export interface DsFloatingActionButtonProps {
  label?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'ghost'
  actions?: DsFabAction[]
  fixed?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsFloatingActionButtonProps>(), {
  label: 'Open actions',
  position: 'bottom-right',
  size: 'md',
  variant: 'primary',
  actions: () => [],
  fixed: true,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const open = ref(false)

function toggle() {
  if (props.actions.length > 0) {
    open.value = !open.value
  }
  else {
    emit('click')
  }
}

function handleAction(action: DsFabAction) {
  action.onClick?.()
  open.value = false
}

const positionClasses = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6',
}

const sizeClasses = {
  sm: 'size-10',
  md: 'size-14',
  lg: 'size-16',
}

const iconSize = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-7',
}

const variantClasses = {
  primary: 'bg-ds-primary text-white hover:bg-ds-primary-hover shadow-lg shadow-ds-primary/25',
  secondary: 'bg-ds-bg-elevated border border-ds-border text-ds-fg hover:bg-ds-bg-muted shadow-lg',
  ghost: 'bg-ds-bg/80 backdrop-blur-sm border border-ds-border text-ds-fg hover:bg-ds-bg-muted shadow-md',
}
</script>

<template>
  <div
    :class="cn(
      fixed ? 'fixed' : 'absolute',
      positionClasses[position],
      'z-50 flex flex-col items-end gap-3',
      props.class,
    )"
  >
    <!-- Speed dial actions -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="open && actions.length > 0"
        class="flex flex-col items-end gap-2 mb-1"
      >
        <div
          v-for="action in [...actions].reverse()"
          :key="action.id"
          class="flex items-center gap-2 group"
        >
          <!-- Label tooltip -->
          <span class="text-xs font-medium text-ds-fg bg-ds-bg-elevated border border-ds-border shadow-sm rounded-ds-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {{ action.label }}
          </span>
          <!-- Mini FAB -->
          <button
            type="button"
            class="size-10 rounded-full bg-ds-bg-elevated border border-ds-border shadow-md text-ds-fg hover:bg-ds-bg-muted flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
            :aria-label="action.label"
            @click="() => handleAction(action)"
          >
            <svg
              v-if="action.icon"
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="action.icon" />
            </svg>
            <span v-else class="text-xs font-semibold">{{ action.label.charAt(0) }}</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Main FAB -->
    <button
      type="button"
      :class="cn(
        'rounded-full flex items-center justify-center transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2',
        sizeClasses[size],
        variantClasses[variant],
        open && actions.length > 0 ? 'rotate-45' : '',
      )"
      :aria-label="label"
      :aria-expanded="actions.length > 0 ? open : undefined"
      @click="toggle"
    >
      <!-- Plus icon (rotates to × when open) -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :class="iconSize[size]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>
