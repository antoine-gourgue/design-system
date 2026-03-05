<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../utils/cn'

export type SortDir = 'asc' | 'desc' | null

export interface DataTableColumn {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  format?: (val: unknown, row: Record<string, unknown>) => string
}

export interface DsDataTableProps {
  columns: DataTableColumn[]
  rows: Record<string, unknown>[]
  searchable?: boolean
  searchPlaceholder?: string
  striped?: boolean
  bordered?: boolean
  compact?: boolean
  perPage?: number
  class?: string
}

const props = withDefaults(defineProps<DsDataTableProps>(), {
  searchable: true,
  searchPlaceholder: 'Search...',
  striped: false,
  bordered: false,
  compact: false,
  perPage: 10,
})

const search = ref('')
const sortKey = ref<string | null>(null)
const sortDir = ref<SortDir>(null)
const page = ref(1)

function setSort(key: string) {
  if (sortKey.value === key) {
    if (sortDir.value === 'asc') sortDir.value = 'desc'
    else if (sortDir.value === 'desc') { sortKey.value = null; sortDir.value = null }
    else sortDir.value = 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
  page.value = 1
}

const filtered = computed(() => {
  if (!search.value.trim()) return props.rows
  const q = search.value.toLowerCase()
  return props.rows.filter(row =>
    Object.values(row as Record<string, unknown>).some(v =>
      String(v ?? '').toLowerCase().includes(q)
    )
  )
})

const sorted = computed(() => {
  if (!sortKey.value || !sortDir.value) return filtered.value
  return [...filtered.value].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)[sortKey.value!]
    const bVal = (b as Record<string, unknown>)[sortKey.value!]
    const cmp = String(aVal ?? '').localeCompare(String(bVal ?? ''), undefined, { numeric: true })
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / props.perPage)))

const paginated = computed(() => {
  const start = (page.value - 1) * props.perPage
  return sorted.value.slice(start, start + props.perPage)
})

function getCellValue(row: Record<string, unknown>, col: DataTableColumn): string {
  const val = row[col.key]
  if (col.format) return col.format(val, row)
  return String(val ?? '-')
}

const alignClass: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}
</script>

<template>
  <div :class="cn('w-full space-y-3', props.class)">
    <!-- Search bar -->
    <div v-if="searchable" class="flex items-center gap-2">
      <div class="relative flex-1 max-w-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ds-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          v-model="search"
          type="search"
          :placeholder="searchPlaceholder"
          class="w-full h-9 pl-9 pr-3 text-sm rounded-ds-md border border-ds-border bg-ds-bg text-ds-fg placeholder:text-ds-fg-muted focus:outline-none focus:ring-2 focus:ring-ds-ring"
          @input="page = 1"
        />
      </div>
      <span v-if="search" class="text-xs text-ds-fg-muted">{{ filtered.length }} result{{ filtered.length !== 1 ? 's' : '' }}</span>
    </div>

    <!-- Table -->
    <div class="w-full overflow-x-auto rounded-ds-xl border border-ds-border">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-ds-border bg-ds-bg-muted">
            <th
              v-for="col in columns"
              :key="col.key"
              :class="cn(
                'px-4 py-2.5 font-medium text-ds-fg-muted text-xs uppercase tracking-wide',
                alignClass[col.align ?? 'left'],
                col.sortable ? 'cursor-pointer select-none hover:text-ds-fg' : ''
              )"
              @click="col.sortable ? setSort(col.key) : null"
            >
              <span class="inline-flex items-center gap-1">
                {{ col.label }}
                <template v-if="col.sortable">
                  <svg
                    v-if="sortKey === col.key && sortDir === 'asc'"
                    xmlns="http://www.w3.org/2000/svg" class="size-3.5 text-ds-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg
                    v-else-if="sortKey === col.key && sortDir === 'desc'"
                    xmlns="http://www.w3.org/2000/svg" class="size-3.5 text-ds-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg" class="size-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </template>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in paginated"
            :key="i"
            :class="cn(
              'border-b border-ds-border last:border-0 transition-colors hover:bg-ds-bg-muted/50',
              striped && i % 2 !== 0 ? 'bg-ds-bg-muted/30' : ''
            )"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="cn(
                'px-4 py-3 text-ds-fg',
                compact ? 'py-2' : 'py-3',
                alignClass[col.align ?? 'left']
              )"
            >
              <slot :name="`cell-${col.key}`" :value="(row as Record<string, unknown>)[col.key]" :row="row">
                {{ getCellValue(row as Record<string, unknown>, col) }}
              </slot>
            </td>
          </tr>
          <tr v-if="paginated.length === 0">
            <td :colspan="columns.length" class="px-4 py-12 text-center text-sm text-ds-fg-muted">
              No results found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-between text-xs text-ds-fg-muted">
      <span>
        Showing {{ (page - 1) * perPage + 1 }}-{{ Math.min(page * perPage, sorted.length) }} of {{ sorted.length }}
      </span>
      <div class="flex items-center gap-1">
        <button
          class="h-7 w-7 flex items-center justify-center rounded-ds-md border border-ds-border hover:bg-ds-bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :disabled="page === 1"
          @click="page--"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <template v-for="p in totalPages" :key="p">
          <button
            v-if="Math.abs(p - page) < 3 || p === 1 || p === totalPages"
            class="h-7 min-w-7 px-1.5 flex items-center justify-center rounded-ds-md border transition-colors"
            :class="p === page
              ? 'border-ds-primary bg-ds-primary-subtle text-ds-primary font-medium'
              : 'border-ds-border hover:bg-ds-bg-muted text-ds-fg-muted'"
            @click="page = p"
          >{{ p }}</button>
          <span v-else-if="(p === page - 3 || p === page + 3)" class="px-0.5">…</span>
        </template>
        <button
          class="h-7 w-7 flex items-center justify-center rounded-ds-md border border-ds-border hover:bg-ds-bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :disabled="page === totalPages"
          @click="page++"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
