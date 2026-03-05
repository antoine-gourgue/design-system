<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsScrollAreaSkeletonProps {
  class?: string
}
const props = defineProps<DsScrollAreaSkeletonProps>()
</script>

<template>
  <div :class="cn('relative rounded-ds-md border border-ds-border p-3 space-y-2 animate-pulse h-40', props.class)">
    <DsSkeleton v-for="i in 6" :key="i" :class="cn('h-4 rounded-ds-md', i % 3 === 0 ? 'w-4/5' : i % 2 === 0 ? 'w-full' : 'w-3/4')" />
    <!-- Scrollbar simulation -->
    <div class="absolute right-1 top-2 bottom-2 w-1.5 rounded-full bg-ds-border/50" />
  </div>
</template>
