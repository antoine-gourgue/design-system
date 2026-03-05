<script setup lang="ts">
withDefaults(defineProps<{
  count?: number
  card?: boolean
}>(), { count: 3, card: false })
</script>

<template>
  <div class="flex flex-col gap-2.5 animate-pulse" aria-hidden="true" role="presentation">
    <div
      v-for="i in count"
      :key="i"
      :class="[
        'flex items-center gap-3',
        card && 'rounded-ds-lg border border-ds-border px-4 py-3',
      ]"
    >
      <div class="size-4 rounded-full bg-ds-bg-muted shrink-0" />
      <div class="flex flex-col gap-1.5">
        <div class="h-3.5 rounded-full bg-ds-bg-muted" :style="{ width: `${60 + i * 20}px` }" />
        <div v-if="card" class="h-2.5 rounded-full bg-ds-bg-muted w-32" />
      </div>
    </div>
  </div>
</template>
