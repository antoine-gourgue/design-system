<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsKanbanCard {
  id: string
  title: string
  description?: string
  tags?: string[]
  priority?: 'low' | 'medium' | 'high'
}

export interface DsKanbanColumn {
  id: string
  title: string
  color?: string
  cards: DsKanbanCard[]
}

export interface DsKanbanProps {
  columns: DsKanbanColumn[]
  draggable?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsKanbanProps>(), {
  draggable: true,
})

const emit = defineEmits<{
  (e: 'move', _payload: { cardId: string, fromColumnId: string, toColumnId: string, newIndex: number }): void
  (e: 'update:columns', _columns: DsKanbanColumn[]): void
}>()

const internalColumns = ref<DsKanbanColumn[]>(JSON.parse(JSON.stringify(props.columns)))

// Drag state
const dragCardId = ref<string | null>(null)
const dragFromColId = ref<string | null>(null)
const dragOverColId = ref<string | null>(null)
const dragOverCardId = ref<string | null>(null)

function onDragStart(cardId: string, colId: string) {
  dragCardId.value = cardId
  dragFromColId.value = colId
}

function onDragOver(e: DragEvent, colId: string, cardId?: string) {
  e.preventDefault()
  dragOverColId.value = colId
  dragOverCardId.value = cardId ?? null
}

function onDrop(e: DragEvent, toColId: string) {
  e.preventDefault()
  if (!dragCardId.value || !dragFromColId.value)
    return

  const fromCol = internalColumns.value.find(c => c.id === dragFromColId.value)
  const toCol = internalColumns.value.find(c => c.id === toColId)
  if (!fromCol || !toCol)
    return

  const cardIdx = fromCol.cards.findIndex(c => c.id === dragCardId.value)
  if (cardIdx === -1)
    return

  const [card] = fromCol.cards.splice(cardIdx, 1)

  let insertIdx = toCol.cards.length
  if (dragOverCardId.value) {
    const overIdx = toCol.cards.findIndex(c => c.id === dragOverCardId.value)
    if (overIdx !== -1)
      insertIdx = overIdx
  }
  toCol.cards.splice(insertIdx, 0, card)

  emit('move', {
    cardId: dragCardId.value,
    fromColumnId: dragFromColId.value,
    toColumnId: toColId,
    newIndex: insertIdx,
  })
  emit('update:columns', JSON.parse(JSON.stringify(internalColumns.value)))

  dragCardId.value = null
  dragFromColId.value = null
  dragOverColId.value = null
  dragOverCardId.value = null
}

function onDragEnd() {
  dragCardId.value = null
  dragFromColId.value = null
  dragOverColId.value = null
  dragOverCardId.value = null
}

const priorityColors = {
  low: 'bg-ds-success/15 text-ds-success border-ds-success/20',
  medium: 'bg-ds-warning/15 text-ds-warning border-ds-warning/20',
  high: 'bg-ds-danger/15 text-ds-danger border-ds-danger/20',
}

const DEFAULT_COLUMN_COLORS = ['#7f00ff', '#06b6d4', '#22c55e', '#f97316', '#ec4899']
</script>

<template>
  <div :class="cn('flex gap-4 overflow-x-auto pb-2', props.class)">
    <div
      v-for="(col, ci) in internalColumns"
      :key="col.id"
      :class="cn(
        'flex flex-col gap-2 rounded-ds-xl border border-ds-border bg-ds-bg-subtle p-3 min-w-64 max-w-72 flex-shrink-0',
        draggable && dragOverColId === col.id ? 'ring-2 ring-ds-primary/30' : '',
      )"
      @dragover.prevent="e => onDragOver(e, col.id)"
      @drop="e => onDrop(e, col.id)"
    >
      <!-- Column header -->
      <div class="flex items-center justify-between px-1 mb-1">
        <div class="flex items-center gap-2">
          <span
            class="size-2 rounded-full"
            :style="{ backgroundColor: col.color ?? DEFAULT_COLUMN_COLORS[ci % DEFAULT_COLUMN_COLORS.length] }"
          ></span>
          <span class="text-sm font-semibold text-ds-fg font-ds">{{ col.title }}</span>
        </div>
        <span class="text-xs text-ds-fg-muted bg-ds-bg-muted border border-ds-border rounded-full px-1.5 py-0.5 font-mono">
          {{ col.cards.length }}
        </span>
      </div>

      <!-- Cards -->
      <div class="space-y-2 min-h-8">
        <div
          v-for="card in col.cards"
          :key="card.id"
          :draggable="draggable"
          :class="cn(
            'rounded-ds-lg border border-ds-border bg-ds-bg p-3 space-y-2 text-sm',
            'shadow-sm cursor-default select-none',
            draggable && 'cursor-grab active:cursor-grabbing hover:border-ds-primary/30 hover:shadow-md transition-all',
            draggable && dragCardId === card.id ? 'opacity-40' : '',
            draggable && dragOverCardId === card.id ? 'ring-1 ring-ds-primary/40 -translate-y-0.5' : '',
          )"
          @dragstart="() => onDragStart(card.id, col.id)"
          @dragend="onDragEnd"
          @dragover.prevent="e => onDragOver(e, col.id, card.id)"
        >
          <!-- Priority indicator -->
          <div v-if="card.priority" class="flex">
            <span
              :class="cn(
                'text-[10px] font-medium px-1.5 py-0.5 rounded-full border uppercase tracking-wide',
                priorityColors[card.priority],
              )"
            >
              {{ card.priority }}
            </span>
          </div>

          <!-- Title -->
          <p class="font-medium text-ds-fg leading-snug">{{ card.title }}</p>

          <!-- Description -->
          <p v-if="card.description" class="text-xs text-ds-fg-muted leading-relaxed">
            {{ card.description }}
          </p>

          <!-- Tags -->
          <div v-if="card.tags?.length" class="flex flex-wrap gap-1">
            <span
              v-for="tag in card.tags"
              :key="tag"
              class="text-[10px] px-1.5 py-0.5 rounded-full bg-ds-bg-muted border border-ds-border text-ds-fg-muted"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Slot for custom card content -->
          <slot name="card" :card="card" :column="col"></slot>
        </div>

        <!-- Empty state -->
        <div
          v-if="col.cards.length === 0"
          :class="cn(
            'rounded-ds-lg border-2 border-dashed border-ds-border/50 p-4 text-center',
            draggable && dragOverColId === col.id ? 'border-ds-primary/40 bg-ds-primary-subtle/20' : '',
          )"
        >
          <p class="text-xs text-ds-fg-subtle">Drop cards here</p>
        </div>
      </div>
    </div>
  </div>
</template>
