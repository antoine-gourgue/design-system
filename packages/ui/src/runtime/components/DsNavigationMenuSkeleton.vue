<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('flex items-center gap-1 animate-pulse', props.class)">
    <div v-for="i in 4" :key="i" class="h-9 w-20 rounded-ds-md bg-ds-bg-muted"></div>
  </div>
</template>
