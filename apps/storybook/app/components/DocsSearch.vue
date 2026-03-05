<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { nav } from '~/data/nav'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const router = useRouter()
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

// Build a flat, searchable index from the nav
interface SearchItem {
  title: string
  href: string
  group: string
}

const searchIndex: SearchItem[] = nav.flatMap(group =>
  group.items.map(item => ({
    title: item.title,
    href: item.href,
    group: group.title,
  }))
)

// Filtered results
const results = computed<SearchItem[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) {
    // Show first 12 items when empty
    return searchIndex.slice(0, 12)
  }
  return searchIndex
    .filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q)
    )
    .slice(0, 20)
})

// Group results by category
interface ResultGroup {
  group: string
  items: SearchItem[]
}

const groupedResults = computed<ResultGroup[]>(() => {
  const map = new Map<string, SearchItem[]>()
  for (const item of results.value) {
    if (!map.has(item.group)) map.set(item.group, [])
    map.get(item.group)!.push(item)
  }
  return Array.from(map.entries()).map(([group, items]) => ({ group, items }))
})

// Flat index of results for keyboard nav
const flatResults = computed(() => results.value)

// Focus input when modal opens, reset state
watch(() => props.open, async (val) => {
  if (val) {
    query.value = ''
    activeIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

// Keep activeIndex in bounds when results change
watch(results, () => {
  activeIndex.value = 0
})

// Highlight matched text
function highlight(text: string): string {
  const q = query.value.trim()
  if (!q) return text
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark class="bg-ds-primary-subtle text-ds-primary rounded-sm px-0.5 not-italic font-medium">$1</mark>')
}

function navigate(item: SearchItem) {
  router.push(item.href)
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  const len = flatResults.value.length
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % len
    scrollActiveIntoView()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + len) % len
    scrollActiveIntoView()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = flatResults.value[activeIndex.value]
    if (item) navigate(item)
  } else if (e.key === 'Escape') {
    emit('close')
  }
}

function scrollActiveIntoView() {
  nextTick(() => {
    const el = document.querySelector('[data-search-active="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  })
}

// Get flat index of an item in results
function flatIndex(item: SearchItem): number {
  return flatResults.value.indexOf(item)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4"
        @click.self="emit('close')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="emit('close')" />

        <!-- Panel -->
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="open"
            class="relative z-10 w-full max-w-xl rounded-ds-2xl border border-ds-border bg-ds-bg shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
            @keydown="onKeydown"
          >
            <!-- Input row -->
            <div class="flex items-center gap-3 px-4 border-b border-ds-border shrink-0">
              <!-- Search icon -->
              <svg class="size-4 text-ds-fg-muted shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
              </svg>

              <input
                ref="inputRef"
                v-model="query"
                type="text"
                placeholder="Search components, guides..."
                class="flex-1 py-4 text-sm text-ds-fg placeholder:text-ds-fg-muted bg-transparent outline-none font-ds"
                autocomplete="off"
                spellcheck="false"
              />

              <kbd class="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-ds-fg-muted bg-ds-bg-muted border border-ds-border rounded-ds-sm shrink-0">
                Esc
              </kbd>
            </div>

            <!-- Results -->
            <div class="overflow-y-auto overscroll-contain flex-1">
              <template v-if="groupedResults.length > 0">
                <div v-for="group in groupedResults" :key="group.group">
                  <!-- Group header -->
                  <p class="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-ds-fg-muted font-ds">
                    {{ group.group }}
                  </p>
                  <!-- Items -->
                  <ul>
                    <li
                      v-for="item in group.items"
                      :key="item.href"
                      :data-search-active="flatIndex(item) === activeIndex"
                      class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-ds-lg cursor-pointer transition-colors"
                      :class="flatIndex(item) === activeIndex
                        ? 'bg-ds-primary-subtle text-ds-primary'
                        : 'text-ds-fg hover:bg-ds-bg-muted'"
                      @mouseenter="activeIndex = flatIndex(item)"
                      @click="navigate(item)"
                    >
                      <!-- Icon: document -->
                      <svg class="size-3.5 shrink-0 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
                      </svg>

                      <span
                        class="text-sm flex-1 truncate"
                        v-html="highlight(item.title)"
                      />

                      <!-- Arrow hint -->
                      <svg
                        v-if="flatIndex(item) === activeIndex"
                        class="size-3.5 shrink-0 opacity-60"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </template>

              <!-- Empty state -->
              <div v-else class="flex flex-col items-center justify-center py-12 px-4 text-center">
                <svg class="size-8 text-ds-fg-muted mb-3 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
                </svg>
                <p class="text-sm text-ds-fg-muted font-ds">No results for <span class="font-medium text-ds-fg">"{{ query }}"</span></p>
              </div>
            </div>

            <!-- Footer hints -->
            <div class="flex items-center gap-4 px-4 py-2.5 border-t border-ds-border bg-ds-bg-muted/50 shrink-0">
              <span class="flex items-center gap-1.5 text-[11px] text-ds-fg-muted">
                <kbd class="inline-flex items-center justify-center size-4 text-[9px] border border-ds-border rounded bg-ds-bg font-mono">↵</kbd>
                Navigate
              </span>
              <span class="flex items-center gap-1.5 text-[11px] text-ds-fg-muted">
                <kbd class="inline-flex items-center justify-center size-4 text-[9px] border border-ds-border rounded bg-ds-bg font-mono">↑</kbd>
                <kbd class="inline-flex items-center justify-center size-4 text-[9px] border border-ds-border rounded bg-ds-bg font-mono">↓</kbd>
                Move
              </span>
              <span class="flex items-center gap-1.5 text-[11px] text-ds-fg-muted">
                <kbd class="inline-flex items-center justify-center px-1 h-4 text-[9px] border border-ds-border rounded bg-ds-bg font-mono">Esc</kbd>
                Close
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
