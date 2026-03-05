<script setup lang="ts">
const { toast } = useToast()
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <DsButton
      variant="secondary"
      @click="toast({ title: 'Notification', description: 'A neutral message.', variant: 'default' })"
    >
      Default
    </DsButton>
    <DsButton
      variant="secondary"
      @click="toast({ title: 'Saved', description: 'Your changes have been saved.', variant: 'success' })"
    >
      Success
    </DsButton>
    <DsButton
      variant="secondary"
      @click="toast({ title: 'Warning', description: 'Proceed with caution.', variant: 'warning' })"
    >
      Warning
    </DsButton>
    <DsButton
      variant="secondary"
      @click="toast({ title: 'Error', description: 'Something went wrong.', variant: 'error' })"
    >
      Error
    </DsButton>
    <DsButton
      variant="secondary"
      @click="toast({ title: 'Info', description: 'Just so you know.', variant: 'info' })"
    >
      Info
    </DsButton>
  </div>
</template>
