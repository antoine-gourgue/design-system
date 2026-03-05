<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsMultiSelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface DsMultiSelectProps {
  modelValue?: string[]
  options?: DsMultiSelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  max?: number
  class?: string
}

const props = withDefaults(defineProps<DsMultiSelectProps>(), {
  options: () => [],
  modelValue: () => [],
  placeholder: 'Select options…',
  searchPlaceholder: 'Search…',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const open = ref(false)
const search = ref('')

const selectedOptions = computed(() =>
  props.options.filter(o => (props.modelValue ?? []).includes(o.value)),
)

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return q ? props.options.filter(o => o.label.toLowerCase().includes(q)) : props.options
})

function toggle(opt: DsMultiSelectOption) {
  if (opt.disabled) return
  const current = props.modelValue ?? []
  if (current.includes(opt.value)) {
    emit('update:modelValue', current.filter(v => v !== opt.value))
  }
  else {
    if (props.max && current.length >= props.max) return
    emit('update:modelValue', [...current, opt.value])
  }
}

function removeChip(value: string) {
  emit('update:modelValue', (props.modelValue ?? []).filter(v => v !== value))
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

watch(open, (val) => {
  if (val) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <div
      :class="cn(
        'min-h-10 w-full flex flex-wrap gap-1.5 items-center px-2.5 py-1.5 rounded-ds-md border border-ds-border bg-ds-bg cursor-pointer transition-colors',
        'hover:border-ds-border-strong',
        open ? 'ring-2 ring-ds-ring border-ds-primary' : '',
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
      )"
      @click="open = !open"
    >
      <template v-if="selectedOptions.length > 0">
        <span
          v-for="opt in selectedOptions"
          :key="opt.value"
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-ds-full bg-ds-primary-subtle text-ds-primary text-xs font-medium"
        >
          {{ opt.label }}
          <button
            type="button"
            class="hover:text-ds-danger transition-colors focus:outline-none"
            :aria-label="`Remove ${opt.label}`"
            @click.stop="removeChip(opt.value)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      </template>
      <span v-else class="text-sm text-ds-fg-subtle select-none">{{ placeholder }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4 text-ds-fg-muted ml-auto shrink-0 transition-transform"
        :class="open ? 'rotate-180' : ''"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-95 opacity-0"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="open"
        class="absolute z-50 mt-1 w-full rounded-ds-lg border border-ds-border bg-ds-bg shadow-ds-md overflow-hidden"
      >
        <div class="p-2 border-b border-ds-border">
          <input
            v-model="search"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full h-8 px-2.5 text-sm rounded-ds-sm bg-ds-bg-subtle border border-ds-border text-ds-fg placeholder:text-ds-fg-subtle focus:outline-none focus:ring-1 focus:ring-ds-ring"
            @click.stop
          >
        </div>
        <ul class="max-h-56 overflow-y-auto py-1">
          <li
            v-for="opt in filtered"
            :key="opt.value"
            :class="cn(
              'flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer transition-colors',
              (modelValue ?? []).includes(opt.value) ? 'bg-ds-primary-subtle' : 'hover:bg-ds-bg-subtle',
              opt.disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
            )"
            @click="toggle(opt)"
          >
            <div :class="cn(
              'size-4 rounded-ds-xs border flex items-center justify-center shrink-0 transition-colors',
              (modelValue ?? []).includes(opt.value) ? 'bg-ds-primary border-ds-primary' : 'border-ds-border',
            )">
              <svg v-if="(modelValue ?? []).includes(opt.value)" xmlns="http://www.w3.org/2000/svg" class="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span :class="(modelValue ?? []).includes(opt.value) ? 'text-ds-primary font-medium' : 'text-ds-fg'">{{ opt.label }}</span>
          </li>
          <li v-if="filtered.length === 0" class="px-3 py-4 text-sm text-center text-ds-fg-muted">
            No results found
          </li>
        </ul>
        <div v-if="max" class="px-3 py-2 border-t border-ds-border text-xs text-ds-fg-muted">
          {{ (modelValue ?? []).length }}/{{ max }} selected
        </div>
      </div>
    </Transition>

    <div v-if="open" class="fixed inset-0 z-40" @click="open = false" />
  </div>
</template>
