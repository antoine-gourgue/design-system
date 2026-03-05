<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '../utils/cn'
import { DsTabsKey } from '../utils/tabs'

export interface DsTabPanelProps {
  /** Must match the corresponding DsTab's `value` */
  value: string
  class?: string
}

const props = defineProps<DsTabPanelProps>()

const tabs = inject(DsTabsKey)
const isActive = computed(() => tabs?.activeTab.value === props.value)
</script>

<template>
  <div
    v-if="isActive"
    :class="cn('animate-ds-fade-in motion-reduce:animate-none', props.class)"
    role="tabpanel"
    :tabindex="0"
  >
    <slot></slot>
  </div>
</template>
