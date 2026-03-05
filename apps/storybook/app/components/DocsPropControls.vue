<script setup lang="ts">
import type { PropControl } from '~/data/components'

const props = defineProps<{
  controls: PropControl[]
  modelValue: Record<string, unknown>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>]
}>()

function update(key: string, value: unknown) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function isVisible(control: PropControl): boolean {
  if (!control.hideIf) return true
  return !control.hideIf(props.modelValue)
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="control in controls"
      v-show="isVisible(control)"
      :key="control.name"
      class="flex items-start gap-4"
    >
      <!-- Label -->
      <div class="w-28 shrink-0">
        <label class="text-sm font-medium text-ds-fg font-ds leading-6">
          {{ control.label }}
        </label>
        <p v-if="control.description" class="text-xs text-ds-fg-subtle mt-0.5 leading-snug">
          {{ control.description }}
        </p>
      </div>

      <!-- Control -->
      <div class="flex-1">
        <!-- Select -->
        <select
          v-if="control.type === 'select'"
          :value="String(modelValue[control.name] ?? control.default)"
          class="w-full h-8 px-2.5 text-sm font-ds rounded-ds-md border border-ds-border bg-ds-bg text-ds-fg focus:outline-none focus:ring-2 focus:ring-ds-ring focus:ring-offset-1 transition-colors"
          @change="update(control.name, ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in control.options" :key="opt" :value="opt">{{ opt }}</option>
        </select>

        <!-- Boolean checkbox -->
        <div v-else-if="control.type === 'boolean'" class="flex items-center h-8">
          <input
            type="checkbox"
            :id="`control-${control.name}`"
            :checked="Boolean(modelValue[control.name] ?? control.default)"
            class="size-4 rounded border-ds-border text-ds-primary focus:ring-ds-ring focus:ring-offset-1 cursor-pointer"
            @change="update(control.name, ($event.target as HTMLInputElement).checked)"
          />
        </div>

        <!-- Text input -->
        <input
          v-else-if="control.type === 'text'"
          type="text"
          :value="String(modelValue[control.name] ?? control.default ?? '')"
          class="w-full h-8 px-2.5 text-sm font-ds rounded-ds-md border border-ds-border bg-ds-bg text-ds-fg focus:outline-none focus:ring-2 focus:ring-ds-ring focus:ring-offset-1 transition-colors placeholder:text-ds-fg-subtle"
          @input="update(control.name, ($event.target as HTMLInputElement).value)"
        />

        <!-- Number input -->
        <input
          v-else-if="control.type === 'number'"
          type="number"
          :value="Number(modelValue[control.name] ?? control.default ?? 0)"
          class="w-full h-8 px-2.5 text-sm font-ds rounded-ds-md border border-ds-border bg-ds-bg text-ds-fg focus:outline-none focus:ring-2 focus:ring-ds-ring focus:ring-offset-1 transition-colors"
          @input="update(control.name, Number(($event.target as HTMLInputElement).value))"
        />

        <!-- Color input -->
        <input
          v-else-if="control.type === 'color'"
          type="color"
          :value="String(modelValue[control.name] ?? control.default ?? '#000000')"
          class="h-8 w-12 rounded cursor-pointer border border-ds-border bg-transparent"
          @input="update(control.name, ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <div v-if="!controls.length" class="text-sm text-ds-fg-subtle py-2">
      No controls available for this component.
    </div>
  </div>
</template>
