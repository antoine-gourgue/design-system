<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsCommandItem {
  id: string
  label: string
  description?: string
  shortcut?: string
  group?: string
  icon?: string
  action: () => void
}

export interface DsCommandPaletteProps {
  modelValue?: boolean
  items?: DsCommandItem[]
  placeholder?: string
  class?: string
}

const props = withDefaults(defineProps<DsCommandPaletteProps>(), {
  modelValue: false,
  items: () => [],
  placeholder: 'Search commands…',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

function close() {
  emit('update:modelValue', false)
}

// Group items
const grouped = computed(() => {
  const q = query.value.trim().toLowerCase()
  const filtered = q
    ? props.items.filter(
        i => i.label.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q),
      )
    : props.items

  const groups: Record<string, DsCommandItem[]> = {}
  for (const item of filtered) {
    const g = item.group ?? 'Actions'
    if (!groups[g])
      groups[g] = []
    groups[g].push(item)
  }
  return groups
})

const flatFiltered = computed(() => Object.values(grouped.value).flat())

function select(item: DsCommandItem) {
  item.action()
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (!props.modelValue)
    return
  if (e.key === 'Escape') {
    close()
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, flatFiltered.value.length - 1)
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    const item = flatFiltered.value[activeIndex.value]
    if (item)
      select(item)
  }
}

watch(() => props.modelValue, async (val) => {
  if (val) {
    query.value = ''
    activeIndex.value = 0
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
    await nextTick()
    inputRef.value?.focus()
  }
  else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})

watch(query, () => {
  activeIndex.value = 0
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cmd-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" @click="close"></div>

        <!-- Panel -->
        <div
          :class="cn(
            'relative w-full max-w-lg rounded-ds-xl border border-ds-border bg-ds-bg-elevated shadow-ds-xl overflow-hidden',
            props.class,
          )"
        >
          <!-- Search input -->
          <div class="flex items-center gap-3 border-b border-ds-border px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0 text-ds-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              :placeholder="placeholder"
              class="flex-1 bg-transparent text-sm text-ds-fg placeholder:text-ds-fg-subtle outline-none"
            >
            <DsKbd size="sm">
              Esc
            </DsKbd>
          </div>

          <!-- Results -->
          <div class="max-h-72 overflow-y-auto">
            <template v-if="flatFiltered.length > 0">
              <div v-for="(groupItems, groupName) in grouped" :key="groupName">
                <div class="px-3 py-1.5 text-xs font-semibold text-ds-fg-subtle uppercase tracking-wide">
                  {{ groupName }}
                </div>
                <button
                  v-for="item in groupItems"
                  :key="item.id"
                  type="button"
                  :class="cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors',
                    flatFiltered.indexOf(item) === activeIndex
                      ? 'bg-ds-primary text-ds-primary-fg'
                      : 'text-ds-fg hover:bg-ds-bg-muted',
                  )"
                  @mouseenter="activeIndex = flatFiltered.indexOf(item)"
                  @click="select(item)"
                >
                  <span class="flex-1 text-sm font-medium">{{ item.label }}</span>
                  <span
                    v-if="item.description"
                    :class="cn(
                      'text-xs',
                      flatFiltered.indexOf(item) === activeIndex ? 'text-ds-primary-fg/70' : 'text-ds-fg-muted',
                    )"
                  >
                    {{ item.description }}
                  </span>
                  <DsKbd
                    v-if="item.shortcut"
                    size="sm"
                    :class="flatFiltered.indexOf(item) === activeIndex ? 'border-ds-primary-fg/30 text-ds-primary-fg' : ''"
                  >
                    {{ item.shortcut }}
                  </DsKbd>
                </button>
              </div>
            </template>

            <!-- Empty -->
            <div v-else class="px-4 py-8 text-center text-sm text-ds-fg-muted">
              No results for "{{ query }}"
            </div>
          </div>

          <!-- Footer hint -->
          <div class="border-t border-ds-border px-4 py-2 flex items-center gap-4 text-xs text-ds-fg-subtle">
            <span class="flex items-center gap-1.5">
              <DsKbd size="sm">↑↓</DsKbd> navigate
            </span>
            <span class="flex items-center gap-1.5">
              <DsKbd size="sm">↵</DsKbd> select
            </span>
            <span class="flex items-center gap-1.5">
              <DsKbd size="sm">Esc</DsKbd> close
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cmd-fade-enter-active,
.cmd-fade-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.cmd-fade-enter-from,
.cmd-fade-leave-to { opacity: 0; transform: scale(0.97) translateY(-8px); }
</style>
