<p align="center">
  <img src="https://design-system-storybook.antoinegourgue.dev/logo.png" alt="DDS Logo" width="80" />
</p>

<h1 align="center">design-system-antoinegourgue</h1>

<p align="center">
  A premium, production-ready Design System for Nuxt 4 and Vue 3.<br/>
  Built with TypeScript, Tailwind CSS, and a fully customizable CSS token system.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/design-system-antoinegourgue">
    <img src="https://img.shields.io/npm/v/design-system-antoinegourgue?style=flat-square&color=7f00ff" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/design-system-antoinegourgue">
    <img src="https://img.shields.io/npm/dm/design-system-antoinegourgue?style=flat-square&color=7f00ff" alt="npm downloads" />
  </a>
  <a href="https://github.com/antoine-gourgue/design-system/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/design-system-antoinegourgue?style=flat-square&color=7f00ff" alt="license" />
  </a>
  <a href="https://design-system-storybook.antoinegourgue.dev">
    <img src="https://img.shields.io/badge/docs-online-7f00ff?style=flat-square" alt="documentation" />
  </a>
</p>

---

## Overview

`design-system-antoinegourgue` is a modern, opinionated Design System built for **Nuxt 4** and **Vue 3** applications. It provides a comprehensive set of fully-typed, accessible UI components styled with Tailwind CSS and backed by a CSS custom property token architecture.

The library is designed to be dropped into a Nuxt project with minimal configuration. All components are auto-imported via the Nuxt module, dark mode works out of the box, and the entire theme is overridable through a small set of CSS variables.

Built with:

- **Nuxt 4** — module integration, auto-imports, SSR-safe
- **Vue 3** — Composition API, `<script setup>`, typed props
- **TypeScript** — full type coverage on every component and composable
- **Tailwind CSS** — utility-first styling with a custom preset
- **CVA** — class-variance-authority for composable variant management

---

## Features

- 76 components covering actions, forms, feedback, navigation, overlays, data display, and charts
- Full TypeScript support with exported prop types for every component
- Tailwind CSS preset that maps all design tokens to utility classes
- CSS variable token system — override the entire theme with a few lines of CSS
- Skeleton loader variant for every component
- Light and dark mode via a `.dark` class on `<html>` — no extra setup required
- Accessible by default — ARIA attributes, keyboard navigation, focus management
- Tree-shakeable ESM build
- `useToast()` composable included
- Interactive documentation at [design-system-storybook.antoinegourgue.dev](https://design-system-storybook.antoinegourgue.dev)

---

## Installation

```bash
npm install design-system-antoinegourgue
```

### Peer dependencies

```bash
npm install nuxt @nuxtjs/tailwindcss tailwindcss
```

| Peer dependency       | Required version |
|-----------------------|-----------------|
| `vue`                 | `>= 3.4.0`      |
| `nuxt`                | `>= 3.0.0`      |
| `tailwindcss`         | `>= 3.0.0 < 4`  |
| `@nuxtjs/tailwindcss` | `>= 6.0.0`      |

---

## Quick Start

### 1. Register the Nuxt module

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'design-system-antoinegourgue/module',
    '@nuxtjs/tailwindcss',
  ],
  nuxtDs: {
    prefix: 'Ds',       // component prefix — default: 'Ds'
    global: true,       // auto-import everywhere — default: true
    injectCSS: true,    // inject base design tokens — default: true
    toast: true,        // enable useToast() composable — default: true
  },
  tailwindcss: {
    configPath: './tailwind.config.ts',
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
    './node_modules/design-system-antoinegourgue/dist/**/*.{js,mjs,vue}',
  ],
} satisfies Config
```

### 3. Create the CSS entry point

```css
/* app/assets/main.css */
@import 'design-system-antoinegourgue/dist/runtime/assets/base.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Add the Toast provider

```vue
<!-- app/app.vue -->
<template>
  <div>
    <DsToastProvider />
    <NuxtPage />
  </div>
</template>
```

All `Ds*` components are now globally available — no manual imports needed.

---

## Usage

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

  <DsDataTable
    :columns="columns"
    :rows="rows"
    searchable
    :per-page="10"
  />
</template>
```

---

## Module Options

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['design-system-antoinegourgue/module'],
  nuxtDs: {
    prefix: 'Ds',      // component prefix
    global: true,      // register components globally
    injectCSS: true,   // auto-inject base.css token file
    toast: true,       // register useToast() composable
  },
})
```

---

## Components

### Actions

| Component       | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `DsButton`      | Button with variants: `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link` |
| `DsToggle`      | Two-state toggle button                                                     |
| `DsToggleGroup` | Group of toggle buttons with single or multiple selection                   |

### Form

| Component           | Description                                             |
|---------------------|---------------------------------------------------------|
| `DsInput`           | Text input with size and state variants                 |
| `DsTextarea`        | Multi-line text input                                   |
| `DsSelect`          | Native dropdown select                                  |
| `DsCheckbox`        | Checkbox with label and indeterminate support           |
| `DsSwitch`          | Toggle switch with v-model                              |
| `DsSlider`          | Range slider with min/max/step                          |
| `DsRadioGroup`      | Radio button group                                      |
| `DsNumberInput`     | Numeric input with increment/decrement buttons          |
| `DsOtpInput`        | One-time password segmented input                       |
| `DsCombobox`        | Searchable dropdown with keyboard navigation            |
| `DsMultiSelect`     | Multi-value select with tags                            |
| `DsTagInput`        | Free-form tag input                                     |
| `DsDatePicker`      | Date picker with calendar popup                         |
| `DsDateRangePicker` | Date range picker                                       |
| `DsTimePicker`      | Time picker with hour/minute/second                     |
| `DsColorPicker`     | Color picker with hex input and swatches                |
| `DsPhoneInput`      | International phone number input with country selector  |
| `DsFileUpload`      | Drag and drop file upload with preview                  |
| `DsLabel`           | Form field label                                        |
| `DsHelpText`        | Helper/error text for form fields                       |

### Feedback

| Component       | Description                                                |
|-----------------|------------------------------------------------------------|
| `DsAlert`       | Inline alert — variants: `info`, `success`, `warning`, `danger` |
| `DsAlertDialog` | Confirmation alert dialog                                  |
| `DsBadge`       | Status badge with label and optional dot indicator         |
| `DsProgress`    | Progress bar with percentage                               |
| `DsRating`      | Star rating with half-star support                         |
| `DsSpinner`     | Loading spinner with size variants                         |
| `DsToast`       | Toast notification via `useToast()` composable             |
| `DsTooltip`     | Hover tooltip with placement options                       |

### Display

| Component            | Description                                           |
|----------------------|-------------------------------------------------------|
| `DsCard`             | Compound card — header, content, footer slots         |
| `DsAvatar`           | User avatar with image or initials fallback           |
| `DsAvatarGroup`      | Stacked group of avatars with overflow counter        |
| `DsSkeleton`         | Base skeleton loader                                  |
| `DsStatCard`         | KPI / stat card with trend indicator                  |
| `DsStatusBadge`      | Status indicator with dot and label                   |
| `DsTag`              | Dismissible chip/tag                                  |
| `DsKbd`              | Keyboard shortcut display                             |
| `DsCarousel`         | Image and content carousel                            |
| `DsCodeBlock`        | Syntax-highlighted code block with copy button        |
| `DsEmptyState`       | Empty state with icon, title, description, and action |
| `DsHoverCard`        | Hover-triggered card popover                          |
| `DsNotificationItem` | Notification list item with avatar and timestamp      |
| `DsScrollArea`       | Custom scrollable area                                |
| `DsSeparator`        | Horizontal or vertical divider                        |
| `DsTimeline`         | Vertical timeline with steps                          |
| `DsTreeView`         | Recursive tree view with expand/collapse              |
| `DsAspectRatio`      | Enforce an aspect ratio on any content                |
| `DsVisuallyHidden`   | Visually hidden text for screen readers               |

### Charts (SVG, zero dependencies)

| Component       | Description                                          |
|-----------------|------------------------------------------------------|
| `DsLineChart`   | Animated line chart with multiple series             |
| `DsBarChart`    | Vertical bar chart with labels and tooltips          |
| `DsDonutChart`  | Donut and pie chart with legend                      |
| `DsRadarChart`  | Radar/spider chart for multi-axis data               |
| `DsSparkline`   | Compact inline sparkline for KPIs                    |

### Data

| Component      | Description                                                           |
|----------------|-----------------------------------------------------------------------|
| `DsTable`      | Simple data table — striped, hoverable, responsive (cards on mobile)  |
| `DsDataTable`  | Advanced table with search, sort, pagination, responsive card view    |
| `DsCalendar`   | Interactive calendar with single/range date selection                 |
| `DsStepper`    | Multi-step progress indicator                                         |

### Navigation

| Component           | Description                                           |
|---------------------|-------------------------------------------------------|
| `DsAccordion`       | Collapsible sections with single or multiple open     |
| `DsBreadcrumb`      | Breadcrumb navigation                                 |
| `DsDropdown`        | Dropdown menu with items, dividers, and icons         |
| `DsMenubar`         | Horizontal application menu bar                       |
| `DsNavigationMenu`  | Accessible top navigation menu                        |
| `DsPagination`      | Page navigation with ellipsis                         |
| `DsTabs`            | Tabbed navigation with panel content                  |

### Overlay

| Component          | Description                                            |
|--------------------|--------------------------------------------------------|
| `DsModal`          | Dialog/modal with v-model                              |
| `DsDrawer`         | Side drawer — left, right, top, bottom                 |
| `DsSheet`          | Sheet panel sliding from any edge                      |
| `DsPopover`        | Popover panel anchored to a trigger                    |
| `DsBanner`         | Full-width dismissible banner                          |
| `DsCollapsible`    | Single collapsible block                               |
| `DsConfirmDialog`  | Confirmation dialog with custom actions                |
| `DsContextMenu`    | Right-click context menu                               |
| `DsCommandPalette` | Command palette with search and keyboard navigation    |
| `DsLoadingOverlay` | Full-screen or scoped loading overlay                  |

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

## Theming

All design tokens are CSS custom properties defined in `base.css`. Override any token in your own CSS to customize the theme globally.

### Default primary color

The default primary color is `#7f00ff` (violet). Every derived color (hover, active, subtle, muted, ring) is computed from this base.

### Override the primary color

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

### Full token reference

| Token                | Light default  | Description                    |
|----------------------|----------------|--------------------------------|
| `--ds-primary`       | `#7f00ff`      | Primary brand color            |
| `--ds-primary-hover` | `#7000e0`      | Primary hover state            |
| `--ds-primary-active`| `#6000c2`      | Primary active/pressed state   |
| `--ds-primary-fg`    | `#ffffff`      | Text on primary background     |
| `--ds-primary-subtle`| `#f5f0ff`      | Subtle primary background      |
| `--ds-primary-muted` | `#ede0ff`      | Muted primary background       |
| `--ds-bg`            | `#ffffff`      | Page background                |
| `--ds-bg-subtle`     | `#fafafa`      | Subtle background              |
| `--ds-bg-muted`      | `#f4f4f5`      | Muted background               |
| `--ds-fg`            | `#09090b`      | Primary text                   |
| `--ds-fg-muted`      | `#71717a`      | Muted text                     |
| `--ds-fg-subtle`     | `#a1a1aa`      | Subtle / placeholder text      |
| `--ds-border`        | `#e4e4e7`      | Default border                 |
| `--ds-ring`          | `#7f00ff`      | Focus ring                     |
| `--ds-danger`        | `#ef4444`      | Error / destructive            |
| `--ds-success`       | `#22c55e`      | Success                        |
| `--ds-warning`       | `#f59e0b`      | Warning                        |
| `--ds-info`          | `#3b82f6`      | Informational                  |
| `--ds-radius-sm`     | `6px`          | Small border radius            |
| `--ds-radius-md`     | `8px`          | Medium border radius           |
| `--ds-radius-lg`     | `12px`         | Large border radius            |
| `--ds-radius-xl`     | `16px`         | Extra large border radius      |

### Override border radius

```css
:root {
  /* Sharper */
  --ds-radius-sm: 3px;
  --ds-radius-md: 4px;
  --ds-radius-lg: 6px;
  --ds-radius-xl: 8px;

  /* Rounder */
  --ds-radius-sm: 8px;
  --ds-radius-md: 12px;
  --ds-radius-lg: 18px;
  --ds-radius-xl: 24px;
}
```

---

## Dark Mode

Dark mode is toggled by adding the `.dark` class to `<html>`. No extra configuration is required — all tokens have a dark variant built in.

```typescript
// Toggle dark mode
document.documentElement.classList.toggle('dark')
```

```vue
<script setup lang="ts">
const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
```

---

## Skeleton Loaders

Every component ships with a `Ds[Name]Skeleton` for loading states. Skeletons match the layout and size of their corresponding component and use a pulse animation with design tokens.

```vue
<template>
  <!-- Show skeleton while data is loading -->
  <DsCardSkeleton v-if="loading" />
  <DsCard v-else hoverable>...</DsCard>

  <DsTableSkeleton v-if="loading" :rows="5" />
  <DsTable v-else :columns="columns" :rows="rows" />

  <DsStatCardSkeleton v-if="loading" show-trend show-description />
  <DsStatCard v-else v-bind="stat" />

  <DsButtonSkeleton v-if="loading" size="md" />
  <DsButton v-else variant="primary">Submit</DsButton>
</template>
```

---

## Tailwind Utilities

The Tailwind preset maps every design token to a utility class:

| Tailwind class         | CSS variable          |
|------------------------|-----------------------|
| `bg-ds-primary`        | `--ds-primary`        |
| `text-ds-fg`           | `--ds-fg`             |
| `text-ds-fg-muted`     | `--ds-fg-muted`       |
| `border-ds-border`     | `--ds-border`         |
| `ring-ds-ring`         | `--ds-ring`           |
| `bg-ds-bg`             | `--ds-bg`             |
| `bg-ds-bg-muted`       | `--ds-bg-muted`       |
| `bg-ds-primary-subtle` | `--ds-primary-subtle` |
| `bg-ds-danger`         | `--ds-danger`         |
| `bg-ds-success`        | `--ds-success`        |
| `text-ds-primary-fg`   | `--ds-primary-fg`     |

---

## Documentation

Full interactive documentation with live component previews, props playground, code examples, and accessibility notes:

**[design-system-storybook.antoinegourgue.dev](https://design-system-storybook.antoinegourgue.dev)**

---

## Development

### Prerequisites

- Node.js >= 20
- npm >= 10

### Setup

```bash
# Clone the repository
git clone https://github.com/antoine-gourgue/design-system.git
cd design-system

# Install all workspace dependencies
npm install

# Build the UI library
npm run build
```

### Available scripts

```bash
# Start the documentation app (port 3001)
npm run dev:storybook

# Build the UI library
npm run build

# Type check
npm run typecheck

# Lint
npm run lint
npm run lint:fix

# Format
npm run format
```

---

## Versioning

This project uses [Semantic Versioning](https://semver.org) and [Changesets](https://github.com/changesets/changesets) for automated changelog and release management.

### Creating a release

```bash
# 1. Create a changeset describing your changes
npx changeset

# 2. Bump versions and update changelogs
npm run version

# 3. Commit the version bump
git add .
git commit -m "chore(release): version packages"
git push --follow-tags

# 4. Publish to npm
npm run release
```

### Dry run

```bash
# Preview what would be published without publishing
npm run publish:ui:dry

# Inspect the tarball contents
npm run pack:ui
```

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org)
4. Open a Pull Request against `main`

Please make sure `npm run lint` and `npm run typecheck` pass before submitting.

---

## Repository structure

```
design-system/
├── packages/
│   └── ui/              # The publishable UI library
│       ├── src/
│       │   ├── module.ts
│       │   └── runtime/
│       │       ├── components/   # All Ds* components
│       │       ├── composables/  # useToast, etc.
│       │       └── assets/       # base.css design tokens
│       └── tailwind/
│           └── preset.js         # Tailwind preset
├── apps/
│   └── storybook/       # Interactive documentation app (Nuxt 4)
└── package.json         # Workspace root
```

---

## License

MIT — [Antoine Gourgue](https://github.com/antoine-gourgue)
