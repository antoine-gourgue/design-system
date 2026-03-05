<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <DsButton @click="open = true">Open Modal</DsButton>
    <DsModal v-model="open" title="Example Modal">
      <p class="text-sm text-ds-fg-muted leading-relaxed">
        This is an example modal dialog. Press ESC or click outside to close.
      </p>
      <template #footer>
        <DsButton variant="ghost" @click="open = false">Cancel</DsButton>
        <DsButton @click="open = false">Confirm</DsButton>
      </template>
    </DsModal>
  </div>
</template>
