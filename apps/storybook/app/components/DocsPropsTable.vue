<script setup lang="ts">
import type { PropDef } from '~/data/components'

defineProps<{
  props: PropDef[]
}>()
</script>

<template>
  <div class="overflow-x-auto rounded-ds-lg border border-ds-border">
    <table class="w-full text-sm font-ds">
      <thead>
        <tr class="border-b border-ds-border bg-ds-bg-subtle">
          <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ds-fg-subtle">Prop</th>
          <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ds-fg-subtle">Type</th>
          <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ds-fg-subtle">Default</th>
          <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ds-fg-subtle">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(prop, i) in props"
          :key="prop.name"
          :class="[i % 2 === 0 ? 'bg-ds-bg' : 'bg-ds-bg-subtle', 'border-b border-ds-border last:border-0']"
        >
          <td class="px-4 py-3">
            <code class="text-xs font-mono text-ds-primary bg-ds-primary-subtle px-1.5 py-0.5 rounded">
              {{ prop.name }}
            </code>
            <span v-if="prop.required" class="ml-1.5 text-xs text-ds-danger font-medium">*</span>
          </td>
          <td class="px-4 py-3">
            <code class="text-xs font-mono text-ds-fg-muted">{{ prop.type }}</code>
          </td>
          <td class="px-4 py-3">
            <code v-if="prop.default" class="text-xs font-mono text-ds-fg-muted">{{ prop.default }}</code>
            <span v-else class="text-ds-fg-subtle text-xs">—</span>
          </td>
          <td class="px-4 py-3 text-ds-fg-muted leading-relaxed">{{ prop.description }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="!props.length" class="px-4 py-6 text-center text-sm text-ds-fg-subtle">
      No props defined.
    </p>
  </div>
</template>
