<script setup lang="ts">
withDefaults(defineProps<{
  rows?: number
  columns?: number
  dense?: boolean
}>(), {
  rows: 4,
  columns: 4,
  dense: false,
})
</script>

<template>
  <div class="w-full overflow-hidden rounded-ds-lg border border-ds-border animate-pulse">
    <!-- Head -->
    <div class="border-b border-ds-border bg-ds-bg-subtle px-5 py-3.5 flex gap-4">
      <div
        v-for="i in columns"
        :key="i"
        class="h-3.5 rounded-full bg-ds-bg-muted"
        :style="{ width: `${60 + (i * 17) % 60}px` }"
      ></div>
    </div>
    <!-- Rows -->
    <div
      v-for="r in rows"
      :key="r"
      class="flex gap-4 px-5 border-b border-ds-border last:border-0" :class="[dense ? 'py-2' : 'py-3.5', r % 2 === 0 ? 'bg-ds-bg-subtle/40' : 'bg-ds-bg']"
    >
      <div
        v-for="c in columns"
        :key="c"
        class="h-3 rounded-full bg-ds-bg-muted"
        :style="{ width: `${70 + (r + c * 13) % 80}px` }"
      ></div>
    </div>
  </div>
</template>
