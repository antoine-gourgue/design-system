<script setup lang="ts">
import type { ref } from 'vue'
import { computed, inject } from 'vue'
import { cn } from '../utils/cn'

export interface DsAccordionItemProps {
  value: string
  title: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsAccordionItemProps>(), {
  disabled: false,
})

const accordion = inject<{
  openItems: ReturnType<typeof ref<Set<string>>>
  toggle: (v: string) => void
}>('accordion')

const isOpen = computed(() => accordion?.openItems.value?.has(props.value) ?? false)

function handleToggle() {
  if (!props.disabled && accordion) {
    accordion.toggle(props.value)
  }
}
</script>

<template>
  <div :class="cn('border-b border-ds-border last:border-b-0', props.class)">
    <!-- Trigger -->
    <button
      type="button"
      :disabled="disabled"
      :aria-expanded="isOpen"
      :aria-controls="`accordion-content-${value}`"
      :class="cn(
        'flex w-full items-center justify-between py-4 text-sm font-medium text-ds-fg text-left',
        'transition-all duration-ds-base hover:text-ds-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      )"
      @click="handleToggle"
    >
      <span>{{ title }}</span>
      <svg
        :class="cn('size-4 shrink-0 text-ds-fg-muted transition-transform duration-ds-base', isOpen ? 'rotate-180' : '')"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Content -->
    <div
      :id="`accordion-content-${value}`"
      role="region"
      :aria-labelledby="`accordion-trigger-${value}`"
      :class="cn(
        'overflow-hidden transition-all duration-ds-slow ease-ds-smooth',
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
      )"
    >
      <div class="pb-4 text-sm text-ds-fg-muted leading-relaxed">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
