<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsComboboxOption {
  label: string
  value: string
  disabled?: boolean
}

export interface DsComboboxProps {
  modelValue?: string
  options?: DsComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<DsComboboxProps>(), {
  options: () => [],
  placeholder: 'Select an option…',
  searchPlaceholder: 'Search…',
  size: 'md',
  clearable: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const open = ref(false)
const search = ref('')
const inputRef = ref<HTMLInputElement>()

const selected = computed(() => props.options.find(o => o.value === props.modelValue))

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return q ? props.options.filter(o => o.label.toLowerCase().includes(q)) : props.options
})

function select(opt: DsComboboxOption) {
  if (opt.disabled) return
  emit('update:modelValue', opt.value)
  open.value = false
  search.value = ''
}

function clear() {
  emit('update:modelValue', '')
}

function toggle() {
  if (props.disabled) return
  open.value = !open.value
  if (open.value) {
    search.value = ''
    setTimeout(() => inputRef.value?.focus(), 50)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

watch(open, (val) => {
  if (val) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})

const sizeClasses = {
  sm: 'h-8 text-xs px-2.5',
  md: 'h-10 text-sm px-3',
  lg: 'h-11 text-base px-4',
}
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <button
      type="button"
      :disabled="disabled"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :class="cn(
        'w-full flex items-center justify-between gap-2 rounded-ds-md border border-ds-border bg-ds-bg text-ds-fg transition-colors',
        'hover:border-ds-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        open ? 'ring-2 ring-ds-ring border-ds-primary' : '',
        sizeClasses[size],
      )"
      @click="toggle"
    >
      <span :class="selected ? 'text-ds-fg' : 'text-ds-fg-subtle'">
        {{ selected ? selected.label : placeholder }}
      </span>
      <div class="flex items-center gap-1 shrink-0">
        <button
          v-if="clearable && modelValue"
          type="button"
          class="text-ds-fg-muted hover:text-ds-fg transition-colors"
          aria-label="Clear"
          @click.stop="clear"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4 text-ds-fg-muted transition-transform"
          :class="open ? 'rotate-180' : ''"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-95 opacity-0"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="open"
        class="absolute z-50 mt-1 w-full rounded-ds-lg border border-ds-border bg-ds-bg shadow-ds-md overflow-hidden"
        role="listbox"
      >
        <div class="p-2 border-b border-ds-border">
          <input
            ref="inputRef"
            v-model="search"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full h-8 px-2.5 text-sm rounded-ds-sm bg-ds-bg-subtle border border-ds-border text-ds-fg placeholder:text-ds-fg-subtle focus:outline-none focus:ring-1 focus:ring-ds-ring"
            @click.stop
          >
        </div>
        <ul class="max-h-60 overflow-y-auto py-1">
          <li
            v-for="opt in filtered"
            :key="opt.value"
            role="option"
            :aria-selected="opt.value === modelValue"
            :class="cn(
              'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors',
              opt.value === modelValue ? 'bg-ds-primary-subtle text-ds-primary font-medium' : 'text-ds-fg hover:bg-ds-bg-subtle',
              opt.disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
            )"
            @click="select(opt)"
          >
            <svg
              v-if="opt.value === modelValue"
              xmlns="http://www.w3.org/2000/svg"
              class="size-3.5 shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span v-else class="size-3.5 shrink-0" />
            {{ opt.label }}
          </li>
          <li v-if="filtered.length === 0" class="px-3 py-4 text-sm text-center text-ds-fg-muted">
            No results found
          </li>
        </ul>
      </div>
    </Transition>

    <div v-if="open" class="fixed inset-0 z-40" @click="open = false" />
  </div>
</template>
