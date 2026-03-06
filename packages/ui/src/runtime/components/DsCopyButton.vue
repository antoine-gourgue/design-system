<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsCopyButtonProps {
  text: string
  label?: string
  successLabel?: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  timeout?: number
  class?: string
}

const props = withDefaults(defineProps<DsCopyButtonProps>(), {
  label: 'Copy',
  successLabel: 'Copied!',
  variant: 'outline',
  size: 'md',
  timeout: 1800,
})

const copied = ref(false)

async function copy() {
  if (copied.value)
    return
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, props.timeout)
  }
  catch {
    // Fallback: create a temporary textarea
    const ta = document.createElement('textarea')
    ta.value = props.text
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, props.timeout)
  }
}

const sizeClasses = {
  sm: 'h-7 px-2.5 text-xs gap-1.5',
  md: 'h-9 px-3 text-sm gap-2',
  lg: 'h-11 px-4 text-sm gap-2.5',
}

const variantClasses = {
  default: 'bg-ds-bg-muted border border-ds-border text-ds-fg hover:bg-ds-bg-elevated',
  ghost: 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted',
  outline: 'border border-ds-border text-ds-fg-muted hover:text-ds-fg hover:border-ds-fg/30 hover:bg-ds-bg-muted',
}
</script>

<template>
  <button
    type="button"
    :class="cn(
      'inline-flex items-center justify-center rounded-ds-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring select-none',
      sizeClasses[size],
      copied ? 'text-ds-success border-ds-success/30 bg-ds-success/8' : variantClasses[variant],
      props.class,
    )"
    :aria-label="copied ? successLabel : label"
    @click="copy"
  >
    <!-- Copy icon -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
      mode="out-in"
    >
      <svg
        v-if="!copied"
        key="copy"
        xmlns="http://www.w3.org/2000/svg"
        class="size-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <svg
        v-else
        key="check"
        xmlns="http://www.w3.org/2000/svg"
        class="size-4 shrink-0 text-ds-success"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </Transition>

    <span>{{ copied ? successLabel : label }}</span>
  </button>
</template>
