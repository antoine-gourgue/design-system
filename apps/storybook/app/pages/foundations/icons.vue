<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import lucideIcons from '@iconify-json/lucide/icons.json'
import { icons as flagpackIcons } from '@iconify-json/flagpack'
import { icons as simpleIcons } from '@iconify-json/simple-icons'
import { icons as deviconIcons } from '@iconify-json/devicon'
import type { ComponentDoc } from '~/data/components'

type Tone = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'

const search = ref('')
const selectedTone = ref<Tone>('default')
const visibleCount = ref(120)
const copiedName = ref<string | null>(null)
const activeCategory = ref<string | null>(null)
const toneOptions: Tone[] = ['default', 'muted', 'primary', 'success', 'warning', 'danger']

const lucideNames = Object.keys((lucideIcons as { icons: Record<string, unknown> }).icons).sort((a, b) => a.localeCompare(b))
const excludedFlags = new Set([
  'flag-off',
  'flag-oof',
  'flag-triangle-left',
  'flag-triangle-right',
])
const flagNames = Object.keys((flagpackIcons as { icons: Record<string, unknown> }).icons)
  .map(code => `flag-${code.toLowerCase()}`)
  .filter(name => !excludedFlags.has(name))
  .sort((a, b) => a.localeCompare(b))
const simpleIconNames = Object.keys((simpleIcons as { icons: Record<string, unknown> }).icons)
  .map(name => `si:${name}`)
  .sort((a, b) => a.localeCompare(b))
const deviconNames = Object.keys((deviconIcons as { icons: Record<string, unknown> }).icons)
  .map(name => `devicon:${name}`)
  .sort((a, b) => a.localeCompare(b))
const allNames = computed(() =>
  [...lucideNames, ...flagNames, ...simpleIconNames, ...deviconNames]
    .filter(name => !excludedFlags.has(name)),
)

const namesForSelectedCollection = computed(() => allNames.value)

function getCategory(name: string): string {
  if (name.startsWith('flag-')) return 'Flags'
  if (name.startsWith('si:')) return 'Brands'
  if (name.startsWith('devicon:')) return 'Tech'
  if (/^(arrow|chevron|move|corner|panel|fold|unfold|rotate|flip)/.test(name)) return 'Arrows'
  if (/^(user|users|contact|badge-check|id-card)/.test(name)) return 'Users'
  if (/^(mail|message|messages|send|phone|voicemail|at-sign|inbox)/.test(name)) return 'Communication'
  if (/^(file|folder|archive|clipboard|book|receipt|notebook|newspaper)/.test(name)) return 'Files'
  if (/^(image|camera|video|mic|music|headphones|radio|disc|tv|film|clapperboard)/.test(name)) return 'Media'
  if (/^(calendar|clock|timer|alarm|watch|hourglass)/.test(name)) return 'Time'
  if (/^(home|building|map|navigation|compass|globe|route|signpost|car|plane|train|ship|bike)/.test(name)) return 'Navigation'
  if (/^(search|filter|sort|sliders|settings|wrench|hammer|tool|sparkles|wand|scan)/.test(name)) return 'Actions'
  if (/^(shield|lock|unlock|key|fingerprint|badge-alert|shield-check|shield-alert)/.test(name)) return 'Security'
  if (/^(chart|pie|activity|trending|bar-chart|line-chart|gauge|target)/.test(name)) return 'Charts'
  if (/^(sun|moon|cloud|cloudy|cloud-rain|snowflake|wind|umbrella|thermometer)/.test(name)) return 'Weather'
  if (/^(laptop|monitor|smartphone|tablet|cpu|server|database|hard-drive|router|usb)/.test(name)) return 'Devices'
  return 'General'
}

const categoryNames = computed(() => {
  const set = new Set<string>()
  for (const name of namesForSelectedCollection.value)
    set.add(getCategory(name))
  return Array.from(set).sort((a, b) => a.localeCompare(b))
})
const hasSingleCategory = computed(() => categoryNames.value.length <= 1)
const effectiveCategory = computed(() => (
  hasSingleCategory.value ? (categoryNames.value[0] ?? null) : activeCategory.value
))
const namesForEffectiveCategory = computed(() => {
  if (!effectiveCategory.value)
    return namesForSelectedCollection.value
  return namesForSelectedCollection.value.filter(name => getCategory(name) === effectiveCategory.value)
})
const categoryCards = computed(() =>
  categoryNames.value.map((category) => {
    const names = namesForSelectedCollection.value.filter(name => getCategory(name) === category)
    return {
      category,
      sampleNames: names.slice(0, 6),
    }
  }),
)

const iconPlaygroundDoc: ComponentDoc = {
  slug: 'icon',
  componentName: 'DsIcon',
  displayName: 'Icon',
  description: 'Render Lucide icons with a short name API and DS-ready styling controls.',
  category: 'Foundations',
  defaultProps: {
    name: 'user',
    size: 'lg',
    color: 'primary',
    decorative: true,
    ariaLabel: 'User icon',
  },
  controls: [
    { name: 'name', label: 'Name', type: 'text', default: 'user', description: 'Example: "user", "flag-fr", "si:github", "devicon:vuejs".' },
    { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'lg', description: 'Token size.' },
    { name: 'color', label: 'Color', type: 'select', options: ['current', 'default', 'muted', 'subtle', 'primary', 'success', 'warning', 'danger'], default: 'primary', description: 'Design-system semantic tone.' },
    { name: 'decorative', label: 'Decorative', type: 'boolean', default: true, description: 'Hide icon from assistive tech when purely visual.' },
    {
      name: 'ariaLabel',
      label: 'Aria Label',
      type: 'text',
      default: 'User icon',
      description: 'Accessible label when decorative is false.',
      hideIf: props => Boolean(props.decorative),
    },
  ],
  propDefs: [
    { name: 'name', type: 'string', default: "'user'", description: 'Icon name. "user" => lucide, "flag-fr" => flagpack, prefixed names are used as-is.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string", default: "'md'", description: 'Icon size token or CSS size.' },
    { name: 'color', type: "'current' | 'default' | 'muted' | 'subtle' | 'primary' | 'success' | 'warning' | 'danger' | string", default: "'current'", description: 'Semantic tone or custom CSS color.' },
    { name: 'decorative', type: 'boolean', default: 'true', description: 'When true, icon is hidden from screen readers.' },
    { name: 'ariaLabel', type: 'string', description: 'Accessible label when decorative is false.' },
  ],
  examples: [
    { label: 'Default', props: { name: 'user' } },
    { label: 'Primary large', props: { name: 'star', color: 'primary', size: 'xl' } },
    { label: 'Warning', props: { name: 'triangle-alert', color: 'warning' } },
    { label: 'Country flag', props: { name: 'flag-fr', size: 'xl' } },
    { label: 'Brand logo', props: { name: 'si:github' } },
    { label: 'Tech logo', props: { name: 'devicon:vuejs' } },
    { label: 'Accessible icon', props: { name: 'info', decorative: false, ariaLabel: 'Information' } },
  ],
}

const filteredIcons = computed(() => {
  const q = search.value.trim().toLowerCase()
  return namesForEffectiveCategory.value.filter((name) => {
    const matchesSearch = !q || name.includes(q)
    return matchesSearch
  })
})

const visibleIcons = computed(() => filteredIcons.value.slice(0, visibleCount.value))
const isSearching = computed(() => search.value.trim().length > 0)

function resetPagination() {
  visibleCount.value = 120
}

function showMore() {
  visibleCount.value += 120
}

async function copySnippet(name: string) {
  const snippet = `<DsIcon name="${name}" />`
  try {
    await navigator.clipboard.writeText(snippet)
    copiedName.value = name
    setTimeout(() => {
      if (copiedName.value === name)
        copiedName.value = null
    }, 1600)
  } catch {}
}

watch([search, activeCategory], resetPagination)
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-6 font-ds">
      <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
      <span>/</span>
      <span class="text-ds-fg">Icons</span>
    </div>

    <h1 class="text-4xl font-bold text-ds-fg tracking-tight mb-3 font-ds">Icons</h1>
    <p class="text-lg text-ds-fg-muted mb-6 font-ds leading-relaxed">
      Lucide, flags, brands and tech icons are available with a single API. Use only the icon name:
      <code class="text-sm font-mono bg-ds-bg-muted px-1.5 py-0.5 rounded text-ds-primary ml-1">&lt;DsIcon name="user" /&gt;</code>.
      For flags, use <code class="text-sm font-mono bg-ds-bg-muted px-1.5 py-0.5 rounded text-ds-primary ml-1">&lt;DsIcon name="flag-fr" /&gt;</code>.
      For brands and tech, use <code class="text-sm font-mono bg-ds-bg-muted px-1.5 py-0.5 rounded text-ds-primary ml-1">&lt;DsIcon name="si:github" /&gt;</code> and <code class="text-sm font-mono bg-ds-bg-muted px-1.5 py-0.5 rounded text-ds-primary ml-1">&lt;DsIcon name="devicon:vuejs" /&gt;</code>.
    </p>

    <div class="mb-8">
      <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Playground</h2>
      <DocsPlayground :doc="iconPlaygroundDoc" />
    </div>

    <div class="rounded-ds-lg border border-ds-border bg-ds-bg p-4 sm:p-5 mb-8 space-y-4">
      <div class="grid grid-cols-1 gap-3">
        <div>
          <p class="text-xs text-ds-fg-subtle uppercase tracking-wider font-semibold font-ds mb-1.5">Search icon</p>
          <DsInput
            v-model="search"
            type="text"
            placeholder="ex: user, arrow-right, calendar"
            size="md"
            class="w-full"
          >
            <template #leading>
              <DsIcon name="search" size="sm" color="muted" />
            </template>
          </DsInput>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <DsButton
          v-for="tone in toneOptions"
          :key="tone"
          :variant="selectedTone === tone ? 'secondary' : 'ghost'"
          size="sm"
          @click="selectedTone = tone"
        >
          {{ tone }}
        </DsButton>
      </div>

    </div>

    <div v-if="!hasSingleCategory && !activeCategory && !isSearching" class="mb-8">
      <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Categories</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="item in categoryCards"
          :key="item.category"
          type="button"
          class="rounded-ds-lg border border-ds-border bg-ds-bg hover:border-ds-primary/40 hover:bg-ds-primary-subtle transition-colors p-4 text-left"
          @click="activeCategory = item.category"
        >
          <p class="text-sm font-semibold text-ds-fg font-ds mb-3">{{ item.category }}</p>
          <div class="flex items-center gap-2">
            <DsIcon
              v-for="sample in item.sampleNames"
              :key="sample"
              :name="sample"
              size="sm"
              color="muted"
            />
          </div>
        </button>
      </div>
    </div>

    <div v-if="hasSingleCategory || activeCategory || isSearching" class="mb-4 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <DsButton
          v-if="!hasSingleCategory && !isSearching"
          variant="ghost"
          size="icon-sm"
          aria-label="Back to categories"
          title="Back to categories"
          @click="activeCategory = null"
        >
          <DsIcon name="chevron-left" size="sm" />
        </DsButton>
        <h2 class="text-lg font-semibold text-ds-fg font-ds">
          {{ isSearching ? 'Search results' : (effectiveCategory ?? 'Icons') }}
        </h2>
      </div>
    </div>

    <div v-if="hasSingleCategory || activeCategory || isSearching" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
      <button
        v-for="name in visibleIcons"
        :key="name"
        type="button"
        class="group rounded-ds-md border border-ds-border bg-ds-bg hover:border-ds-primary/40 hover:bg-ds-primary-subtle transition-colors p-3 text-left"
        :title="`Copier <DsIcon name=&quot;${name}&quot; />`"
        @click="copySnippet(name)"
      >
        <div class="flex items-center justify-center h-9 mb-2">
          <DsIcon :name="name" size="md" :color="selectedTone" />
        </div>
        <p class="text-[11px] leading-tight text-ds-fg-muted group-hover:text-ds-fg transition-colors font-mono break-all">
          {{ name }}
        </p>
        <p class="mt-1 text-[10px] text-ds-fg-subtle font-ds">
          {{ copiedName === name ? 'Copied' : '<DsIcon />' }}
        </p>
      </button>
    </div>

    <div v-if="(hasSingleCategory || activeCategory || isSearching) && visibleIcons.length < filteredIcons.length" class="mt-8 flex justify-center">
      <DsButton variant="secondary" size="sm" @click="showMore">
        Load 120 more
      </DsButton>
    </div>

    <div v-if="(hasSingleCategory || activeCategory || isSearching) && filteredIcons.length === 0" class="rounded-ds-lg border border-ds-border bg-ds-bg-subtle p-6 text-center">
      <p class="text-sm text-ds-fg-muted font-ds">No icons found for this filter.</p>
    </div>
  </div>
</template>
