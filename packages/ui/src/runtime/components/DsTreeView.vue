<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsTreeNode {
  id: string
  label: string
  children?: DsTreeNode[]
  disabled?: boolean
}

export interface DsTreeViewProps {
  nodes?: DsTreeNode[]
  selected?: string
  depth?: number
  expandedIds?: Set<string>
  class?: string
}

defineOptions({ name: 'DsTreeView' })

const props = withDefaults(defineProps<DsTreeViewProps>(), {
  nodes: () => [],
  depth: 0,
})

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'toggle', id: string): void
}>()

const internalExpanded = ref<Set<string>>(new Set())
const expanded = props.expandedIds ?? internalExpanded.value

function toggle(id: string) {
  if (expanded.has(id))
    expanded.delete(id)
  else expanded.add(id)
  emit('toggle', id)
}
</script>

<template>
  <ul
    :class="cn('w-full text-sm', depth === 0 ? props.class : undefined)"
    :role="depth === 0 ? 'tree' : 'group'"
  >
    <li
      v-for="node in nodes"
      :key="node.id"
      role="treeitem"
      :aria-expanded="node.children?.length ? expanded.has(node.id) : undefined"
    >
      <div
        :style="{ paddingLeft: `${depth * 16 + 8}px` }"
        :class="cn(
          'flex items-center gap-1.5 pr-3 py-1.5 rounded-ds-sm cursor-pointer transition-colors',
          selected === node.id ? 'bg-ds-primary-subtle text-ds-primary font-medium' : 'text-ds-fg hover:bg-ds-bg-subtle',
          node.disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        )"
        @click="!node.disabled && emit('select', node.id)"
      >
        <button
          v-if="node.children?.length"
          type="button"
          class="shrink-0 size-4 flex items-center justify-center rounded hover:bg-ds-bg-muted transition-transform"
          :class="expanded.has(node.id) ? 'rotate-90' : ''"
          @click.stop="toggle(node.id)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <span v-else class="size-4 shrink-0"></span>

        <svg
          v-if="node.children?.length"
          xmlns="http://www.w3.org/2000/svg"
          class="size-4 shrink-0 text-ds-primary/70"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="size-4 shrink-0 text-ds-fg-subtle"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span class="truncate">{{ node.label }}</span>
      </div>

      <DsTreeView
        v-if="node.children?.length && expanded.has(node.id)"
        :nodes="node.children"
        :selected="selected"
        :depth="depth + 1"
        :expanded-ids="expanded"
        @select="emit('select', $event)"
        @toggle="toggle"
      />
    </li>
  </ul>
</template>
