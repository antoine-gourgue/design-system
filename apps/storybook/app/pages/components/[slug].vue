<script setup lang="ts">
import { computed, ref, resolveComponent } from 'vue'
import { useRoute } from 'vue-router'
import { getComponentDoc } from '~/data/components'
import { useCodegen } from '~/composables/useCodegen'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const doc = computed(() => getComponentDoc(slug.value))

const { generateCode } = useCodegen()

// Calendar demo state
const calendarSelected = ref<Date | null>(new Date())

// Pagination demo state
const paginationPage = ref(3)

// Table demo data
const tableColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', align: 'center' as const },
]
const tableRows = [
  { name: 'Antoine Gourgue', role: 'Staff Engineer', status: 'Active' },
  { name: 'Marie Dupont', role: 'Designer', status: 'Active' },
  { name: 'Luc Martin', role: 'Product Manager', status: 'Away' },
  { name: 'Sophie Bernard', role: 'Frontend Dev', status: 'Offline' },
]

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Component not found' })
}

// Compound components that need custom examples and cannot use the generic playground
const compoundSlugs = [
  'accordion', 'tabs', 'modal', 'dropdown', 'toast', 'card',
  'table', 'calendar', 'stat-card', 'pagination',
  'select', 'radio-group', 'slider', 'number-input', 'otp-input',
  'empty-state', 'timeline', 'stepper',
  'sheet', 'drawer', 'collapsible', 'command-palette', 'context-menu',
  'alert-dialog', 'popover', 'date-picker',
  'toggle', 'toggle-group', 'data-table',
  'hover-card', 'carousel', 'scroll-area',
  'file-upload', 'color-picker', 'phone-input',
  'line-chart', 'bar-chart', 'donut-chart', 'sparkline', 'radar-chart',
  'combobox', 'multi-select', 'tag-input', 'date-range-picker', 'time-picker',
  'avatar-group', 'tree-view', 'notification-item',
  'banner', 'confirm-dialog', 'loading-overlay', 'navigation-menu', 'menubar',
  'code-block', 'aspect-ratio', 'visually-hidden',
]
const isCompound = computed(() => compoundSlugs.includes(doc.value?.slug ?? ''))

useHead({
  title: computed(() => doc.value ? `${doc.value.displayName} — DDS` : 'DDS'),
})

const skeletonComponent = computed(() => {
  if (!doc.value?.skeleton) return null
  try {
    return resolveComponent(doc.value.skeleton.componentName)
  } catch {
    return null
  }
})

function generateExampleCode(
  componentName: string,
  props: Record<string, unknown>,
  slot?: string,
): string {
  return generateCode(componentName, props, slot)
}

// Pre-defined code strings for complex compound examples
const accordionCode = `<DsAccordion type="single">
  <DsAccordionItem value="item-1" title="What is DDS?">
    DDS is a minimal design system for Nuxt 4.
  </DsAccordionItem>
  <DsAccordionItem value="item-2" title="How do I install it?">
    Run npm install design-system-antoinegourgue.
  </DsAccordionItem>
</DsAccordion>`

const tabsCode = `<DsTabs>
  <DsTabList>
    <DsTab value="overview">Overview</DsTab>
    <DsTab value="details">Details</DsTab>
  </DsTabList>
  <DsTabPanels>
    <DsTabPanel value="overview">Overview content.</DsTabPanel>
    <DsTabPanel value="details">Details content.</DsTabPanel>
  </DsTabPanels>
</DsTabs>`

const modalCode = `<script setup>
const open = ref(false)
<\/script>

<template>
  <DsButton @click="open = true">Open modal</DsButton>
  <DsModal v-model="open" title="Confirmation">
    Are you sure you want to continue?
    <template #footer>
      <DsButton variant="ghost" @click="open = false">Cancel</DsButton>
      <DsButton @click="open = false">Confirm</DsButton>
    </template>
  </DsModal>
</template>`

const cardArticleCode = `<DsCard class="w-full max-w-sm" shadow="md">
  <DsCardHeader :divided="true">
    <div class="flex items-center justify-between">
      <DsBadge variant="primary" size="sm">Design</DsBadge>
      <span class="text-xs text-ds-fg-subtle">5 min read</span>
    </div>
    <h3 class="font-semibold text-ds-fg mt-2">Design tokens in practice</h3>
  </DsCardHeader>
  <DsCardContent>
    <p class="text-sm text-ds-fg-muted leading-relaxed">
      Learn how to build a scalable design system using CSS custom
      properties and Tailwind CSS presets.
    </p>
  </DsCardContent>
  <DsCardFooter align="between">
    <span class="text-xs text-ds-fg-subtle">Mar 5, 2026</span>
    <DsButton variant="ghost" size="sm">Read more</DsButton>
  </DsCardFooter>
</DsCard>`

const cardProfileCode = `<DsCard class="w-full max-w-sm">
  <DsCardHeader :divided="true">
    <div class="flex items-center gap-3">
      <div class="size-10 rounded-full bg-ds-primary-subtle flex items-center justify-center shrink-0">
        <span class="text-sm font-bold text-ds-primary">AG</span>
      </div>
      <div>
        <p class="font-semibold text-ds-fg text-sm">Antoine Gourgue</p>
        <p class="text-xs text-ds-fg-muted">Staff Frontend Engineer</p>
      </div>
    </div>
  </DsCardHeader>
  <DsCardContent>
    <p class="text-sm text-ds-fg-muted leading-relaxed">
      Building design systems and developer tools.
      Focused on Nuxt, Vue 3 and TypeScript.
    </p>
  </DsCardContent>
  <DsCardFooter>
    <DsButton variant="secondary" size="sm" class="flex-1">Message</DsButton>
    <DsButton size="sm" class="flex-1">Follow</DsButton>
  </DsCardFooter>
</DsCard>`

const cardSimpleCode = `<!-- Simple usage with padding prop (no sub-components needed) -->
<DsCard padding="md" class="w-full max-w-sm">
  <p class="text-sm font-semibold text-ds-fg mb-1">Quick note</p>
  <p class="text-sm text-ds-fg-muted">
    Use padding prop for simple cards that don't need structured sections.
  </p>
</DsCard>`

const dropdownCode = `<DsDropdown
  :items="[
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { divider: true },
    { label: 'Delete', value: 'delete', destructive: true },
  ]"
  placement="bottom-start"
>
  <template #trigger>
    <DsButton variant="secondary">Actions</DsButton>
  </template>
</DsDropdown>`

const toastCode = `<script setup>
const { toast } = useToast()
<\/script>

<template>
  <DsButton @click="toast({ title: 'Saved', description: 'Changes applied.', variant: 'success' })">
    Show toast
  </DsButton>
</template>`

const tableCode = `<script setup lang="ts">
const columns = [
  { key: 'name',   label: 'Name',   sortable: true },
  { key: 'role',   label: 'Role' },
  { key: 'status', label: 'Status', align: 'center' },
]
const rows = [
  { name: 'Antoine Gourgue', role: 'Staff Engineer',   status: 'Active' },
  { name: 'Marie Dupont',    role: 'Designer',          status: 'Active' },
  { name: 'Luc Martin',      role: 'Product Manager',   status: 'Away'   },
]
<\/script>

<template>
  <DsTable :columns="columns" :rows="rows" striped hoverable />
</template>`

const tableStripedCode = `<DsTable :columns="columns" :rows="rows" striped />`

const calendarCode = `<script setup lang="ts">
const selected = ref(new Date())
<\/script>

<template>
  <DsCalendar v-model="selected" />
  <p class="text-sm text-ds-fg-muted mt-2">
    Selected: {{ selected?.toLocaleDateString() }}
  </p>
</template>`

const paginationCode = `<script setup lang="ts">
const page = ref(1)
<\/script>

<template>
  <DsPagination v-model="page" :total="100" :per-page="10" />
  <p class="text-sm text-ds-fg-muted mt-2">Page {{ page }} of 10</p>
</template>`

const statCardCode = `<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
  <DsStatCard label="Revenue"       value="$48,200" trend="+8.2%"  :trendUp="true"  description="vs last month" />
  <DsStatCard label="Active users"  value="1,280"   trend="+24%"   :trendUp="true" />
  <DsStatCard label="Churn rate"    value="2.4%"    trend="-0.3%"  :trendUp="false" />
  <DsStatCard label="Open tickets"  value="34" />
</div>`

// ── New component demo state ──
const selectValue = ref('')
const radioValue = ref('b')
const radioOptions = [
  { label: 'Starter', value: 'a', description: 'For individuals and small projects' },
  { label: 'Pro', value: 'b', description: 'For teams and growing businesses' },
  { label: 'Enterprise', value: 'c', description: 'For large organisations' },
]
const sliderValue = ref(40)
const numberValue = ref(3)
const otpValue = ref('')
const sheetOpen = ref(false)
const sheetSide = ref<'left' | 'right' | 'bottom'>('right')
const drawerOpen = ref(false)
const drawerSide = ref<'left' | 'right' | 'bottom' | 'top'>('right')
const collapsibleOpen = ref(false)
const commandOpen = ref(false)
const stepperStep = ref(1)
const ratingValue = ref(3)

const commandItems = [
  { id: '1', label: 'Go to Dashboard', shortcut: '⌘D', group: 'Navigation', action: () => {} },
  { id: '2', label: 'Go to Components', shortcut: '⌘C', group: 'Navigation', action: () => {} },
  { id: '3', label: 'Toggle theme', shortcut: '⌘T', group: 'Actions', action: () => {} },
  { id: '4', label: 'Copy page link', shortcut: '⌘⇧C', group: 'Actions', action: () => {} },
  { id: '5', label: 'Open on GitHub', group: 'Links', action: () => {} },
]

const timelineItems = [
  { title: 'Package published', description: 'v1.0.0 released to npm.', date: 'Jan 12', status: 'done' as const },
  { title: 'Documentation launched', description: 'Premium docs site deployed.', date: 'Feb 3', status: 'done' as const },
  { title: 'New components merged', description: '14 new components added.', date: 'Mar 5', status: 'current' as const },
  { title: 'v2.0 planning', description: 'Roadmap under discussion.', date: 'Apr', status: 'pending' as const },
]

const stepperSteps = [
  { label: 'Account', description: 'Basic information' },
  { label: 'Profile', description: 'Your preferences' },
  { label: 'Review', description: 'Check details' },
  { label: 'Done', description: 'All set' },
]

const contextItems = [
  { label: 'Open', action: () => {} },
  { label: 'Open in new tab', action: () => {} },
  { type: 'separator' as const },
  { label: 'Copy link', shortcut: '⌘C', action: () => {} },
  { label: 'Share', action: () => {} },
  { type: 'separator' as const },
  { label: 'Delete', danger: true, action: () => {} },
]

const selectCode = `<script setup lang="ts">
const value = ref('')
const options = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'eng' },
  { label: 'Product', value: 'product' },
]
<\/script>
<template>
  <DsSelect v-model="value" :options="options" placeholder="Select a team" class="w-64" />
</template>`

const radioGroupCode = `<script setup lang="ts">
const plan = ref('pro')
const options = [
  { label: 'Starter', value: 'starter', description: 'For individuals' },
  { label: 'Pro', value: 'pro', description: 'For teams' },
  { label: 'Enterprise', value: 'enterprise', description: 'For large orgs' },
]
<\/script>
<template>
  <DsRadioGroup v-model="plan" :options="options" />
</template>`

const sliderCode = `<script setup lang="ts">
const volume = ref(40)
<\/script>
<template>
  <DsSlider v-model="volume" label="Volume" :min="0" :max="100" class="w-72" />
</template>`

const numberInputCode = `<script setup lang="ts">
const qty = ref(1)
<\/script>
<template>
  <DsNumberInput v-model="qty" :min="0" :max="99" />
</template>`

const otpCode = `<script setup lang="ts">
const code = ref('')
<\/script>
<template>
  <DsOtpInput v-model="code" :length="6" @complete="(v) => console.log('Code:', v)" />
</template>`

const emptyStateCode = `<DsEmptyState
  title="No results found"
  description="Try adjusting your filters or search term."
>
  <template #icon>
    <!-- your icon here -->
  </template>
  <DsButton>Clear filters</DsButton>
</DsEmptyState>`

const timelineCode = `<DsTimeline :items="[
  { title: 'Package published', description: 'v1.0.0 released.', date: 'Jan 12', status: 'done' },
  { title: 'Docs launched',     description: 'Site deployed.',   date: 'Feb 3',  status: 'done' },
  { title: 'New components',    description: '14 new comps.',    date: 'Mar 5',  status: 'current' },
  { title: 'v2.0 planning',     date: 'Apr',  status: 'pending' },
]" />`

const stepperCode = `<script setup lang="ts">
const step = ref(0)
const steps = [
  { label: 'Account', description: 'Basic info' },
  { label: 'Profile', description: 'Preferences' },
  { label: 'Review',  description: 'Check' },
  { label: 'Done',    description: 'All set' },
]
<\/script>
<template>
  <DsStepper v-model="step" :steps="steps" />
</template>`

const sheetCode = `<script setup lang="ts">
const open = ref(false)
<\/script>
<template>
  <DsButton @click="open = true">Open sheet</DsButton>
  <DsSheet v-model="open" title="Settings" description="Manage your preferences." side="right">
    <p class="text-sm text-ds-fg-muted">Sheet content goes here.</p>
    <template #footer>
      <DsButton variant="ghost" @click="open = false">Cancel</DsButton>
      <DsButton @click="open = false">Save</DsButton>
    </template>
  </DsSheet>
</template>`

const drawerCode = `<script setup lang="ts">
const open = ref(false)
const side = ref('right')
<\/script>
<template>
  <DsButton @click="side = 'right'; open = true">Open drawer</DsButton>

  <DsDrawer v-model="open" :side="side" size="md">
    <DsDrawerHeader title="User settings" description="Manage your account preferences." />
    <DsDrawerContent>
      <p class="text-sm text-ds-fg-muted">Drawer content goes here.</p>
    </DsDrawerContent>
    <DsDrawerFooter>
      <DsButton variant="outline" class="flex-1" @click="open = false">Cancel</DsButton>
      <DsButton class="flex-1" @click="open = false">Save changes</DsButton>
    </DsDrawerFooter>
  </DsDrawer>
</template>`

const collapsibleCode = `<script setup lang="ts">
const open = ref(false)
<\/script>
<template>
  <DsCollapsible v-model="open" title="Advanced options">
    <div class="pt-2 space-y-2 text-sm text-ds-fg-muted">
      <p>Additional settings appear here when expanded.</p>
    </div>
  </DsCollapsible>
</template>`

const commandPaletteCode = `<script setup lang="ts">
const open = ref(false)
const items = [
  { id: '1', label: 'Dashboard', shortcut: '⌘D', group: 'Navigation', action: () => navigateTo('/') },
  { id: '2', label: 'Toggle theme', shortcut: '⌘T', group: 'Actions', action: toggleTheme },
]
<\/script>
<template>
  <DsButton @click="open = true">Open palette  <DsKbd size="sm">⌘K</DsKbd></DsButton>
  <DsCommandPalette v-model="open" :items="items" />
</template>`

const contextMenuCode = `<DsContextMenu :items="[
  { label: 'Open', action: () => {} },
  { label: 'Copy link', shortcut: '⌘C', action: () => {} },
  { type: 'separator' },
  { label: 'Delete', danger: true, action: () => {} },
]">
  <div class="p-8 rounded-ds-lg border border-dashed border-ds-border text-sm text-ds-fg-muted text-center">
    Right-click me
  </div>
</DsContextMenu>`

// ── New components code strings ──
const alertDialogCode = `<script setup>
const open = ref(false)
<\/script>
<template>
  <DsButton @click="open = true">Delete account</DsButton>
  <DsAlertDialog
    v-model="open"
    title="Delete account?"
    description="This will permanently delete your account and all data."
    confirm-label="Delete"
    cancel-label="Cancel"
    variant="destructive"
    @confirm="open = false"
    @cancel="open = false"
  />
</template>`

const popoverCode = `<DsPopover side="bottom" align="start">
  <template #trigger>
    <DsButton variant="outline">Open popover</DsButton>
  </template>
  <div class="space-y-2">
    <p class="text-sm font-medium text-ds-fg">Panel title</p>
    <p class="text-xs text-ds-fg-muted">Any content can go here — forms, links, lists.</p>
    <DsButton size="sm" class="w-full">Action</DsButton>
  </div>
</DsPopover>`

const datePickerCode = `<script setup>
const date = ref(null)
<\/script>
<template>
  <DsDatePicker v-model="date" placeholder="Pick a date" format="DD/MM/YYYY" />
</template>`

const toggleCode = `<script setup>
const pressed = ref(false)
<\/script>
<template>
  <DsToggle v-model="pressed">Bold</DsToggle>
</template>`

const toggleGroupCode = `<script setup>
const view = ref('list')
const items = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
  { value: 'table', label: 'Table' },
]
<\/script>
<template>
  <DsToggleGroup v-model="view" :items="items" type="single" />
</template>`

const dataTableCode = `<script setup>
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'joined', label: 'Joined', sortable: true },
]
const rows = [
  { name: 'Alice Martin', role: 'Engineer', status: 'Active', joined: '2024-01-15' },
  { name: 'Bob Dupont', role: 'Designer', status: 'Active', joined: '2023-11-02' },
  { name: 'Claire Morel', role: 'PM', status: 'Inactive', joined: '2024-03-20' },
]
<\/script>
<template>
  <DsDataTable :columns="columns" :rows="rows" :searchable="true" :striped="false" :per-page="10" />
</template>`

const hoverCardCode = `<DsHoverCard side="bottom" align="start">
  <template #trigger>
    <span class="text-ds-primary underline underline-offset-2 cursor-pointer text-sm">@antoine</span>
  </template>
  <div class="flex items-center gap-3 mb-3">
    <div class="size-10 rounded-full bg-ds-primary-subtle flex items-center justify-center">
      <span class="text-sm font-bold text-ds-primary">AG</span>
    </div>
    <div>
      <p class="text-sm font-semibold text-ds-fg">Antoine Gourgue</p>
      <p class="text-xs text-ds-fg-muted">Staff Frontend Engineer</p>
    </div>
  </div>
  <p class="text-xs text-ds-fg-muted">Building design systems with Nuxt 4 and Tailwind CSS.</p>
</DsHoverCard>`

const carouselCode = `<DsCarousel :count="3" :arrows="true" :dots="true" :loop="true">
  <DsCarouselSlide>
    <div class="flex items-center justify-center h-48 bg-ds-primary-subtle rounded-ds-lg text-ds-primary font-semibold">
      Slide 1
    </div>
  </DsCarouselSlide>
  <DsCarouselSlide>
    <div class="flex items-center justify-center h-48 bg-ds-success-subtle rounded-ds-lg text-ds-success font-semibold">
      Slide 2
    </div>
  </DsCarouselSlide>
  <DsCarouselSlide>
    <div class="flex items-center justify-center h-48 bg-ds-warning-subtle rounded-ds-lg text-ds-warning font-semibold">
      Slide 3
    </div>
  </DsCarouselSlide>
</DsCarousel>`

const scrollAreaCode = `<DsScrollArea max-height="200px" class="w-full border border-ds-border rounded-ds-lg p-3">
  <p v-for="i in 20" :key="i" class="text-sm text-ds-fg py-1 border-b border-ds-border last:border-0">
    Item {{ i }} — scroll to see more
  </p>
</DsScrollArea>`

const fileUploadCode = `<script setup>
const files = ref([])
<\/script>
<template>
  <DsFileUpload
    v-model="files"
    accept=".pdf,.png,.jpg"
    :multiple="true"
    :max-size="5 * 1024 * 1024"
  />
</template>`

const colorPickerCode = `<script setup>
const color = ref('#7f00ff')
<\/script>
<template>
  <DsColorPicker v-model="color" :show-input="true" />
</template>`

const phoneInputCode = `<script setup>
const phone = ref('')
<\/script>
<template>
  <DsPhoneInput v-model="phone" placeholder="6 00 00 00 00" />
</template>`

// ── Chart code strings ──
const lineChartCode = `<DsLineChart
  :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
  :datasets="[
    { label: 'Revenue', data: [4200, 5800, 4900, 7200, 6800, 9100] },
    { label: 'Expenses', data: [3100, 3600, 4100, 3800, 4500, 5200] },
  ]"
  :show-area="true"
  :show-dots="true"
  :show-grid="true"
/>`

const barChartCode = `<DsBarChart
  :labels="['Q1', 'Q2', 'Q3', 'Q4']"
  :datasets="[
    { label: '2024', data: [42000, 58000, 51000, 73000] },
    { label: '2025', data: [54000, 67000, 62000, 89000] },
  ]"
  :show-grid="true"
  :show-values="false"
/>`

const donutChartCode = `<DsDonutChart
  :data="[
    { label: 'Direct', value: 4200 },
    { label: 'Organic', value: 2800 },
    { label: 'Referral', value: 1900 },
    { label: 'Social', value: 1100 },
  ]"
  :show-legend="true"
  :show-total="true"
  total-label="Sessions"
/>`

const sparklineCode = `<!-- Line sparkline (for KPI cards) -->
<DsSparkline
  :data="[12, 18, 14, 22, 19, 28, 25, 31]"
  type="line"
  color="#7f00ff"
  :show-area="true"
  :width="100"
  :height="36"
/>

<!-- Bar sparkline with trend color -->
<DsSparkline
  :data="[8, 14, 11, 6, 9, 13, 17]"
  type="bar"
  :trend-color="true"
  :width="80"
  :height="32"
  :show-value="true"
/>`

// ── New component code strings ──
const comboboxCode = `<script setup>
const options = [
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'vue', label: 'Vue' },
  { value: 'react', label: 'React' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
]
const selected = ref('')
<\/script>
<template>
  <DsCombobox
    v-model="selected"
    :options="options"
    placeholder="Select a framework…"
    :clearable="true"
  />
</template>`

const multiSelectCode = `<script setup>
const options = [
  { value: 'ts', label: 'TypeScript' },
  { value: 'vue', label: 'Vue' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'vite', label: 'Vite' },
]
const selected = ref(['ts', 'vue'])
<\/script>
<template>
  <DsMultiSelect v-model="selected" :options="options" :max="4" />
</template>`

const tagInputCode = `<script setup>
const tags = ref(['Nuxt', 'Vue 3'])
<\/script>
<template>
  <DsTagInput v-model="tags" placeholder="Add a tag and press Enter…" :max="5" />
</template>`

const avatarGroupCode = `<DsAvatarGroup
  :items="[
    { initials: 'AG', alt: 'Antoine Gourgue' },
    { initials: 'MD', alt: 'Marie Dupont' },
    { initials: 'LM', alt: 'Luc Martin' },
    { initials: 'SB', alt: 'Sophie Bernard' },
    { initials: 'PL', alt: 'Pierre Leroy' },
    { initials: 'CK', alt: 'Camille Klein' },
  ]"
  :max="4"
  size="md"
/>`

const dateRangeCode = `<script setup>
const range = ref({ start: null, end: null })
<\/script>
<template>
  <DsDateRangePicker v-model="range" placeholder="Pick a date range" />
</template>`

const timePickerCode = `<script setup>
const time = ref('09:30')
<\/script>
<template>
  <DsTimePicker v-model="time" format="24" />
  <!-- 12h format with seconds -->
  <DsTimePicker v-model="time" format="12" :show-seconds="true" />
</template>`

const bannerCode = `<DsBanner variant="info" :dismissible="true">
  New version 2.0 is available.
  <a href="#" class="font-semibold underline ml-1">Read the changelog.</a>
</DsBanner>

<DsBanner variant="warning" :dismissible="true">
  Your subscription expires in 3 days.
</DsBanner>

<DsBanner variant="danger" :dismissible="false">
  Critical security update required.
</DsBanner>`

const confirmDialogCode = `<script setup>
const open = ref(false)
function onConfirm() {
  // handle delete
  open.value = false
}
<\/script>
<template>
  <DsButton variant="destructive" @click="open = true">Delete account</DsButton>
  <DsConfirmDialog
    v-model="open"
    title="Delete account?"
    description="This action is irreversible. All your data will be permanently deleted."
    confirm-label="Yes, delete"
    cancel-label="Cancel"
    variant="danger"
    @confirm="onConfirm"
  />
</template>`

const loadingOverlayCode = `<DsLoadingOverlay :visible="isLoading" label="Loading data…" :blur="true">
  <div class="p-6 rounded-ds-xl border border-ds-border bg-ds-bg space-y-3">
    <p class="text-sm text-ds-fg">Dashboard content</p>
    <p class="text-sm text-ds-fg-muted">This content is covered while loading.</p>
  </div>
</DsLoadingOverlay>`

const navigationMenuCode = `<DsNavigationMenu
  :items="[
    { label: 'Products', children: [
      { label: 'Analytics', href: '#', description: 'Real-time data insights' },
      { label: 'Automation', href: '#', description: 'Workflow automation tools' },
    ]},
    { label: 'Docs', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Blog', href: '#' },
  ]"
/>`

const menubarCode = `<DsMenubar
  :menus="[
    {
      label: 'File',
      items: [
        { label: 'New', shortcut: '⌘N', action: () => {} },
        { label: 'Open…', shortcut: '⌘O', action: () => {} },
        { separator: true },
        { label: 'Save', shortcut: '⌘S', action: () => {} },
        { label: 'Export', action: () => {} },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z', action: () => {} },
        { label: 'Redo', shortcut: '⌘⇧Z', action: () => {} },
        { separator: true },
        { label: 'Cut', shortcut: '⌘X', action: () => {} },
        { label: 'Copy', shortcut: '⌘C', action: () => {} },
        { label: 'Paste', shortcut: '⌘V', action: () => {} },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Zoom In', shortcut: '⌘+', action: () => {} },
        { label: 'Zoom Out', shortcut: '⌘-', action: () => {} },
        { separator: true },
        { label: 'Full Screen', shortcut: '⌘⌃F', action: () => {} },
      ],
    },
  ]"
/>`

const codeBlockCode = `<DsCodeBlock
  code="const greeting = 'Hello, World!'
console.log(greeting)"
  language="typescript"
  filename="hello.ts"
  :show-line-numbers="true"
  :copyable="true"
/>`

const treeViewCode = `<script setup>
const nodes = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'button', label: 'DsButton.vue' },
          { id: 'input', label: 'DsInput.vue' },
        ],
      },
      { id: 'utils', label: 'utils', children: [
        { id: 'cn', label: 'cn.ts' },
      ]},
    ],
  },
  { id: 'package', label: 'package.json' },
]
const selected = ref('button')
<\/script>
<template>
  <DsTreeView :nodes="nodes" :selected="selected" @select="selected = $event" />
</template>`

const statusBadgeCode = `<!-- All statuses -->
<DsStatusBadge status="online" />
<DsStatusBadge status="offline" />
<DsStatusBadge status="busy" />
<DsStatusBadge status="away" />
<DsStatusBadge status="pending" />

<!-- Pulse animation for live indicator -->
<DsStatusBadge status="online" :pulse="true" label="Live" />

<!-- Dot only (no text) -->
<DsStatusBadge status="online" :show-label="false" />`

const notificationItemCode = `<div class="w-80 rounded-ds-xl border border-ds-border overflow-hidden">
  <DsNotificationItem
    title="Pull request merged"
    description="feat/ui-components has been successfully merged into main."
    time="5 min ago"
    :read="false"
    avatar-initials="GH"
    @click="() => {}"
    @dismiss="() => {}"
  />
  <DsNotificationItem
    title="New comment"
    description="Alice left a comment on your design review."
    time="1h ago"
    :read="true"
    avatar-initials="AL"
    @click="() => {}"
    @dismiss="() => {}"
  />
</div>`

const radarChartCode = `<DsRadarChart
  :data="[
    { label: 'Speed', value: 82 },
    { label: 'Reliability', value: 95 },
    { label: 'Security', value: 78 },
    { label: 'Scalability', value: 88 },
    { label: 'DX', value: 92 },
    { label: 'Performance', value: 85 },
  ]"
  color="#7f00ff"
  :size="260"
  :show-labels="true"
  :show-grid="true"
/>`

const aspectRatioCode = `<!-- 16/9 video placeholder -->
<DsAspectRatio :ratio="16/9" class="rounded-ds-xl overflow-hidden">
  <img src="https://picsum.photos/800/450" alt="Cover" class="w-full h-full object-cover" />
</DsAspectRatio>

<!-- 1/1 square -->
<DsAspectRatio :ratio="1" class="w-48 rounded-ds-xl overflow-hidden">
  <div class="w-full h-full bg-ds-primary-subtle flex items-center justify-center text-ds-primary font-bold">
    1:1
  </div>
</DsAspectRatio>`

// Chart data
const lineChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const lineChartDatasets = [
  { label: 'Revenue', data: [4200, 5800, 4900, 7200, 6800, 9100, 8400, 10200], color: '#7f00ff' },
  { label: 'Expenses', data: [3100, 3600, 4100, 3800, 4500, 5200, 4900, 5800], color: '#06b6d4' },
]
const barChartLabels = ['Q1', 'Q2', 'Q3', 'Q4']
const barChartDatasets = [
  { label: '2024', data: [42000, 58000, 51000, 73000], color: '#7f00ff' },
  { label: '2025', data: [54000, 67000, 62000, 89000], color: '#06b6d4' },
]
const donutData = [
  { label: 'Direct', value: 4200, color: '#7f00ff' },
  { label: 'Organic', value: 2800, color: '#06b6d4' },
  { label: 'Referral', value: 1900, color: '#f97316' },
  { label: 'Social', value: 1100, color: '#22c55e' },
]
const sparklineData = [12, 18, 14, 22, 19, 28, 25, 31, 27, 35]
const sparklineBarData = [8, 14, 11, 6, 9, 13, 17, 12, 19, 22]

// Reactive state for new compound components
const alertDialogOpen = ref(false)
const alertDialogDestructiveOpen = ref(false)
const togglePressed = ref(false)
const toggleGroupView = ref('list')
const toggleGroupItems = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
  { value: 'table', label: 'Table' },
]
const dataTableColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'joined', label: 'Joined', sortable: true, align: 'right' as const },
]
const dataTableRows = [
  { name: 'Alice Martin', role: 'Engineer', status: 'Active', joined: '2024-01-15' },
  { name: 'Bob Dupont', role: 'Designer', status: 'Active', joined: '2023-11-02' },
  { name: 'Claire Morel', role: 'PM', status: 'Inactive', joined: '2024-03-20' },
  { name: 'David Chen', role: 'Engineer', status: 'Active', joined: '2024-06-10' },
  { name: 'Elena Rossi', role: 'Designer', status: 'Active', joined: '2023-09-05' },
  { name: 'Frank Müller', role: 'PM', status: 'Inactive', joined: '2024-02-28' },
  { name: 'Grace Kim', role: 'Engineer', status: 'Active', joined: '2025-01-03' },
]
const datePickerDate = ref<Date | null>(null)
const carouselFiles = ref<File[]>([])
const colorPickerValue = ref('#7f00ff')
const phoneValue = ref('')

// New component reactive state
const comboboxValue = ref('')
const comboboxOptions = [
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'vue', label: 'Vue' },
  { value: 'react', label: 'React' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solidjs', label: 'SolidJS' },
]
const multiSelectValue = ref(['ts', 'vue'])
const multiSelectOptions = [
  { value: 'ts', label: 'TypeScript' },
  { value: 'vue', label: 'Vue' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'vite', label: 'Vite' },
  { value: 'vitest', label: 'Vitest' },
]
const tagInputValue = ref(['Nuxt', 'Vue 3'])
const dateRangeValue = ref<{ start: Date | null, end: Date | null }>({ start: null, end: null })
const timePickerValue = ref('09:30')
const confirmDialogOpen = ref(false)
const loadingOverlayActive = ref(false)
const treeViewSelected = ref('button')
const treeViewNodes = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'button', label: 'DsButton.vue' },
          { id: 'input', label: 'DsInput.vue' },
        ],
      },
      { id: 'utils', label: 'utils', children: [{ id: 'cn', label: 'cn.ts' }] },
    ],
  },
  { id: 'package', label: 'package.json' },
]
const radarChartData = [
  { label: 'Speed', value: 82 },
  { label: 'Reliability', value: 95 },
  { label: 'Security', value: 78 },
  { label: 'Scalability', value: 88 },
  { label: 'DX', value: 92 },
  { label: 'Performance', value: 85 },
]
const navigationMenuItems = [
  { label: 'Products', children: [
    { label: 'Analytics', href: '#', description: 'Real-time data insights' },
    { label: 'Automation', href: '#', description: 'Workflow automation tools' },
  ] },
  { label: 'Docs', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Blog', href: '#' },
]
const menubarMenus = [
  { label: 'File', items: [
    { label: 'New', shortcut: '⌘N' },
    { label: 'Open…', shortcut: '⌘O' },
    { separator: true },
    { label: 'Save', shortcut: '⌘S' },
  ] },
  { label: 'Edit', items: [
    { label: 'Undo', shortcut: '⌘Z' },
    { label: 'Redo', shortcut: '⌘⇧Z' },
    { separator: true },
    { label: 'Cut', shortcut: '⌘X' },
    { label: 'Copy', shortcut: '⌘C' },
    { label: 'Paste', shortcut: '⌘V' },
  ] },
  { label: 'View', items: [
    { label: 'Zoom In', shortcut: '⌘+' },
    { label: 'Zoom Out', shortcut: '⌘-' },
    { separator: true },
    { label: 'Full Screen', shortcut: '⌘⌃F' },
  ] },
]
const codeBlockSample = `const greeting = 'Hello, World!'
console.log(greeting)

function add(a: number, b: number): number {
  return a + b
}

export default { add }`

const aspectRatio169Code = `<DsAspectRatio :ratio="16/9" class="w-full overflow-hidden rounded-ds-lg">
  <img src="/image.jpg" alt="..." class="w-full h-full object-cover" />
</DsAspectRatio>`

const aspectRatio11Code = `<DsAspectRatio :ratio="1" class="w-40 overflow-hidden rounded-full">
  <img src="/avatar.jpg" alt="Avatar" class="w-full h-full object-cover" />
</DsAspectRatio>`

const visuallyHiddenCode = `<button type="button" aria-label="Close">
  <SomeIcon />
  <DsVisuallyHidden>Close dialog</DsVisuallyHidden>
</button>`
</script>

<template>
  <div v-if="doc" class="max-w-4xl mx-auto px-6 py-12">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-6 font-ds">
      <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
      <span>/</span>
      <NuxtLink to="/components" class="hover:text-ds-fg transition-colors">Components</NuxtLink>
      <span>/</span>
      <span class="text-ds-fg">{{ doc.displayName }}</span>
    </div>

    <!-- Header -->
    <div class="mb-10">
      <div class="flex items-start justify-between gap-4 mb-3">
        <h1 class="text-4xl font-bold text-ds-fg tracking-tight font-ds">{{ doc.displayName }}</h1>
        <span class="shrink-0 mt-2 text-xs font-medium px-2.5 py-1 rounded-full border border-ds-border text-ds-fg-muted font-ds">
          {{ doc.category }}
        </span>
      </div>
      <p class="text-lg text-ds-fg-muted leading-relaxed font-ds">{{ doc.description }}</p>
    </div>

    <!-- Playground (hidden for compound components that need custom demos) -->
    <section v-if="!isCompound" class="mb-12">
      <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Playground</h2>
      <DocsPlayground :doc="doc" />
    </section>

    <!-- Props table -->
    <section v-if="doc.propDefs.length > 0" class="mb-12">
      <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Props</h2>
      <DocsPropsTable :props="doc.propDefs" />
    </section>

    <!-- Examples -->
    <section v-if="doc.examples.length > 0 || isCompound" class="mb-12">
      <h2 class="text-xl font-semibold text-ds-fg mb-6 font-ds">Examples</h2>

      <!-- Accordion compound example -->
      <div v-if="doc.slug === 'accordion'" class="space-y-4">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="p-6 bg-ds-bg-subtle/50 flex items-start justify-center">
            <DsAccordion type="single" class="w-full max-w-lg">
              <DsAccordionItem value="item-1" title="What is DDS?">
                DDS is a minimal design system for Nuxt 4, built with TypeScript and Tailwind CSS.
              </DsAccordionItem>
              <DsAccordionItem value="item-2" title="How do I install it?">
                Run npm install design-system-antoinegourgue and add it to your nuxt.config.ts modules array.
              </DsAccordionItem>
              <DsAccordionItem value="item-3" title="Is it accessible?">
                Yes, all components follow WAI-ARIA patterns with keyboard navigation support.
              </DsAccordionItem>
            </DsAccordion>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="accordionCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- Tabs compound example -->
      <div v-else-if="doc.slug === 'tabs'" class="space-y-4">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="p-6 bg-ds-bg-subtle/50">
            <DsTabs class="w-full">
              <DsTabList>
                <DsTab value="overview">Overview</DsTab>
                <DsTab value="details">Details</DsTab>
                <DsTab value="settings">Settings</DsTab>
              </DsTabList>
              <DsTabPanels>
                <DsTabPanel value="overview">Overview content panel.</DsTabPanel>
                <DsTabPanel value="details">Details content panel.</DsTabPanel>
                <DsTabPanel value="settings">Settings content panel.</DsTabPanel>
              </DsTabPanels>
            </DsTabs>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="tabsCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- Modal example -->
      <div v-else-if="doc.slug === 'modal'" class="space-y-4">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="p-6 bg-ds-bg-subtle/50 flex items-center justify-center">
            <ModalExampleWrapper />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="modalCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- Dropdown compound example -->
      <div v-else-if="doc.slug === 'dropdown'" class="space-y-4">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="p-8 bg-ds-bg-subtle/50 flex items-center justify-center min-h-40">
            <DropdownDemoWrapper />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="dropdownCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- Toast compound example -->
      <div v-else-if="doc.slug === 'toast'" class="space-y-4">
        <p class="text-sm text-ds-fg-muted font-ds -mt-2 mb-4">
          Click each button to trigger a toast notification. Make sure
          <code class="text-xs font-mono bg-ds-bg-muted px-1.5 py-0.5 rounded text-ds-primary">DsToastProvider</code>
          is present in your root layout.
        </p>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="p-8 bg-ds-bg-subtle/50 flex items-center justify-center">
            <ToastDemoWrapper />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="toastCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- Card examples -->
      <div v-else-if="doc.slug === 'card'" class="space-y-6">

        <!-- Article card -->
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Article card</span>
          </div>
          <div class="p-10 bg-ds-bg flex items-center justify-center">
            <DsCard class="w-full max-w-sm" shadow="md">
              <DsCardHeader :divided="true">
                <div class="flex items-center justify-between">
                  <DsBadge variant="primary" size="sm">Design</DsBadge>
                  <span class="text-xs text-ds-fg-subtle">5 min read</span>
                </div>
                <h3 class="font-semibold text-ds-fg mt-2">Design tokens in practice</h3>
              </DsCardHeader>
              <DsCardContent>
                <p class="text-sm text-ds-fg-muted leading-relaxed">
                  Learn how to build a scalable design system using CSS custom
                  properties and Tailwind CSS presets.
                </p>
              </DsCardContent>
              <DsCardFooter align="between">
                <span class="text-xs text-ds-fg-subtle">Mar 5, 2026</span>
                <DsButton variant="ghost" size="sm">Read more</DsButton>
              </DsCardFooter>
            </DsCard>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="cardArticleCode" language="vue" />
          </div>
        </div>

        <!-- Profile card -->
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Profile card</span>
          </div>
          <div class="p-10 bg-ds-bg flex items-center justify-center">
            <DsCard class="w-full max-w-sm" shadow="md">
              <DsCardHeader :divided="true">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-full bg-ds-primary-subtle flex items-center justify-center shrink-0">
                    <span class="text-sm font-bold text-ds-primary">AG</span>
                  </div>
                  <div>
                    <p class="font-semibold text-ds-fg text-sm">Antoine Gourgue</p>
                    <p class="text-xs text-ds-fg-muted">Staff Frontend Engineer</p>
                  </div>
                </div>
              </DsCardHeader>
              <DsCardContent>
                <p class="text-sm text-ds-fg-muted leading-relaxed">
                  Building design systems and developer tools.
                  Focused on Nuxt, Vue 3 and TypeScript.
                </p>
              </DsCardContent>
              <DsCardFooter>
                <DsButton variant="secondary" size="sm" class="flex-1">Message</DsButton>
                <DsButton size="sm" class="flex-1">Follow</DsButton>
              </DsCardFooter>
            </DsCard>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="cardProfileCode" language="vue" />
          </div>
        </div>

        <!-- Simple padded card -->
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Simple card with padding prop</span>
          </div>
          <div class="p-10 bg-ds-bg flex items-center justify-center">
            <DsCard padding="md" class="w-full max-w-sm">
              <p class="text-sm font-semibold text-ds-fg mb-1">Quick note</p>
              <p class="text-sm text-ds-fg-muted">
                Use <code class="font-mono text-ds-primary text-xs">padding</code> for simple cards that don't need structured header/footer sections.
              </p>
            </DsCard>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="cardSimpleCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- Pagination examples -->
      <div v-else-if="doc.slug === 'pagination'" class="space-y-6">
        <!-- Interactive demo -->
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Interactive</span>
          </div>
          <div class="p-10 bg-ds-bg flex flex-col items-center gap-4">
            <DsPagination v-model="paginationPage" :total="100" :per-page="10" />
            <p class="text-xs text-ds-fg-muted font-ds">
              Page <span class="font-semibold text-ds-fg">{{ paginationPage }}</span> of 10
            </p>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="paginationCode" language="vue" />
          </div>
        </div>
        <!-- More siblings -->
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Many pages (siblings=2)</span>
          </div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsPagination :model-value="6" :total="200" :per-page="10" :siblings="2" />
          </div>
        </div>
        <!-- Disabled -->
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Disabled</span>
          </div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsPagination :model-value="3" :total="100" :per-page="10" disabled />
          </div>
        </div>
      </div>

      <!-- Select examples -->
      <div v-else-if="doc.slug === 'select'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Interactive</span>
          </div>
          <div class="p-10 bg-ds-bg flex flex-wrap items-start justify-center gap-6">
            <DsSelect
              v-model="selectValue"
              :options="[
                { label: 'Design', value: 'design' },
                { label: 'Engineering', value: 'eng' },
                { label: 'Product', value: 'product' },
              ]"
              placeholder="Select a team"
              class="w-56"
            />
            <DsSelect
              :model-value="'eng'"
              :options="[{ label: 'Engineering', value: 'eng' }, { label: 'Design', value: 'design' }]"
              size="sm"
              class="w-48"
            />
            <DsSelect
              :model-value="null"
              :options="[{ label: 'Disabled option', value: 'x' }]"
              placeholder="Disabled select"
              :disabled="true"
              class="w-48"
            />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="selectCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- RadioGroup examples -->
      <div v-else-if="doc.slug === 'radio-group'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Vertical (default)</span>
          </div>
          <div class="p-8 bg-ds-bg flex justify-center">
            <DsRadioGroup v-model="radioValue" :options="radioOptions" />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="radioGroupCode" language="vue" />
          </div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Card mode</span>
          </div>
          <div class="p-8 bg-ds-bg">
            <DsRadioGroup v-model="radioValue" :options="radioOptions" :card="true" />
          </div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Horizontal</span>
          </div>
          <div class="p-8 bg-ds-bg flex justify-center">
            <DsRadioGroup
              v-model="radioValue"
              :options="[{ label: 'Monthly', value: 'm' }, { label: 'Yearly', value: 'y' }]"
              orientation="horizontal"
            />
          </div>
        </div>
      </div>

      <!-- Slider examples -->
      <div v-else-if="doc.slug === 'slider'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Interactive</span>
          </div>
          <div class="p-10 bg-ds-bg flex items-center justify-center">
            <DsSlider v-model="sliderValue" label="Volume" :min="0" :max="100" class="w-80" />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="sliderCode" language="vue" />
          </div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Disabled</span>
          </div>
          <div class="p-10 bg-ds-bg flex items-center justify-center">
            <DsSlider :model-value="60" label="Brightness" disabled class="w-80" />
          </div>
        </div>
      </div>

      <!-- NumberInput examples -->
      <div v-else-if="doc.slug === 'number-input'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Sizes</span>
          </div>
          <div class="p-10 bg-ds-bg flex flex-wrap items-center justify-center gap-4">
            <DsNumberInput :model-value="1" size="sm" :min="0" :max="99" />
            <DsNumberInput v-model="numberValue" :min="0" :max="99" />
            <DsNumberInput :model-value="5" size="lg" :min="0" :max="99" />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="numberInputCode" language="vue" />
          </div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Disabled</span>
          </div>
          <div class="p-10 bg-ds-bg flex justify-center">
            <DsNumberInput :model-value="3" disabled />
          </div>
        </div>
      </div>

      <!-- OTP Input examples -->
      <div v-else-if="doc.slug === 'otp-input'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">6 digits</span>
          </div>
          <div class="p-10 bg-ds-bg flex flex-col items-center gap-3">
            <DsOtpInput v-model="otpValue" :length="6" />
            <p v-if="otpValue" class="text-xs text-ds-fg-muted font-ds font-mono">Value: {{ otpValue }}</p>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="otpCode" language="vue" />
          </div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Error state</span>
          </div>
          <div class="p-10 bg-ds-bg flex justify-center">
            <DsOtpInput :model-value="'123'" :length="6" :error="true" />
          </div>
        </div>
      </div>

      <!-- EmptyState examples -->
      <div v-else-if="doc.slug === 'empty-state'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Default</span>
          </div>
          <div class="bg-ds-bg">
            <DsEmptyState title="No results found" description="Try adjusting your filters or search term.">
              <DsButton>Clear filters</DsButton>
            </DsEmptyState>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="emptyStateCode" language="vue" />
          </div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">No CTA</span>
          </div>
          <div class="bg-ds-bg">
            <DsEmptyState title="Nothing here yet" description="Start by creating your first component." />
          </div>
        </div>
      </div>

      <!-- Timeline examples -->
      <div v-else-if="doc.slug === 'timeline'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">With statuses</span>
          </div>
          <div class="p-8 bg-ds-bg flex justify-center">
            <DsTimeline :items="timelineItems" class="max-w-sm w-full" />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="timelineCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- Stepper examples -->
      <div v-else-if="doc.slug === 'stepper'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Horizontal (interactive)</span>
          </div>
          <div class="p-8 bg-ds-bg">
            <DsStepper v-model="stepperStep" :steps="stepperSteps" />
          </div>
          <div class="border-t border-ds-border flex items-center gap-3 px-6 py-4 bg-ds-bg">
            <DsButton size="sm" variant="secondary" :disabled="stepperStep === 0" @click="stepperStep--">Previous</DsButton>
            <DsButton size="sm" :disabled="stepperStep === stepperSteps.length - 1" @click="stepperStep++">Next</DsButton>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="stepperCode" language="vue" />
          </div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Vertical</span>
          </div>
          <div class="p-8 bg-ds-bg flex justify-center">
            <DsStepper :model-value="1" :steps="stepperSteps" orientation="vertical" class="max-w-xs" />
          </div>
        </div>
      </div>

      <!-- Sheet examples -->
      <div v-else-if="doc.slug === 'sheet'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Side options</span>
          </div>
          <div class="p-10 bg-ds-bg flex flex-wrap items-center justify-center gap-3">
            <DsButton variant="secondary" @click="sheetSide = 'right'; sheetOpen = true">Right sheet</DsButton>
            <DsButton variant="secondary" @click="sheetSide = 'left'; sheetOpen = true">Left sheet</DsButton>
            <DsButton variant="secondary" @click="sheetSide = 'bottom'; sheetOpen = true">Bottom sheet</DsButton>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="sheetCode" language="vue" />
          </div>
        </div>
        <DsSheet v-model="sheetOpen" :side="sheetSide" title="Sheet panel" description="This is a side panel.">
          <div class="space-y-4">
            <p class="text-sm text-ds-fg-muted">Content goes here. This panel slides in from the {{ sheetSide }}.</p>
            <DsInput placeholder="Type something…" />
          </div>
          <template #footer>
            <DsButton variant="ghost" class="flex-1" @click="sheetOpen = false">Cancel</DsButton>
            <DsButton class="flex-1" @click="sheetOpen = false">Save</DsButton>
          </template>
        </DsSheet>
      </div>

      <!-- Drawer examples -->
      <div v-else-if="doc.slug === 'drawer'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Side options</span>
          </div>
          <div class="p-10 bg-ds-bg flex flex-wrap items-center justify-center gap-3">
            <DsButton variant="secondary" @click="drawerSide = 'right'; drawerOpen = true">Right</DsButton>
            <DsButton variant="secondary" @click="drawerSide = 'left'; drawerOpen = true">Left</DsButton>
            <DsButton variant="secondary" @click="drawerSide = 'bottom'; drawerOpen = true">Bottom</DsButton>
            <DsButton variant="secondary" @click="drawerSide = 'top'; drawerOpen = true">Top</DsButton>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="drawerCode" language="vue" />
          </div>
        </div>

        <DsDrawer v-model="drawerOpen" :side="drawerSide" size="md">
          <DsDrawerHeader title="User settings" description="Manage your account preferences." />
          <DsDrawerContent>
            <div class="space-y-4">
              <p class="text-sm text-ds-fg-muted">
                This drawer slides in from the <strong class="text-ds-fg">{{ drawerSide }}</strong> edge.
                It uses a compound pattern: <code class="font-mono text-ds-primary text-xs">DsDrawerHeader</code>,
                <code class="font-mono text-ds-primary text-xs">DsDrawerContent</code> and
                <code class="font-mono text-ds-primary text-xs">DsDrawerFooter</code>.
              </p>
              <DsInput placeholder="Full name" />
              <DsInput placeholder="Email address" />
              <DsSwitch label="Email notifications" />
            </div>
          </DsDrawerContent>
          <DsDrawerFooter>
            <DsButton variant="outline" class="flex-1" @click="drawerOpen = false">Cancel</DsButton>
            <DsButton class="flex-1" @click="drawerOpen = false">Save changes</DsButton>
          </DsDrawerFooter>
        </DsDrawer>
      </div>

      <!-- Collapsible examples -->
      <div v-else-if="doc.slug === 'collapsible'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Default trigger</span>
          </div>
          <div class="p-8 bg-ds-bg">
            <DsCollapsible v-model="collapsibleOpen" title="Advanced options" class="max-w-sm">
              <div class="pt-3 space-y-3">
                <DsInput placeholder="Custom endpoint" />
                <DsCheckbox :model-value="false" label="Enable debug mode" />
              </div>
            </DsCollapsible>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="collapsibleCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- CommandPalette examples -->
      <div v-else-if="doc.slug === 'command-palette'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Demo</span>
          </div>
          <div class="p-10 bg-ds-bg flex items-center justify-center">
            <DsButton @click="commandOpen = true">
              Open palette
              <DsKbd size="sm" class="ml-2">⌘K</DsKbd>
            </DsButton>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="commandPaletteCode" language="vue" />
          </div>
        </div>
        <DsCommandPalette v-model="commandOpen" :items="commandItems" />
      </div>

      <!-- ContextMenu examples -->
      <div v-else-if="doc.slug === 'context-menu'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Right-click area</span>
          </div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsContextMenu :items="contextItems">
              <div class="w-full max-w-sm rounded-ds-lg border-2 border-dashed border-ds-border p-10 text-center text-sm text-ds-fg-muted select-none cursor-context-menu">
                Right-click anywhere in this area
              </div>
            </DsContextMenu>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="contextMenuCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- AlertDialog examples -->
      <div v-else-if="doc.slug === 'alert-dialog'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Default</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center gap-4">
            <DsButton variant="outline" @click="alertDialogOpen = true">Open dialog</DsButton>
            <DsAlertDialog v-model="alertDialogOpen" title="Are you sure?" description="This will save your changes permanently." confirm-label="Save" cancel-label="Cancel" @confirm="alertDialogOpen = false" @cancel="alertDialogOpen = false" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="alertDialogCode" language="vue" /></div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Destructive</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsButton variant="danger" @click="alertDialogDestructiveOpen = true">Delete account</DsButton>
            <DsAlertDialog v-model="alertDialogDestructiveOpen" title="Delete account?" description="This action is irreversible. All your data will be permanently deleted." confirm-label="Delete" cancel-label="Cancel" variant="destructive" @confirm="alertDialogDestructiveOpen = false" @cancel="alertDialogDestructiveOpen = false" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="alertDialogCode" language="vue" /></div>
        </div>
      </div>

      <!-- Popover examples -->
      <div v-else-if="doc.slug === 'popover'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Basic</span></div>
          <div class="p-12 bg-ds-bg flex items-start justify-center">
            <DsPopover side="bottom" align="start">
              <template #trigger><DsButton variant="outline">Open popover</DsButton></template>
              <div class="space-y-2">
                <p class="text-sm font-medium text-ds-fg">Popover title</p>
                <p class="text-xs text-ds-fg-muted">Any content can go here — forms, links, lists.</p>
                <DsButton size="sm" class="w-full">Action</DsButton>
              </div>
            </DsPopover>
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="popoverCode" language="vue" /></div>
        </div>
      </div>

      <!-- DatePicker examples -->
      <div v-else-if="doc.slug === 'date-picker'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Default</span></div>
          <div class="p-8 bg-ds-bg flex items-start justify-center">
            <DsDatePicker v-model="datePickerDate" placeholder="Pick a date" format="DD/MM/YYYY" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="datePickerCode" language="vue" /></div>
        </div>
      </div>

      <!-- Toggle examples -->
      <div v-else-if="doc.slug === 'toggle'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Variants</span></div>
          <div class="p-8 bg-ds-bg flex flex-wrap items-center justify-center gap-4">
            <DsToggle v-model="togglePressed" variant="outline">Bold</DsToggle>
            <DsToggle v-model="togglePressed" variant="ghost">Italic</DsToggle>
            <DsToggle :model-value="true" variant="outline">Active</DsToggle>
            <DsToggle :model-value="false" variant="outline" disabled>Disabled</DsToggle>
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="toggleCode" language="vue" /></div>
        </div>
      </div>

      <!-- ToggleGroup examples -->
      <div v-else-if="doc.slug === 'toggle-group'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Single selection</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsToggleGroup v-model="toggleGroupView" :items="toggleGroupItems" type="single" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="toggleGroupCode" language="vue" /></div>
        </div>
      </div>

      <!-- DataTable examples -->
      <div v-else-if="doc.slug === 'data-table'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">With search and sort</span></div>
          <div class="p-6 bg-ds-bg">
            <DsDataTable :columns="dataTableColumns" :rows="dataTableRows" :searchable="true" :per-page="5" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="dataTableCode" language="vue" /></div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Striped + compact</span></div>
          <div class="p-6 bg-ds-bg">
            <DsDataTable :columns="dataTableColumns" :rows="dataTableRows" :searchable="false" :striped="true" :compact="true" :per-page="5" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="dataTableCode" language="vue" /></div>
        </div>
      </div>

      <!-- HoverCard examples -->
      <div v-else-if="doc.slug === 'hover-card'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">User profile</span></div>
          <div class="p-12 bg-ds-bg flex items-start justify-center">
            <DsHoverCard side="bottom" align="start">
              <template #trigger>
                <span class="text-ds-primary underline underline-offset-2 cursor-pointer text-sm">@antoine</span>
              </template>
              <div class="flex items-center gap-3 mb-3">
                <div class="size-10 rounded-full bg-ds-primary-subtle flex items-center justify-center">
                  <span class="text-sm font-bold text-ds-primary">AG</span>
                </div>
                <div>
                  <p class="text-sm font-semibold text-ds-fg">Antoine Gourgue</p>
                  <p class="text-xs text-ds-fg-muted">Staff Frontend Engineer</p>
                </div>
              </div>
              <p class="text-xs text-ds-fg-muted">Building design systems with Nuxt 4 and Tailwind CSS.</p>
            </DsHoverCard>
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="hoverCardCode" language="vue" /></div>
        </div>
      </div>

      <!-- Carousel examples -->
      <div v-else-if="doc.slug === 'carousel'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Default</span></div>
          <div class="p-6 bg-ds-bg">
            <DsCarousel :count="3" :arrows="true" :dots="true" :loop="true">
              <DsCarouselSlide>
                <div class="flex items-center justify-center h-48 bg-ds-primary-subtle rounded-ds-lg text-ds-primary font-semibold">Slide 1</div>
              </DsCarouselSlide>
              <DsCarouselSlide>
                <div class="flex items-center justify-center h-48 bg-ds-success-subtle rounded-ds-lg text-ds-success font-semibold">Slide 2</div>
              </DsCarouselSlide>
              <DsCarouselSlide>
                <div class="flex items-center justify-center h-48 bg-ds-warning-subtle rounded-ds-lg text-ds-warning font-semibold">Slide 3</div>
              </DsCarouselSlide>
            </DsCarousel>
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="carouselCode" language="vue" /></div>
        </div>
      </div>

      <!-- ScrollArea examples -->
      <div v-else-if="doc.slug === 'scroll-area'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Vertical scroll</span></div>
          <div class="p-6 bg-ds-bg">
            <DsScrollArea max-height="200px" class="w-full border border-ds-border rounded-ds-lg p-3">
              <p v-for="i in 20" :key="i" class="text-sm text-ds-fg py-1.5 border-b border-ds-border last:border-0">Item {{ i }} — scroll to see more</p>
            </DsScrollArea>
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="scrollAreaCode" language="vue" /></div>
        </div>
      </div>

      <!-- FileUpload examples -->
      <div v-else-if="doc.slug === 'file-upload'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Default</span></div>
          <div class="p-6 bg-ds-bg">
            <DsFileUpload v-model="carouselFiles" accept=".pdf,.png,.jpg" :multiple="true" :max-size="5 * 1024 * 1024" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="fileUploadCode" language="vue" /></div>
        </div>
      </div>

      <!-- ColorPicker examples -->
      <div v-else-if="doc.slug === 'color-picker'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Swatches + hex input</span></div>
          <div class="p-8 bg-ds-bg flex items-start justify-center">
            <DsColorPicker v-model="colorPickerValue" :show-input="true" class="w-64" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="colorPickerCode" language="vue" /></div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Swatches only</span></div>
          <div class="p-8 bg-ds-bg flex items-start justify-center">
            <DsColorPicker v-model="colorPickerValue" :show-input="false" class="w-64" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="colorPickerCode" language="vue" /></div>
        </div>
      </div>

      <!-- PhoneInput examples -->
      <div v-else-if="doc.slug === 'phone-input'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Default</span></div>
          <div class="p-8 bg-ds-bg flex items-start justify-center">
            <DsPhoneInput v-model="phoneValue" placeholder="6 00 00 00 00" class="w-72" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="phoneInputCode" language="vue" /></div>
        </div>
      </div>

      <!-- LineChart examples -->
      <div v-else-if="doc.slug === 'line-chart'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Multi-series line chart</span></div>
          <div class="p-6 bg-ds-bg">
            <DsLineChart :labels="lineChartLabels" :datasets="lineChartDatasets" :show-area="false" :height="240" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="lineChartCode" language="vue" /></div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Area chart</span></div>
          <div class="p-6 bg-ds-bg">
            <DsLineChart :labels="lineChartLabels" :datasets="lineChartDatasets" :show-area="true" :height="240" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="lineChartCode" language="vue" /></div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Single series</span></div>
          <div class="p-6 bg-ds-bg">
            <DsLineChart
              :labels="lineChartLabels"
              :datasets="[{ label: 'Revenue', data: [4200, 5800, 4900, 7200, 6800, 9100, 8400, 10200], color: '#7f00ff' }]"
              :show-area="true"
              :show-legend="false"
              :height="200"
            />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="lineChartCode" language="vue" /></div>
        </div>
      </div>

      <!-- BarChart examples -->
      <div v-else-if="doc.slug === 'bar-chart'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Grouped bars</span></div>
          <div class="p-6 bg-ds-bg">
            <DsBarChart :labels="barChartLabels" :datasets="barChartDatasets" :show-grid="true" :height="240" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="barChartCode" language="vue" /></div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">With value labels</span></div>
          <div class="p-6 bg-ds-bg">
            <DsBarChart
              :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
              :datasets="[{ label: 'Conversions', data: [142, 198, 165, 231, 214, 278], color: '#7f00ff' }]"
              :show-grid="true"
              :show-values="true"
              :show-legend="false"
              :height="220"
            />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="barChartCode" language="vue" /></div>
        </div>
      </div>

      <!-- DonutChart examples -->
      <div v-else-if="doc.slug === 'donut-chart'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Donut chart</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsDonutChart :data="donutData" :show-legend="true" :show-total="true" total-label="Sessions" :size="200" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="donutChartCode" language="vue" /></div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Pie chart (thickness: 0)</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsDonutChart :data="donutData" :show-legend="true" :show-total="false" :thickness="0" :size="200" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="donutChartCode" language="vue" /></div>
        </div>
      </div>

      <!-- Sparkline examples -->
      <div v-else-if="doc.slug === 'sparkline'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">In a KPI card</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
              <div v-for="item in [
                { label: 'Revenue', value: '$10,200', change: '+12.4%', up: true, data: [4200, 5800, 4900, 7200, 6800, 9100, 8400, 10200] },
                { label: 'Users', value: '4,821', change: '+8.1%', up: true, data: [820, 950, 880, 1100, 990, 1240, 1180, 1380] },
                { label: 'Churn', value: '2.3%', change: '-0.4%', up: false, data: [3.1, 2.9, 3.2, 2.8, 2.6, 2.5, 2.4, 2.3] },
              ]" :key="item.label"
                class="rounded-ds-xl border border-ds-border bg-ds-bg p-4 space-y-3"
              >
                <div class="flex items-start justify-between">
                  <p class="text-xs text-ds-fg-muted">{{ item.label }}</p>
                  <span class="text-xs font-medium" :class="item.up ? 'text-ds-success' : 'text-ds-danger'">{{ item.change }}</span>
                </div>
                <div class="flex items-end justify-between">
                  <p class="text-xl font-bold text-ds-fg">{{ item.value }}</p>
                  <DsSparkline :data="item.data" type="line" :trend-color="true" :show-area="true" :width="80" :height="32" />
                </div>
              </div>
            </div>
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="sparklineCode" language="vue" /></div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Bar sparkline</span></div>
          <div class="p-8 bg-ds-bg flex flex-wrap items-center justify-center gap-8">
            <div class="flex items-center gap-3">
              <span class="text-xs text-ds-fg-muted">Weekly</span>
              <DsSparkline :data="sparklineBarData" type="bar" color="#7f00ff" :width="80" :height="32" :show-value="true" />
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-ds-fg-muted">Trend</span>
              <DsSparkline :data="sparklineBarData" type="bar" :trend-color="true" :width="80" :height="32" />
            </div>
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="sparklineCode" language="vue" /></div>
        </div>
      </div>

      <!-- Table examples -->
      <div v-else-if="doc.slug === 'table'" class="space-y-6">
        <!-- Default -->
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Default</span>
          </div>
          <div class="p-6 bg-ds-bg">
            <DsTable :columns="tableColumns" :rows="tableRows" />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="tableCode" language="vue" />
          </div>
        </div>
        <!-- Striped + dense -->
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Striped + Dense</span>
          </div>
          <div class="p-6 bg-ds-bg">
            <DsTable :columns="tableColumns" :rows="tableRows" striped dense />
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="tableStripedCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- Calendar examples -->
      <div v-else-if="doc.slug === 'calendar'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">Interactive</span>
          </div>
          <div class="p-10 bg-ds-bg flex flex-col items-center gap-4">
            <DsCalendar v-model="calendarSelected" />
            <p class="text-xs text-ds-fg-muted font-ds">
              Selected:
              <span class="font-medium text-ds-fg">
                {{ calendarSelected ? calendarSelected.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'None' }}
              </span>
            </p>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="calendarCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- StatCard examples -->
      <div v-else-if="doc.slug === 'stat-card'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">KPI Grid</span>
          </div>
          <div class="p-6 bg-ds-bg">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <DsStatCard label="Revenue" value="$48,200" trend="+8.2%" :trend-up="true" description="vs last month" />
              <DsStatCard label="Active users" value="1,280" trend="+24%" :trend-up="true" />
              <DsStatCard label="Churn rate" value="2.4%" trend="-0.3%" :trend-up="false" />
              <DsStatCard label="Open tickets" value="34" />
            </div>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="statCardCode" language="vue" />
          </div>
        </div>
        <!-- Individual examples from registry -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="example in doc.examples"
            :key="example.label"
            class="rounded-ds-xl border border-ds-border overflow-hidden"
          >
            <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
              <span class="text-xs font-medium text-ds-fg-muted font-ds">{{ example.label }}</span>
            </div>
            <div class="p-6 bg-ds-bg flex items-center justify-center">
              <component
                :is="resolveComponent(doc.componentName)"
                v-bind="example.props"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Combobox examples -->
      <div v-else-if="doc.slug === 'combobox'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Searchable select</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsCombobox v-model="comboboxValue" :options="comboboxOptions" placeholder="Select framework…" class="w-64" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="comboboxCode" language="vue" /></div>
        </div>
      </div>

      <!-- MultiSelect examples -->
      <div v-else-if="doc.slug === 'multi-select'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Multiple selection</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsMultiSelect v-model="multiSelectValue" :options="multiSelectOptions" placeholder="Pick technologies…" class="w-72" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="multiSelectCode" language="vue" /></div>
        </div>
      </div>

      <!-- TagInput examples -->
      <div v-else-if="doc.slug === 'tag-input'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Type and press Enter to add tags</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsTagInput v-model="tagInputValue" placeholder="Add a tag…" class="w-80" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="tagInputCode" language="vue" /></div>
        </div>
      </div>

      <!-- AvatarGroup examples -->
      <div v-else-if="doc.slug === 'avatar-group'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Stacked avatars</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsAvatarGroup
              :items="[
                { initials: 'AG', alt: 'Antoine Gourgue' },
                { initials: 'BM', alt: 'Bob Martin' },
                { initials: 'CL', alt: 'Claire Leroy' },
                { initials: 'DK', alt: 'David Kim' },
                { initials: 'EV', alt: 'Elena Vasquez' },
              ]"
              :max="4"
              size="md"
            />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="avatarGroupCode" language="vue" /></div>
        </div>
      </div>

      <!-- DateRangePicker examples -->
      <div v-else-if="doc.slug === 'date-range-picker'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Select a date range</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsDateRangePicker v-model="dateRangeValue" class="w-80" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="dateRangeCode" language="vue" /></div>
        </div>
      </div>

      <!-- TimePicker examples -->
      <div v-else-if="doc.slug === 'time-picker'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Time selection</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsTimePicker v-model="timePickerValue" class="w-48" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="timePickerCode" language="vue" /></div>
        </div>
      </div>

      <!-- Banner examples -->
      <div v-else-if="doc.slug === 'banner'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Variants</span></div>
          <div class="p-6 bg-ds-bg space-y-3">
            <DsBanner variant="info" :dismissible="true">System maintenance scheduled for Sunday, 2 AM UTC.</DsBanner>
            <DsBanner variant="success" :dismissible="true">Your account has been successfully verified.</DsBanner>
            <DsBanner variant="warning" :dismissible="true">Your subscription expires in 7 days. Renew now.</DsBanner>
            <DsBanner variant="danger" :dismissible="true">Critical error detected. Please contact support.</DsBanner>
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="bannerCode" language="vue" /></div>
        </div>
      </div>

      <!-- ConfirmDialog examples -->
      <div v-else-if="doc.slug === 'confirm-dialog'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Confirmation dialog</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsButton variant="destructive" @click="confirmDialogOpen = true">Delete account</DsButton>
            <DsConfirmDialog
              v-model="confirmDialogOpen"
              title="Delete account"
              description="This will permanently delete your account and all its data. This action cannot be undone."
              confirm-label="Delete"
              confirm-variant="destructive"
              @confirm="confirmDialogOpen = false"
              @cancel="confirmDialogOpen = false"
            />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="confirmDialogCode" language="vue" /></div>
        </div>
      </div>

      <!-- LoadingOverlay examples -->
      <div v-else-if="doc.slug === 'loading-overlay'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Loading overlay</span></div>
          <div class="p-8 bg-ds-bg flex flex-col items-center gap-4">
            <DsButton @click="loadingOverlayActive = !loadingOverlayActive">
              {{ loadingOverlayActive ? 'Hide overlay' : 'Show overlay' }}
            </DsButton>
            <DsLoadingOverlay :visible="loadingOverlayActive" label="Loading data…" :blur="true">
              <div class="w-80 h-40 rounded-ds-xl border border-ds-border bg-ds-bg p-4 flex items-center justify-center">
                <p class="text-sm text-ds-fg-muted">Content area</p>
              </div>
            </DsLoadingOverlay>
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="loadingOverlayCode" language="vue" /></div>
        </div>
      </div>

      <!-- StatusBadge examples -->
      <div v-else-if="doc.slug === 'status-badge'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">All statuses</span></div>
          <div class="p-8 bg-ds-bg flex flex-wrap items-center gap-4 justify-center">
            <DsStatusBadge status="online" />
            <DsStatusBadge status="offline" />
            <DsStatusBadge status="away" />
            <DsStatusBadge status="busy" />
            <DsStatusBadge status="pending" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="statusBadgeCode" language="vue" /></div>
        </div>
      </div>

      <!-- NavigationMenu examples -->
      <div v-else-if="doc.slug === 'navigation-menu'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Horizontal navigation</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsNavigationMenu :items="navigationMenuItems" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="navigationMenuCode" language="vue" /></div>
        </div>
      </div>

      <!-- Menubar examples -->
      <div v-else-if="doc.slug === 'menubar'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">App menubar</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-start">
            <DsMenubar :menus="menubarMenus" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="menubarCode" language="vue" /></div>
        </div>
      </div>

      <!-- TreeView examples -->
      <div v-else-if="doc.slug === 'tree-view'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">File tree</span></div>
          <div class="p-8 bg-ds-bg flex items-start justify-center">
            <DsTreeView v-model="treeViewSelected" :nodes="treeViewNodes" class="w-72" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="treeViewCode" language="vue" /></div>
        </div>
      </div>

      <!-- NotificationItem examples -->
      <div v-else-if="doc.slug === 'notification-item'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Notification list</span></div>
          <div class="p-6 bg-ds-bg flex flex-col items-center gap-0">
            <DsNotificationItem
              title="New comment on your post"
              description="Alice Martin left a comment: 'This is a great component!'"
              time="2 minutes ago"
              :unread="true"
            />
            <DsNotificationItem
              title="Deployment successful"
              description="Production build #142 deployed without errors."
              time="1 hour ago"
              :unread="true"
            />
            <DsNotificationItem
              title="Subscription renewed"
              description="Your Pro plan has been renewed for another year."
              time="Yesterday"
              :unread="false"
            />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="notificationItemCode" language="vue" /></div>
        </div>
      </div>

      <!-- CodeBlock examples -->
      <div v-else-if="doc.slug === 'code-block'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">TypeScript snippet</span></div>
          <div class="p-0 bg-ds-bg">
            <DsCodeBlock :code="codeBlockSample" language="typescript" filename="utils/add.ts" :show-copy="true" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="codeBlockCode" language="vue" /></div>
        </div>
      </div>

      <!-- AspectRatio examples -->
      <div v-else-if="doc.slug === 'aspect-ratio'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">16:9 video container</span></div>
          <div class="p-6 bg-ds-bg">
            <DsAspectRatio :ratio="16/9" class="w-full max-w-lg mx-auto overflow-hidden rounded-ds-lg bg-ds-primary-subtle">
              <div class="flex items-center justify-center w-full h-full">
                <span class="text-ds-primary font-medium text-sm">16 / 9</span>
              </div>
            </DsAspectRatio>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="aspectRatio169Code" language="vue" />
          </div>
        </div>
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Square (1:1)</span></div>
          <div class="p-6 bg-ds-bg">
            <DsAspectRatio :ratio="1" class="w-40 mx-auto overflow-hidden rounded-ds-full bg-ds-warning-subtle">
              <div class="flex items-center justify-center w-full h-full">
                <span class="text-ds-warning font-medium text-sm">1 / 1</span>
              </div>
            </DsAspectRatio>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="aspectRatio11Code" language="vue" />
          </div>
        </div>
      </div>

      <!-- VisuallyHidden examples -->
      <div v-else-if="doc.slug === 'visually-hidden'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Icon button with screen reader label</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <button type="button" class="p-2 rounded-ds-md hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-ds-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <DsVisuallyHidden>Close dialog</DsVisuallyHidden>
            </button>
          </div>
          <div class="border-t border-ds-border">
            <DocsCodeBlock :code="visuallyHiddenCode" language="vue" />
          </div>
        </div>
      </div>

      <!-- RadarChart examples -->
      <div v-else-if="doc.slug === 'radar-chart'" class="space-y-6">
        <div class="rounded-ds-xl border border-ds-border overflow-hidden">
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg"><span class="text-xs font-medium text-ds-fg-muted font-ds">Performance radar</span></div>
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <DsRadarChart :data="radarChartData" title="Platform Scores" :size="320" />
          </div>
          <div class="border-t border-ds-border"><DocsCodeBlock :code="radarChartCode" language="vue" /></div>
        </div>
      </div>

      <!-- Generic examples grid -->
      <div v-else class="space-y-4">
        <div
          v-for="example in doc.examples"
          :key="example.label"
          class="rounded-ds-xl border border-ds-border overflow-hidden"
        >
          <!-- Example header -->
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg flex items-center justify-between">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">{{ example.label }}</span>
            <span v-if="example.description" class="text-xs text-ds-fg-subtle">{{ example.description }}</span>
          </div>

          <!-- Preview -->
          <div class="p-6 bg-ds-bg-subtle/50 flex items-center justify-center min-h-16">
            <component
              :is="resolveComponent(doc.componentName)"
              v-bind="example.props"
            >
              {{ example.slot }}
            </component>
          </div>

          <!-- Code -->
          <div class="border-t border-ds-border">
            <DocsCodeBlock
              :code="generateExampleCode(doc.componentName, example.props, example.slot)"
              language="vue"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Skeleton section -->
    <section v-if="doc.skeleton && skeletonComponent" class="mb-12">
      <h2 class="text-xl font-semibold text-ds-fg mb-2 font-ds">Skeleton</h2>
      <p class="text-sm text-ds-fg-muted mb-6 font-ds">
        Use
        <code class="text-xs font-mono bg-ds-bg-muted px-1.5 py-0.5 rounded text-ds-primary">{{ doc.skeleton.componentName }}</code>
        as a loading placeholder while content is being fetched.
      </p>

      <!-- One card per skeleton example -->
      <div class="space-y-4">
        <div
          v-for="example in doc.skeleton.examples"
          :key="example.label"
          class="rounded-ds-xl border border-ds-border overflow-hidden"
        >
          <!-- Label bar -->
          <div class="px-4 py-2.5 border-b border-ds-border bg-ds-bg">
            <span class="text-xs font-medium text-ds-fg-muted font-ds">{{ example.label }}</span>
          </div>

          <!-- Preview -->
          <div class="p-8 bg-ds-bg flex items-center justify-center">
            <div :class="cn('flex items-center justify-center', {
              'w-full max-w-sm': !['DsAvatarSkeleton', 'DsBadgeSkeleton', 'DsButtonSkeleton', 'DsCheckboxSkeleton', 'DsSwitchSkeleton', 'DsRatingSkeleton', 'DsTagSkeleton', 'DsBreadcrumbSkeleton', 'DsOtpInputSkeleton', 'DsNumberInputSkeleton', 'DsStepperSkeleton', 'DsPaginationSkeleton'].includes(doc.skeleton!.componentName),
              'w-auto': ['DsAvatarSkeleton', 'DsBadgeSkeleton', 'DsButtonSkeleton', 'DsCheckboxSkeleton', 'DsSwitchSkeleton', 'DsRatingSkeleton', 'DsTagSkeleton', 'DsBreadcrumbSkeleton', 'DsOtpInputSkeleton', 'DsNumberInputSkeleton', 'DsStepperSkeleton', 'DsPaginationSkeleton'].includes(doc.skeleton!.componentName),
            })">
              <component :is="skeletonComponent" v-bind="example.props" />
            </div>
          </div>

          <!-- Code block -->
          <div class="border-t border-ds-border">
            <DocsCodeBlock
              :code="generateExampleCode(doc.skeleton.componentName, example.props)"
              language="vue"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Accessibility notes -->
    <section v-if="doc.accessibility?.length" class="mb-12">
      <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Accessibility</h2>
      <ul class="space-y-2.5">
        <li
          v-for="note in doc.accessibility"
          :key="note"
          class="flex items-start gap-2.5 text-sm text-ds-fg-muted font-ds leading-relaxed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0 mt-0.5 text-ds-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ note }}
        </li>
      </ul>
    </section>

    <!-- Prev / Next navigation -->
    <DocsPrevNext />
  </div>
</template>
