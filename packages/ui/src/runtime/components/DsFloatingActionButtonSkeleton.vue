<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsFloatingActionButtonSkeletonProps {
  size?: 'sm' | 'md' | 'lg'
  class?: string
}
const props = withDefaults(defineProps<DsFloatingActionButtonSkeletonProps>(), { size: 'md' })
const sizeClass = { sm: 'size-10', md: 'size-14', lg: 'size-16' }
</script>

<template>
  <DsSkeleton :class="cn(`rounded-full animate-pulse ${sizeClass[props.size]}`, props.class)" />
</template>
