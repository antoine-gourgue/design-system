# @my-scope/nuxt-ds

> A minimal, Apple-inspired Design System for Nuxt — components, tokens, Tailwind preset.

Built with **Nuxt 4**, **Vue 3**, **TypeScript**, **Tailwind CSS v3** and **CVA**.

---

## Repository structure

```
design-system/
├── packages/
│   └── ui/                  ← @my-scope/nuxt-ds (the library)
│       ├── src/
│       │   ├── module.ts    ← Nuxt module entry
│       │   ├── index.ts     ← Library entry (utils + types)
│       │   └── runtime/
│       │       ├── assets/base.css     ← CSS tokens (light + dark)
│       │       ├── utils/cn.ts         ← cn() helper
│       │       ├── composables/useToast.ts
│       │       └── components/         ← Vue SFCs
│       └── tailwind/
│           └── preset.js    ← Tailwind preset (exported)
│
└── apps/
    └── playground/          ← Nuxt 4 demo app
        ├── app/
        │   ├── app.vue
        │   └── pages/index.vue
        └── tailwind.config.ts
```

---

## Development (local)

```bash
# Install all dependencies (npm workspaces)
npm install

# Build the UI library
npm run build

# Start the playground (http://localhost:3000)
npm run dev
```

### Iterative development (stub mode)

During development, use stub mode to avoid rebuilding on every change:

```bash
# Creates stubs in dist/ that point directly to src/
npm run stub
```

---

## Installation in a Nuxt project

### 1. Install the package

```bash
npm install @my-scope/nuxt-ds @nuxtjs/tailwindcss tailwindcss
```

### 2. Register the Nuxt module

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@my-scope/nuxt-ds',
  ],

  // Optional: configure the module
  nuxtDs: {
    prefix: 'Ds',      // Component prefix: <DsButton />, <DsCard />, etc.
    global: true,      // Register components globally
    injectCSS: true,   // Auto-inject design token CSS
    toast: true,       // Enable useToast composable
  },
})
```

### 3. Configure Tailwind

```ts
// tailwind.config.ts
import dsPreset from '@my-scope/nuxt-ds/tailwind/preset'
import type { Config } from 'tailwindcss'

export default {
  presets: [dsPreset],
  content: [
    './app/**/*.{vue,ts,js}',
    // Include the library SFCs for JIT to work
    './node_modules/@my-scope/nuxt-ds/dist/runtime/**/*.vue',
  ],
} satisfies Config
```

---

## Usage

### Button

```vue
<template>
  <!-- Variants -->
  <DsButton variant="primary">Save</DsButton>
  <DsButton variant="secondary">Cancel</DsButton>
  <DsButton variant="ghost">Learn more</DsButton>
  <DsButton variant="destructive">Delete account</DsButton>
  <DsButton variant="link" as="a" href="/home">Go home</DsButton>

  <!-- Sizes -->
  <DsButton size="sm">Small</DsButton>
  <DsButton size="md">Medium</DsButton>
  <DsButton size="lg">Large</DsButton>

  <!-- States -->
  <DsButton :loading="isSaving">Save</DsButton>
  <DsButton :disabled="true">Disabled</DsButton>
  <DsButton :rounded="true">Pill button</DsButton>
  <DsButton :full-width="true">Block button</DsButton>

  <!-- Icons -->
  <DsButton>
    <template #leftIcon>
      <PlusIcon class="size-4" />
    </template>
    New item
  </DsButton>
</template>
```

### Badge

```vue
<DsBadge variant="success" :dot="true">Active</DsBadge>
<DsBadge variant="danger" size="lg">Error</DsBadge>
<DsBadge variant="primary" :rounded="true">New</DsBadge>
```

### Card

```vue
<DsCard shadow="md" :hoverable="true">
  <DsCardHeader :divided="true">
    <h2>Card title</h2>
    <p>Subtitle here</p>
  </DsCardHeader>

  <DsCardContent>
    Main content goes here.
  </DsCardContent>

  <DsCardFooter align="between">
    <DsBadge variant="success">Active</DsBadge>
    <DsButton size="sm">View</DsButton>
  </DsCardFooter>
</DsCard>
```

### Input / Label / HelpText

```vue
<div class="space-y-1.5">
  <DsLabel for="email" :required="true">Email</DsLabel>

  <DsInput
    id="email"
    v-model="email"
    type="email"
    placeholder="you@example.com"
    :error="hasError"
    described-by="email-help"
  >
    <template #leading>
      <MailIcon class="size-4" />
    </template>
  </DsInput>

  <DsHelpText id="email-help" :error="hasError">
    {{ hasError ? 'Invalid email address.' : 'Enter your work email.' }}
  </DsHelpText>
</div>
```

### Modal

```vue
<script setup>
const isOpen = ref(false)
</script>

<template>
  <DsButton @click="isOpen = true">Open modal</DsButton>

  <DsModal
    v-model="isOpen"
    title="Confirm action"
    description="This action cannot be undone."
    size="md"
  >
    <p>Modal body content.</p>

    <template #footer>
      <DsButton variant="ghost" @click="isOpen = false">Cancel</DsButton>
      <DsButton @click="isOpen = false">Confirm</DsButton>
    </template>
  </DsModal>
</template>
```

### Dropdown

```vue
<DsDropdown
  :items="[
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { divider: true, label: '' },
    { label: 'Delete', value: 'delete', destructive: true },
  ]"
  @select="(item) => console.log(item.value)"
>
  <template #trigger="{ open }">
    <DsButton variant="secondary">
      Actions
      <template #rightIcon>
        <ChevronDownIcon :class="open ? 'rotate-180' : ''" class="size-4 transition-transform" />
      </template>
    </DsButton>
  </template>
</DsDropdown>
```

### Tabs

```vue
<DsTabs v-model="activeTab" variant="line">
  <DsTabList>
    <DsTab value="overview">Overview</DsTab>
    <DsTab value="analytics">Analytics</DsTab>
    <DsTab value="settings">Settings</DsTab>
  </DsTabList>

  <DsTabPanels>
    <DsTabPanel value="overview">Overview content</DsTabPanel>
    <DsTabPanel value="analytics">Analytics content</DsTabPanel>
    <DsTabPanel value="settings">Settings content</DsTabPanel>
  </DsTabPanels>
</DsTabs>
```

Tab variants: `line` (default) | `enclosed` | `pills`

### Toast

Add `<DsToastProvider />` once in `app.vue`:

```vue
<!-- app/app.vue -->
<template>
  <div>
    <NuxtPage />
    <DsToastProvider position="bottom-right" :max="5" />
  </div>
</template>
```

Then use `useToast()` anywhere:

```vue
<script setup>
const { toast } = useToast()

function save() {
  toast({
    title: 'Saved!',
    description: 'Your changes have been saved.',
    variant: 'success',
    duration: 4000,
  })
}
</script>
```

Toast variants: `default` | `success` | `error` | `warning` | `info`

### Skeleton

```vue
<!-- Card skeleton -->
<div class="flex items-center gap-4">
  <DsSkeleton shape="circle" width="48" height="48" />
  <div class="space-y-2">
    <DsSkeleton shape="text" width="180" height="16" />
    <DsSkeleton shape="text" width="120" height="14" />
  </div>
</div>
```

Shapes: `rectangle` | `rounded` | `circle` | `pill` | `text`

---

## Theming

### Override CSS tokens

CSS custom properties are the source of truth. Override them in your app's CSS:

```css
/* app/assets/main.css */
:root {
  /* Change primary to indigo */
  --ds-primary: #6366f1;
  --ds-primary-hover: #4f46e5;
  --ds-primary-fg: #ffffff;

  /* Custom radius */
  --ds-radius-md: 4px;
  --ds-radius-lg: 6px;
}

.dark {
  --ds-primary: #818cf8;
  --ds-primary-hover: #a5b4fc;
}
```

### Override Tailwind theme

Extend the preset in your `tailwind.config.ts`:

```ts
import dsPreset from '@my-scope/nuxt-ds/tailwind/preset'

export default {
  presets: [dsPreset],
  theme: {
    extend: {
      // Add your own tokens alongside the ds-* tokens
      colors: {
        brand: '#your-color',
      },
    },
  },
}
```

### Full theme reset

To completely replace the color palette, override the CSS variables and adjust the Tailwind theme extension.

---

## Design tokens reference

### Colors (CSS variables)

| Variable | Light | Dark | Usage |
|---|---|---|---|
| `--ds-bg` | `#ffffff` | `#000000` | Page background |
| `--ds-bg-subtle` | `#f5f5f7` | `#1c1c1e` | Subtle backgrounds |
| `--ds-fg` | `#1d1d1f` | `#f5f5f7` | Primary text |
| `--ds-fg-muted` | `#6e6e73` | `#aeaeb2` | Secondary text |
| `--ds-border` | `#d2d2d7` | `#3a3a3c` | Borders |
| `--ds-primary` | `#007aff` | `#0a84ff` | Primary action (Apple blue) |
| `--ds-danger` | `#ff3b30` | `#ff453a` | Destructive action (Apple red) |
| `--ds-success` | `#34c759` | `#32d74b` | Positive feedback |
| `--ds-warning` | `#ff9500` | `#ff9f0a` | Caution |

### Tailwind classes

All tokens are available as Tailwind utilities via the `ds-*` namespace:

```html
<div class="bg-ds-bg text-ds-fg border border-ds-border rounded-ds-md shadow-ds-md">
  <p class="text-ds-fg-muted font-ds">Styled with tokens</p>
</div>
```

### Dark mode

The library uses the `class` dark mode strategy. Toggle dark mode by adding/removing `.dark` on `<html>`:

```ts
document.documentElement.classList.toggle('dark')
```

---

## Publishing to npm

### 1. Build the library

```bash
npm run build
```

Output: `packages/ui/dist/`

### 2. Update version

```bash
cd packages/ui
npm version patch   # or minor / major
```

### 3. Publish

```bash
cd packages/ui

# Dry run first to review what will be published
npm publish --dry-run

# Publish (requires npm login)
npm login
npm publish --access public
```

For scoped packages with a custom scope, ensure your `package.json` has:

```json
{
  "name": "@your-scope/nuxt-ds",
  "publishConfig": {
    "access": "public"
  }
}
```

### What gets published

The `files` field in `package.json` limits publication to:
- `dist/` — compiled module + runtime components
- `tailwind/` — Tailwind preset

Source files are NOT published.

---

## Accessibility

- All interactive elements have `focus-visible` ring styles
- Buttons use semantic `<button type="button">`
- Inputs connect to labels via `id`/`for`
- Modal uses `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`, ESC key handling, and focus trap
- Tabs use `role="tab"`, `role="tabpanel"`, `aria-selected`, keyboard navigation
- Toasts use `role="alert"` and `aria-live`
- All animations respect `prefers-reduced-motion`

---

## Browser support

Targets modern browsers (ES2020+). Requires:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

---

## Tech stack

| Tool | Purpose |
|---|---|
| Nuxt 3 (v4 compat) | Module framework |
| Vue 3 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS v3 | Utility-first styling |
| CVA (class-variance-authority) | Component variants |
| clsx + tailwind-merge | Class merging |
| @nuxt/module-builder | Library build tooling |

---

## License

MIT
