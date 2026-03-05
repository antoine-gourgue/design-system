<script setup lang="ts">
import { computed, reactive, ref, resolveComponent } from 'vue'
import type { ComponentDoc } from '~/data/components'
import { useCodegen } from '~/composables/useCodegen'

const props = defineProps<{
  doc: ComponentDoc
}>()

const { generateCode } = useCodegen()

type TabKey = 'preview' | 'code'
const activeTab = ref<TabKey>('preview')

// Initialize controls with default values
let controlValues = reactive<Record<string, unknown>>(
  Object.fromEntries(
    props.doc.controls.map(c => [c.name, c.default]),
  ),
)

// Merge with default props
const componentProps = computed(() => ({
  ...(props.doc.defaultProps ?? {}),
  ...controlValues,
}))

const resolvedComponent = computed(() => {
  try {
    return resolveComponent(props.doc.componentName)
  } catch {
    return null
  }
})

const generatedCode = computed(() =>
  generateCode(
    props.doc.componentName,
    componentProps.value,
    props.doc.defaultSlot,
    props.doc.defaultProps,
  ),
)
</script>

<template>
  <div class="rounded-ds-xl border border-ds-border overflow-hidden bg-ds-bg">
    <!-- Tabs -->
    <div class="flex border-b border-ds-border">
      <button
        v-for="tab in (['preview', 'code'] as TabKey[])"
        :key="tab"
        type="button"
        :class="[
          'px-4 py-2.5 text-sm font-medium font-ds capitalize transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ds-ring',
          activeTab === tab
            ? 'text-ds-fg border-b-2 border-ds-primary bg-ds-bg'
            : 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-subtle',
        ]"
        @click="activeTab = tab"
      >
        {{ tab === 'preview' ? 'Preview' : 'Code' }}
      </button>
    </div>

    <!-- Preview panel -->
    <div v-show="activeTab === 'preview'" class="p-8 min-h-32 flex items-center justify-center bg-ds-bg">
      <component
        v-if="resolvedComponent"
        :is="resolvedComponent"
        v-bind="componentProps"
      >
        {{ doc.defaultSlot }}
      </component>
      <p v-else class="text-sm text-ds-fg-muted">Component not found: {{ doc.componentName }}</p>
    </div>

    <!-- Controls panel -->
    <div v-if="doc.controls.length > 0" class="border-t border-ds-border px-5 py-5 bg-ds-bg">
      <p class="text-xs font-semibold uppercase tracking-wider text-ds-fg-subtle mb-4 font-ds">Controls</p>
      <DocsPropControls
        :model-value="controlValues"
        :controls="doc.controls"
        @update:model-value="(val) => Object.assign(controlValues, val)"
      />
    </div>

    <!-- Code panel -->
    <div v-show="activeTab === 'code'" class="p-0">
      <DocsCodeBlock :code="generatedCode" language="vue" />
    </div>
  </div>
</template>
