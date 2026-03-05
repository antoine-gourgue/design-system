<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

const props = defineProps<{ lines?: number, class?: string }>()
const lineCount = computed(() => props.lines ?? 6)
const widths = ['w-3/4', 'w-1/2', 'w-5/6', 'w-2/3', 'w-full', 'w-3/5', 'w-4/5']
</script>

<template>
  <div :class="cn('rounded-ds-xl border border-ds-border bg-[#0f0f11] animate-pulse overflow-hidden', props.class)">
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/5">
      <div class="h-3 w-24 rounded bg-white/10"></div>
      <div class="h-6 w-16 rounded-ds-sm bg-white/10"></div>
    </div>
    <div class="p-4 space-y-2">
      <div
        v-for="i in lineCount"
        :key="i"
        class="h-4 rounded bg-white/10" :class="[widths[(i - 1) % widths.length]]"
      ></div>
    </div>
  </div>
</template>
