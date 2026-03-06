<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsVerticalNavSkeletonProps {
  groups?: number
  itemsPerGroup?: number
  class?: string
}
const props = withDefaults(defineProps<DsVerticalNavSkeletonProps>(), {
  groups: 2,
  itemsPerGroup: 4,
})

const widths = ['w-28', 'w-20', 'w-24', 'w-16', 'w-20', 'w-28', 'w-22', 'w-18']
</script>

<template>
  <div :class="cn('flex flex-col gap-4 animate-pulse', props.class)">
    <div v-for="g in props.groups" :key="g" class="space-y-1">
      <!-- Group title -->
      <DsSkeleton class="h-2.5 w-16 rounded-ds-sm mb-3 ml-3" />

      <!-- Items -->
      <div
        v-for="i in props.itemsPerGroup"
        :key="i"
        class="flex items-center gap-2.5 px-3 py-2"
      >
        <DsSkeleton class="size-4 rounded shrink-0" />
        <DsSkeleton :class="`h-3.5 ${widths[((g - 1) * 4 + (i - 1)) % widths.length]} rounded-ds-sm`" />
      </div>
    </div>
  </div>
</template>
