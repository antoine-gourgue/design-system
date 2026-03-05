# design-system-antoinegourgue

A premium Design System for Nuxt 4 and Vue 3.
Built with TypeScript, Tailwind CSS, CVA (class-variance-authority) and CSS design tokens.

- 60+ components with typed props, CVA variants and accessibility
- Skeleton loaders for every component
- Light/dark mode via CSS variables and `.dark` class
- Tailwind CSS preset with design tokens mapped to utility classes
- `useToast()` composable included
- Tree-shakeable, ESM-first

---

## Installation

```bash
npm install design-system-antoinegourgue
```

### Peer dependencies

```bash
npm install nuxt @nuxtjs/tailwindcss
```

---

## Setup (Nuxt 4)

### 1. Register the Nuxt module

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'design-system-antoinegourgue/module',
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    configPath: './tailwind.config.ts',
    cssPath: '~/assets/main.css',  // required — see step 3
  },
})
```

### 2. Configure the Tailwind preset

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import dsPreset from 'design-system-antoinegourgue/tailwind/preset'

export default {
  presets: [dsPreset],
  content: [
    './app/**/*.{vue,ts,js}',
    // Scan library components so Tailwind generates their utility classes
    './node_modules/design-system-antoinegourgue/dist/**/*.{js,mjs,vue}',
  ],
} satisfies Config
```

### 3. Create the CSS entry point

Create `app/assets/main.css` — this imports the design tokens and Tailwind layers:

```css
/* app/assets/main.css */
@import 'design-system-antoinegourgue/dist/runtime/assets/base.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Add DsToastProvider to app root

The toast system requires a provider in your app root:

```vue
<!-- app/app.vue -->
<template>
  <div>
    <DsToastProvider />
    <NuxtPage />
  </div>
</template>
```

---

## All components are auto-imported

No need to import anything manually. All `Ds*` components are globally available in your templates:

```vue
<template>
  <DsButton variant="primary" size="md">
    Save changes
  </DsButton>

  <DsAlert variant="success" title="Saved" description="Your changes have been saved." />

  <DsCard hoverable>
    <DsCardHeader>
      <h3 class="font-semibold text-ds-fg">My Card</h3>
    </DsCardHeader>
    <DsCardContent>
      <p class="text-sm text-ds-fg-muted">Card body content.</p>
    </DsCardContent>
    <DsCardFooter>
      <DsBadge variant="success" label="Active" />
    </DsCardFooter>
  </DsCard>
</template>
```

---

## Module options

All options are optional — defaults work out of the box.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['design-system-antoinegourgue/module'],
  nuxtDs: {
    prefix: 'Ds',      // Component prefix. Default: 'Ds'
    global: true,      // Auto-import everywhere. Default: true
    injectCSS: true,   // Auto-inject base.css tokens. Default: true
    toast: true,       // Enable useToast() composable. Default: true
  },
})
```

> Note: even with `injectCSS: true`, you still need `app/assets/main.css` with the `@tailwind` directives so Tailwind generates all utility classes.

---

## Components

### Actions

| Component | Description |
|-----------|-------------|
| `DsButton` | Button with variants: `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link` |
| `DsBadge` | Status badge with dot indicator |
| `DsTag` | Dismissible chip/tag |
| `DsKbd` | Keyboard shortcut display |

### Form

| Component | Description |
|-----------|-------------|
| `DsInput` | Text input |
| `DsTextarea` | Multi-line text input |
| `DsSelect` | Dropdown select |
| `DsCheckbox` | Checkbox with label |
| `DsSwitch` | Toggle switch |
| `DsSlider` | Range slider |
| `DsRadioGroup` | Radio button group |
| `DsNumberInput` | Number input with increment/decrement |
| `DsOtpInput` | One-time password segmented input |
| `DsLabel` | Form field label |
| `DsHelpText` | Helper/error text for form fields |

### Feedback

| Component | Description |
|-----------|-------------|
| `DsAlert` | Inline alert with variants: `info`, `success`, `warning`, `danger` |
| `DsToast` / `DsToastProvider` | Toast notifications via `useToast()` |
| `DsTooltip` | Hover tooltip |
| `DsProgress` | Progress bar |
| `DsSpinner` | Loading spinner |
| `DsSkeleton` | Base skeleton loader |
| `DsEmptyState` | Empty state with optional action |

### Overlay

| Component | Description |
|-----------|-------------|
| `DsModal` | Dialog/modal with v-model |
| `DsSheet` | Side drawer (left/right/top/bottom) with v-model |
| `DsPopover` | Popover panel |
| `DsDropdown` | Dropdown menu |
| `DsAlertDialog` | Confirmation dialog |
| `DsContextMenu` | Right-click context menu |
| `DsCommandPalette` | Command palette / search modal |
| `DsHoverCard` | Hover-triggered card popover |

### Navigation

| Component | Description |
|-----------|-------------|
| `DsTabs` / `DsTab` / `DsTabPanel` | Tabbed navigation |
| `DsAccordion` / `DsAccordionItem` | Collapsible sections |
| `DsBreadcrumb` | Breadcrumb navigation |
| `DsPagination` | Page navigation |
| `DsStepper` | Multi-step progress indicator |
| `DsCollapsible` | Single collapsible block |

### Data Display

| Component | Description |
|-----------|-------------|
| `DsCard` / `DsCardHeader` / `DsCardContent` / `DsCardFooter` | Compound card |
| `DsTable` | Simple data table with striped/hoverable variants |
| `DsDataTable` | Advanced data table with sort and search |
| `DsAvatar` | User avatar with image or initials fallback |
| `DsStatCard` | KPI / stat card with trend indicator |
| `DsCalendar` | Interactive calendar |
| `DsTimeline` | Vertical timeline |
| `DsRating` | Star rating |

### Charts (SVG, zero dependencies)

| Component | Description |
|-----------|-------------|
| `DsLineChart` | Line chart |
| `DsBarChart` | Bar chart |
| `DsDonutChart` | Donut / pie chart |
| `DsSparkline` | Inline sparkline |

### Other

| Component | Description |
|-----------|-------------|
| `DsSeparator` | Horizontal/vertical divider |
| `DsCarousel` | Image/content carousel |
| `DsFileUpload` | Drag & drop file upload |
| `DsDatePicker` | Date picker |
| `DsColorPicker` | Color picker with swatches |
| `DsPhoneInput` | International phone number input |
| `DsToggleGroup` | Toggle button group |

---

## Composables

### useToast

```vue
<script setup lang="ts">
const { toast } = useToast()

function save() {
  toast({
    title: 'Saved',
    description: 'Your changes have been saved.',
    variant: 'success',   // 'default' | 'success' | 'warning' | 'danger'
    duration: 4000,
  })
}
</script>
```

---

## Theming — CSS tokens

All design tokens are CSS custom properties in `base.css`. Override them in your own CSS to customize the theme.

### Change the primary color

```css
/* app/assets/theme.css */
:root {
  --ds-primary: #0070f3;
  --ds-primary-hover: #0060df;
  --ds-primary-active: #0050bb;
  --ds-primary-subtle: #e8f1ff;
  --ds-primary-muted: #cce0ff;
  --ds-primary-fg: #ffffff;
  --ds-ring: #0070f3;
}

.dark {
  --ds-primary: #60a5fa;
  --ds-primary-hover: #93c5fd;
  --ds-primary-subtle: #0c1d3e;
  --ds-primary-muted: #1a3366;
  --ds-ring: #60a5fa;
}
```

### Token reference

| Token | Default | Description |
|-------|---------|-------------|
| `--ds-primary` | `#7f00ff` | Primary brand color |
| `--ds-primary-hover` | `#7000e0` | Primary hover state |
| `--ds-primary-active` | `#6000c2` | Primary active/pressed state |
| `--ds-primary-fg` | `#ffffff` | Text on primary background |
| `--ds-primary-subtle` | `#f5f0ff` | Subtle primary background |
| `--ds-primary-muted` | `#ede0ff` | Muted primary background |
| `--ds-bg` | `#ffffff` | Page background |
| `--ds-bg-subtle` | `#fafafa` | Subtle background |
| `--ds-bg-muted` | `#f4f4f5` | Muted background |
| `--ds-fg` | `#09090b` | Primary text |
| `--ds-fg-muted` | `#71717a` | Muted text |
| `--ds-fg-subtle` | `#a1a1aa` | Subtle/placeholder text |
| `--ds-border` | `#e4e4e7` | Default border |
| `--ds-ring` | `#7f00ff` | Focus ring |
| `--ds-danger` | `#ef4444` | Error/danger |
| `--ds-success` | `#22c55e` | Success |
| `--ds-warning` | `#f59e0b` | Warning |
| `--ds-info` | `#3b82f6` | Informational |
| `--ds-radius-sm` | `6px` | Small border radius |
| `--ds-radius-md` | `8px` | Medium border radius |
| `--ds-radius-lg` | `12px` | Large border radius |
| `--ds-radius-xl` | `16px` | Extra large border radius |

### Override border radius (rounder or sharper)

```css
:root {
  /* Sharper */
  --ds-radius-sm: 3px;
  --ds-radius-md: 4px;
  --ds-radius-lg: 6px;
  --ds-radius-xl: 8px;

  /* or rounder */
  --ds-radius-sm: 8px;
  --ds-radius-md: 12px;
  --ds-radius-lg: 18px;
  --ds-radius-xl: 24px;
}
```

---

## Dark mode

Dark mode is controlled via the `.dark` class on `<html>`.
All tokens have a dark variant — no extra configuration needed.

```typescript
// Toggle dark mode
document.documentElement.classList.toggle('dark')
```

---

## Tailwind utilities

The preset maps every design token to a Tailwind utility class:

| Class | CSS variable |
|-------|-------------|
| `bg-ds-primary` | `--ds-primary` |
| `text-ds-fg` | `--ds-fg` |
| `text-ds-fg-muted` | `--ds-fg-muted` |
| `border-ds-border` | `--ds-border` |
| `ring-ds-ring` | `--ds-ring` |
| `bg-ds-bg` | `--ds-bg` |
| `bg-ds-card` | `--ds-bg-elevated` |
| `bg-ds-danger` | `--ds-danger` |
| `bg-ds-success` | `--ds-success` |
| `text-ds-primary-fg` | `--ds-primary-fg` |

---

## Skeleton loaders

Every component ships with a `Ds[Name]Skeleton` variant for loading states:

```vue
<template>
  <!-- Show skeleton while loading -->
  <DsCardSkeleton v-if="loading" />
  <DsCard v-else>...</DsCard>

  <DsTableSkeleton v-if="loading" :rows="5" />
  <DsTable v-else :columns="cols" :rows="data" />

  <DsStatCardSkeleton v-if="loading" show-trend show-description />
  <DsStatCard v-else v-bind="stat" />
</template>
```

---

## License

MIT
