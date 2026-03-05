<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsStep {
  label: string
  description?: string
}

export interface DsStepperProps {
  steps: DsStep[]
  /** Current step index (0-based) */
  modelValue?: number
  orientation?: 'horizontal' | 'vertical'
  class?: string
}

const props = withDefaults(defineProps<DsStepperProps>(), {
  modelValue: 0,
  orientation: 'horizontal',
})

const emit = defineEmits<{
  (e: 'update:modelValue', step: number): void
}>()

function stepStatus(index: number): 'done' | 'current' | 'pending' {
  const current = props.modelValue ?? 0
  if (index < current)
    return 'done'
  if (index === current)
    return 'current'
  return 'pending'
}

const isHorizontal = computed(() => props.orientation === 'horizontal')
</script>

<template>
  <div
    :class="cn(
      isHorizontal ? 'flex items-start' : 'flex flex-col',
      props.class,
    )"
    role="list"
    aria-label="Steps"
  >
    <div
      v-for="(step, i) in steps"
      :key="i"
      :class="cn(
        isHorizontal ? 'flex flex-col items-center text-center flex-1' : 'flex items-start gap-4 pb-8 last:pb-0 relative',
      )"
      role="listitem"
    >
      <!-- Horizontal connector (before label, except first) -->
      <div
        v-if="isHorizontal && i > 0"
        class="absolute left-0 right-0 top-3.5 -translate-y-px h-px bg-ds-border pointer-events-none"
        style="width: calc(100% - 3rem); left: calc(-50% + 1.5rem)"
        aria-hidden="true"
      ></div>

      <!-- Step indicator -->
      <div class="relative z-10 flex items-center justify-center" :class="isHorizontal ? 'mb-2' : ''">
        <button
          type="button"
          :aria-label="`Step ${i + 1}: ${step.label}`"
          :aria-current="stepStatus(i) === 'current' ? 'step' : undefined"
          :class="cn(
            'flex size-8 items-center justify-center rounded-full text-sm font-semibold border-2 transition-all',
            stepStatus(i) === 'done' && 'bg-ds-primary border-ds-primary text-ds-primary-fg',
            stepStatus(i) === 'current' && 'bg-ds-bg border-ds-primary text-ds-primary ring-4 ring-ds-primary/15',
            stepStatus(i) === 'pending' && 'bg-ds-bg border-ds-border text-ds-fg-muted',
          )"
          @click="emit('update:modelValue', i)"
        >
          <!-- Done: checkmark -->
          <svg v-if="stepStatus(i) === 'done'" xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span v-else>{{ i + 1 }}</span>
        </button>

        <!-- Vertical connector -->
        <div
          v-if="!isHorizontal && i < steps.length - 1"
          class="absolute top-full left-1/2 -translate-x-px w-px h-8 bg-ds-border"
          aria-hidden="true"
        ></div>
      </div>

      <!-- Label + description -->
      <div :class="cn(isHorizontal ? '' : 'flex-1 pt-0.5 pb-1')">
        <p
          :class="cn(
            'text-sm font-medium leading-snug',
            stepStatus(i) === 'current' && 'text-ds-primary',
            stepStatus(i) === 'done' && 'text-ds-fg',
            stepStatus(i) === 'pending' && 'text-ds-fg-muted',
          )"
        >
          {{ step.label }}
        </p>
        <p v-if="step.description" class="text-xs text-ds-fg-muted mt-0.5 leading-relaxed">
          {{ step.description }}
        </p>
      </div>
    </div>
  </div>
</template>
