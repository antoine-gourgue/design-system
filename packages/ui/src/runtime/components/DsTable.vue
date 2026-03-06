<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsTableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  width?: string
  sortable?: boolean
}

export interface DsTableProps {
  columns: DsTableColumn[]
  rows: Record<string, unknown>[]
  striped?: boolean
  hoverable?: boolean
  dense?: boolean
  bordered?: boolean
  caption?: string
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  responsive?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsTableProps>(), {
  rows: () => [],
  columns: () => [],
  striped: false,
  hoverable: true,
  dense: false,
  bordered: false,
  sortBy: '',
  sortDir: 'asc',
  responsive: true,
})

const emit = defineEmits<{
  (e: 'sort', key: string): void
}>()

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const tdPadding = computed(() => props.dense ? 'px-4 py-2' : 'px-5 py-3.5')
const thPadding = computed(() => props.dense ? 'px-4 py-2.5' : 'px-5 py-3.5')
</script>

<template>
  <div :class="cn('w-full', props.class)">

    <!-- ── MOBILE: card view ── -->
    <div
      v-if="responsive"
      class="flex flex-col gap-3 sm:hidden"
    >
      <!-- Empty state -->
      <div
        v-if="rows.length === 0"
        class="rounded-ds-lg border border-ds-border px-5 py-10 text-center text-sm text-ds-fg-subtle bg-ds-bg"
      >
        No data available.
      </div>

      <div
        v-for="(row, i) in rows"
        :key="i"
        :class="cn(
          'rounded-ds-lg border border-ds-border bg-ds-bg overflow-hidden',
          hoverable && 'hover:border-ds-primary/30 hover:bg-ds-primary-subtle/20 transition-colors',
        )"
      >
        <div
          v-for="(col, j) in columns"
          :key="col.key"
          :class="cn(
            'flex items-start justify-between gap-4 px-4 py-3',
            j < columns.length - 1 && 'border-b border-ds-border',
            striped && j % 2 === 1 ? 'bg-ds-bg-subtle/50' : '',
          )"
        >
          <!-- Label -->
          <span class="text-xs font-medium text-ds-fg-muted uppercase tracking-wide shrink-0 pt-px">
            {{ col.label }}
          </span>
          <!-- Value -->
          <span
            :class="cn(
              'text-sm text-ds-fg text-right',
              col.align ? alignClass[col.align] : 'text-right',
            )"
          >
            <slot :name="`cell-${col.key}`" :value="row[col.key]" :row="row">
              {{ row[col.key] }}
            </slot>
          </span>
        </div>
      </div>
    </div>

    <!-- ── DESKTOP: table view ── -->
    <div
      :class="cn(
        'w-full overflow-x-auto rounded-ds-lg border border-ds-border',
        responsive ? 'hidden sm:block' : 'block',
      )"
    >
      <table class="w-full text-sm border-collapse">
        <caption
          v-if="caption"
          class="px-5 py-2 text-xs text-ds-fg-subtle text-left border-b border-ds-border bg-ds-bg-subtle"
        >
          {{ caption }}
        </caption>

        <!-- Head -->
        <thead>
          <tr class="bg-ds-bg-subtle border-b border-ds-border">
            <th
              v-for="col in columns"
              :key="col.key"
              :style="col.width ? { width: col.width } : {}"
              :class="cn(
                thPadding,
                'font-medium text-ds-fg-muted whitespace-nowrap select-none',
                col.align ? alignClass[col.align] : 'text-left',
                col.sortable && 'cursor-pointer hover:text-ds-fg transition-colors',
              )"
              @click="col.sortable ? emit('sort', col.key) : undefined"
            >
              <span class="inline-flex items-center gap-1.5">
                {{ col.label }}
                <span v-if="col.sortable" class="inline-flex flex-col gap-0.5 opacity-40">
                  <svg
                    class="size-2.5 transition-opacity"
                    :class="[sortBy === col.key && sortDir === 'asc' ? 'opacity-100 text-ds-primary' : '']"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 3l4 6H4l4-6z" />
                  </svg>
                  <svg
                    class="size-2.5 transition-opacity"
                    :class="[sortBy === col.key && sortDir === 'desc' ? 'opacity-100 text-ds-primary' : '']"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 13l-4-6h8l-4 6z" />
                  </svg>
                </span>
              </span>
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <tr
            v-for="(row, i) in rows"
            :key="i"
            :class="cn(
              'border-b border-ds-border last:border-0 transition-colors',
              striped && i % 2 === 1 ? 'bg-ds-bg-subtle/60' : 'bg-ds-bg',
              hoverable && 'hover:bg-ds-primary-subtle/30',
            )"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="cn(
                tdPadding,
                'text-ds-fg',
                col.align ? alignClass[col.align] : 'text-left',
              )"
            >
              <slot :name="`cell-${col.key}`" :value="row[col.key]" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="rows.length === 0">
            <td
              :colspan="columns.length"
              class="px-5 py-10 text-center text-sm text-ds-fg-subtle"
            >
              No data available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
