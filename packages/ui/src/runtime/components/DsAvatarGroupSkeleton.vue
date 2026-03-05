<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'
const props = defineProps<{ count?: number, class?: string }>()
const count = computed(() => props.count ?? 4)
</script>

<template>
  <div :class="cn('flex items-center animate-pulse', props.class)">
    <div
      v-for="i in count"
      :key="i"
      class="size-10 rounded-full bg-ds-bg-muted ring-2 ring-ds-bg -ml-2 first:ml-0 shrink-0"
      :style="{ zIndex: count - i + 1 }"
    />
  </div>
</template>
