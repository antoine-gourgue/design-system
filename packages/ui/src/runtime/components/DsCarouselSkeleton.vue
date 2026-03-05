<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsCarouselSkeletonProps {
  class?: string
}
const props = defineProps<DsCarouselSkeletonProps>()
</script>

<template>
  <div :class="cn('w-full rounded-ds-xl overflow-hidden border border-ds-border animate-pulse', props.class)">
    <!-- Slide area -->
    <DsSkeleton class="w-full h-48 rounded-none" />
    <!-- Dots -->
    <div class="flex justify-center gap-1.5 py-3">
      <DsSkeleton class="w-5 h-2 rounded-full" />
      <DsSkeleton class="size-2 rounded-full" />
      <DsSkeleton class="size-2 rounded-full" />
    </div>
  </div>
</template>
