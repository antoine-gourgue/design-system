<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cn } from '../utils/cn'

export interface PhoneCountry {
  code: string
  dial: string
  flag: string
  name: string
}

export interface DsPhoneInputProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  class?: string
}

const COUNTRIES: PhoneCountry[] = [
  { code: 'FR', dial: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'ES', dial: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: 'IT', dial: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: 'PT', dial: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: 'BE', dial: '+32', flag: '🇧🇪', name: 'Belgium' },
  { code: 'CH', dial: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: 'CN', dial: '+86', flag: '🇨🇳', name: 'China' },
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'BR', dial: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: 'MX', dial: '+52', flag: '🇲🇽', name: 'Mexico' },
]

const props = withDefaults(defineProps<DsPhoneInputProps>(), {
  modelValue: '',
  placeholder: '6 00 00 00 00',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const selectedCountry = ref<PhoneCountry>(COUNTRIES[0])
const phoneNumber = ref('')
const dropdownOpen = ref(false)
const searchQuery = ref('')

const filteredCountries = computed(() =>
  searchQuery.value
    ? COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.dial.includes(searchQuery.value)
      )
    : COUNTRIES
)

function selectCountry(country: PhoneCountry) {
  selectedCountry.value = country
  dropdownOpen.value = false
  searchQuery.value = ''
  emitValue()
}

function emitValue() {
  emit('update:modelValue', `${selectedCountry.value.dial}${phoneNumber.value}`)
}

function onInput(e: Event) {
  phoneNumber.value = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  emitValue()
}

function onOutside(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest('[data-phone-input]')) {
    dropdownOpen.value = false
    searchQuery.value = ''
  }
}

watch(dropdownOpen, (val) => {
  if (val) setTimeout(() => document.addEventListener('mousedown', onOutside), 0)
  else document.removeEventListener('mousedown', onOutside)
})
</script>

<template>
  <div data-phone-input :class="cn('relative flex items-center rounded-ds-md border border-ds-border bg-ds-bg focus-within:ring-2 focus-within:ring-ds-ring', props.class)">
    <!-- Country selector -->
    <button
      type="button"
      :disabled="disabled"
      class="flex items-center gap-1.5 px-3 py-2 border-r border-ds-border text-sm hover:bg-ds-bg-muted transition-colors rounded-l-ds-md focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      :aria-expanded="dropdownOpen"
      @click="dropdownOpen = !dropdownOpen"
    >
      <span class="text-base leading-none">{{ selectedCountry.flag }}</span>
      <span class="text-ds-fg-muted font-mono text-xs">{{ selectedCountry.dial }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5 text-ds-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Phone number input -->
    <input
      type="tel"
      :value="phoneNumber"
      :placeholder="placeholder"
      :disabled="disabled"
      class="flex-1 bg-transparent px-3 py-2 text-sm text-ds-fg placeholder:text-ds-fg-muted focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      @input="onInput"
    />

    <!-- Country dropdown -->
    <Transition name="phone-drop">
      <div
        v-if="dropdownOpen"
        class="absolute top-full mt-1 left-0 z-50 w-72 rounded-ds-lg border border-ds-border bg-ds-bg-elevated shadow-ds-lg overflow-hidden"
      >
        <!-- Search -->
        <div class="p-2 border-b border-ds-border">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search country..."
            class="w-full h-8 px-3 text-sm rounded-ds-md border border-ds-border bg-ds-bg text-ds-fg placeholder:text-ds-fg-muted focus:outline-none focus:ring-1 focus:ring-ds-ring"
          />
        </div>
        <!-- Country list -->
        <ul class="max-h-48 overflow-y-auto py-1">
          <li
            v-for="country in filteredCountries"
            :key="country.code"
            class="flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer hover:bg-ds-bg-muted transition-colors"
            :class="{ 'bg-ds-primary-subtle text-ds-primary': country.code === selectedCountry.code }"
            @click="selectCountry(country)"
          >
            <span class="text-base leading-none">{{ country.flag }}</span>
            <span class="flex-1 text-ds-fg">{{ country.name }}</span>
            <span class="text-xs text-ds-fg-muted font-mono">{{ country.dial }}</span>
          </li>
          <li v-if="filteredCountries.length === 0" class="px-3 py-4 text-sm text-center text-ds-fg-muted">
            No country found
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.phone-drop-enter-active,
.phone-drop-leave-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.phone-drop-enter-from,
.phone-drop-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
