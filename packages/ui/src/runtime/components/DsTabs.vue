<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import { DsTabsKey } from '../utils/tabs'

export interface DsTabsProps {
  /** Currently active tab id (v-model) */
  modelValue?: string
  /** Default active tab id (uncontrolled) */
  defaultValue?: string
  /** Visual variant */
  variant?: 'line' | 'enclosed' | 'pills'
  class?: string
}

const props = withDefaults(defineProps<DsTabsProps>(), {
  variant: 'line',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const internalActive = ref(props.defaultValue ?? props.modelValue ?? '')

const activeTab = computed({
  get: () => props.modelValue ?? internalActive.value,
  set: (val: string) => {
    internalActive.value = val
    emit('update:modelValue', val)
    emit('change', val)
  },
})

function setActive(id: string) {
  activeTab.value = id
}

const variantRef = computed(() => props.variant ?? 'line')

provide(DsTabsKey, {
  activeTab: activeTab as unknown as import('vue').Ref<string>,
  setActive,
  variant: variantRef,
})
</script>

<template>
  <div :class="props.class" class="w-full">
    <slot />
  </div>
</template>
