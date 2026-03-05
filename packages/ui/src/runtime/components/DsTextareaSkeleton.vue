<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsTextareaSkeletonProps {
  hasLabel?: boolean
  rows?: number
  class?: string
}

const props = withDefaults(defineProps<DsTextareaSkeletonProps>(), {
  hasLabel: false,
  rows: 4,
})

const classes = computed(() => cn('flex flex-col space-y-2 animate-pulse', props.class))
const height = computed(() => `${props.rows * 1.5 + 1.5}rem`)
</script>

<template>
  <div :class="classes" aria-hidden="true" role="presentation">
    <div v-if="hasLabel" class="h-4 w-24 rounded bg-ds-bg-muted" />
    <div class="w-full rounded-ds-md bg-ds-bg-muted" :style="{ height: height }" />
  </div>
</template>
