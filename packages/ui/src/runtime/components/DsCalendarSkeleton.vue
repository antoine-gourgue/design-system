<script setup lang="ts">
// No props — the calendar has a fixed month-grid layout
</script>

<template>
  <div class="flex flex-col w-full bg-ds-bg-elevated border border-ds-border rounded-ds-xl shadow-ds-md animate-pulse select-none">
    <!-- Header: prev / month label / next -->
    <div class="flex items-center justify-between px-4 pt-4 pb-2">
      <div class="size-8 rounded-ds-md bg-ds-bg-muted" />
      <div class="h-4 w-32 rounded-full bg-ds-bg-muted" />
      <div class="size-8 rounded-ds-md bg-ds-bg-muted" />
    </div>

    <!-- Day labels row (Mo Tu We Th Fr Sa Su) -->
    <div class="grid grid-cols-7 px-3 pb-1">
      <div
        v-for="i in 7"
        :key="i"
        class="flex items-center justify-center h-8"
      >
        <div class="h-2.5 w-5 rounded-full bg-ds-bg-muted" />
      </div>
    </div>

    <!-- Days grid — 6 rows × 7 cols = 42 cells -->
    <div class="grid grid-cols-7 px-3 pb-3 gap-y-0.5">
      <div
        v-for="i in 42"
        :key="i"
        class="flex items-center justify-center size-8"
      >
        <!-- Every 10th cell slightly wider to simulate variation -->
        <div
          :class="[
            'rounded-ds-md bg-ds-bg-muted',
            i % 7 === 0 || i % 11 === 0 ? 'size-7 opacity-30' : 'size-6',
            i === 15 ? 'bg-ds-primary/20 ring-1 ring-ds-primary/30' : '',
          ]"
        />
      </div>
    </div>

    <!-- Today button -->
    <div class="px-3 pb-3">
      <div class="w-full h-8 rounded-ds-md bg-ds-bg-muted border border-ds-border" />
    </div>
  </div>
</template>
