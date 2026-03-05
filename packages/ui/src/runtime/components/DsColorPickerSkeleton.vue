<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsColorPickerSkeletonProps {
  class?: string
}
const props = defineProps<DsColorPickerSkeletonProps>()
</script>

<template>
  <div :class="cn('space-y-3 animate-pulse', props.class)">
    <!-- Swatches grid skeleton -->
    <div class="grid grid-cols-8 gap-1.5">
      <DsSkeleton v-for="i in 16" :key="i" class="size-7 rounded-ds-md" />
    </div>
    <!-- Input row skeleton -->
    <div class="flex items-center gap-2">
      <DsSkeleton class="size-9 rounded-ds-md shrink-0" />
      <DsSkeleton class="h-9 flex-1 rounded-ds-md" />
    </div>
  </div>
</template>
