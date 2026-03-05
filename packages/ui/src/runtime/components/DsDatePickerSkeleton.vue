<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsDatePickerSkeletonProps {
  class?: string
}
const props = defineProps<DsDatePickerSkeletonProps>()
</script>

<template>
  <div :class="cn('inline-flex flex-col gap-2 animate-pulse', props.class)">
    <DsSkeleton class="h-9 w-48 rounded-ds-md" />
  </div>
</template>
