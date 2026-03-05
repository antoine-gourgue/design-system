<script setup lang="ts">
withDefaults(defineProps<{
  /** Number of visible page buttons to show (excluding prev/next arrows) */
  pages?: number
}>(), {
  pages: 5,
})
</script>

<template>
  <div class="flex items-center gap-1 animate-pulse" aria-hidden="true" role="presentation">
    <!-- Prev arrow -->
    <div class="h-9 w-9 rounded-ds-md bg-ds-bg-muted"></div>

    <!-- Page buttons -->
    <div
      v-for="i in pages"
      :key="i"
      class="h-9 rounded-ds-md bg-ds-bg-muted" :class="[
        i === Math.ceil(pages / 2) ? 'w-9 bg-ds-primary/20' : 'w-9',
      ]"
    ></div>

    <!-- Next arrow -->
    <div class="h-9 w-9 rounded-ds-md bg-ds-bg-muted"></div>
  </div>
</template>
