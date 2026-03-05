<script setup lang="ts">
withDefaults(defineProps<{ length?: number }>(), { length: 6 })
</script>

<template>
  <div class="flex items-center gap-2 animate-pulse" aria-hidden="true" role="presentation">
    <div v-for="i in length" :key="i" class="size-11 rounded-ds-md bg-ds-bg-muted"></div>
  </div>
</template>
