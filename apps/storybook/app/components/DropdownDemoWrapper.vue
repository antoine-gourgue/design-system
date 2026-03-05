<script setup lang="ts">
const items = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { divider: true },
  { label: 'Delete', value: 'delete', destructive: true },
]
</script>

<template>
  <DsDropdown :items="items" placement="bottom-start">
    <template #trigger>
      <DsButton variant="secondary">
        Actions
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </DsButton>
    </template>
  </DsDropdown>
</template>
