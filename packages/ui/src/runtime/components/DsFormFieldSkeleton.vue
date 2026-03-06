<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsFormFieldSkeletonProps {
  showLabel?: boolean
  showDescription?: boolean
  class?: string
}
const props = withDefaults(defineProps<DsFormFieldSkeletonProps>(), {
  showLabel: true,
  showDescription: false,
})
</script>

<template>
  <div :class="cn('w-full flex flex-col gap-1.5 animate-pulse', props.class)">
    <!-- Label -->
    <DsSkeleton v-if="showLabel" class="h-3.5 w-24 rounded-ds-sm" />
    <!-- Description -->
    <DsSkeleton v-if="showDescription" class="h-2.5 w-48 rounded-ds-sm" />
    <!-- Input -->
    <DsSkeleton class="h-10 w-full rounded-ds-md" />
  </div>
</template>
