<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('flex items-center gap-1 border-b border-ds-border px-2 py-1.5 animate-pulse bg-ds-bg', props.class)">
    <div v-for="i in 4" :key="i" class="h-7 w-14 rounded-ds-sm bg-ds-bg-muted"></div>
  </div>
</template>
