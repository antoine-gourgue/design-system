# design-system-antoinegourgue — Monorepo

A premium Design System for Nuxt 4 and Vue 3.
87+ components, design tokens, Tailwind CSS preset, dark mode, skeleton loaders.

Published on npm: [`design-system-antoinegourgue`](https://www.npmjs.com/package/design-system-antoinegourgue)

---

## Repository structure

```
design-system/
├── packages/
│   └── ui/                          Published library (design-system-antoinegourgue)
│       ├── src/
│       │   ├── module.ts            Nuxt module entry
│       │   └── runtime/
│       │       ├── assets/base.css  CSS design tokens (light + dark)
│       │       ├── composables/     useToast, etc.
│       │       ├── utils/           cn(), cva helpers
│       │       └── components/      Vue SFCs (Ds*.vue)
│       ├── tailwind/
│       │   └── preset.js            Tailwind preset (exported)
│       └── package.json
│
├── apps/
│   └── storybook/                   Documentation app (Nuxt 4, port 3001)
│
├── .changeset/                      Changesets config (versioning)
├── .github/workflows/               CI + release GitHub Actions
└── package.json                     Root monorepo scripts
```

---

## Getting started (local development)

```bash
npm install
npm run build
npm run dev:storybook   # http://localhost:3001
```

---

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the library (`packages/ui`) |
| `npm run typecheck` | Type-check the library |
| `npm run lint` | Lint the library |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Format source files with Prettier |
| `npm run dev:storybook` | Start the documentation app (port 3001) |
| `npm run pack:ui` | Create a local tarball for testing |
| `npm run publish:ui:dry` | Dry-run publish (no credentials needed) |
| `npm run publish:ui` | Publish to npm |
| `npm run changeset` | Create a new changeset |
| `npm run version` | Apply pending changesets and bump versions |
| `npm run release` | Build + publish all pending changesets |

---

## Installing in a consumer project

```bash
npm install design-system-antoinegourgue
npm install @nuxtjs/tailwindcss   # if not already present
```

### 1. nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: [
    'design-system-antoinegourgue/module',
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    configPath: './tailwind.config.ts',
    cssPath: '~/assets/main.css',
  },
})
```

### 2. tailwind.config.ts

```typescript
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

### 3. app/assets/main.css

```css
@import 'design-system-antoinegourgue/dist/runtime/assets/base.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. app/app.vue

```vue
<template>
  <div>
    <DsToastProvider />
    <NuxtPage />
  </div>
</template>
```

All `Ds*` components are auto-imported globally. No explicit imports needed.

---

## Component categories

| Category   | Components |
|------------|------------|
| Actions    | Button, Toggle, ToggleGroup |
| Form       | FormField, Input, Textarea, Select, Checkbox, Switch, Slider, RadioGroup, NumberInput, OtpInput, Combobox, MultiSelect, TagInput, DatePicker, DateRangePicker, TimePicker, ColorPicker, PhoneInput, FileUpload, Label, HelpText |
| Feedback   | Alert, AlertDialog, Badge, Progress, Rating, Spinner, Toast, Tooltip |
| Display    | Card, Avatar, AvatarGroup, Skeleton, StatCard, StatusBadge, Tag, Kbd, Carousel, CodeBlock, CopyButton, EmptyState, HoverCard, NotificationItem, NumberTicker, QRCode, ScrollArea, Separator, Timeline, TreeView, AspectRatio, VisuallyHidden |
| Charts     | AreaChart, BarChart, DonutChart, GaugeChart, LineChart, RadarChart, Sparkline |
| Data       | Table, DataTable, Calendar, Kanban, Stepper, VirtualList |
| Navigation | Accordion, Breadcrumb, Dropdown, Menubar, NavigationMenu, Pagination, Tabs, VerticalNav |
| Layout     | FloatingActionButton, Resizable |
| Overlay    | Modal, Drawer, Sheet, Popover, Banner, Collapsible, ConfirmDialog, ContextMenu, CommandPalette, LoadingOverlay |

## Adding a new component

1. Create `packages/ui/src/runtime/components/DsMyComponent.vue`
2. Create `packages/ui/src/runtime/components/DsMyComponentSkeleton.vue`
3. Register both in `packages/ui/src/module.ts` (add to `componentList`)
4. Add a docs entry in `apps/storybook/app/data/components.ts`
5. Add a navigation entry in `apps/storybook/app/data/nav.ts`
6. Run `npm run build` to rebuild the library

---

## Changing the primary color

Override `--ds-primary` and its variants in your project CSS:

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
  --ds-ring: #60a5fa;
}
```

Then add to `nuxt.config.ts`:

```typescript
css: ['~/assets/theme.css']
```

---

## Versioning and release workflow

This project uses [Changesets](https://github.com/changesets/changesets).

### Full release sequence

```bash
# 1. Describe your changes
npm run changeset

# 2. Commit your changes + the generated changeset file
git add .
git commit -m "feat(ui): add MyComponent"

# 3. Bump version + generate CHANGELOG
npm run version
git add .
git commit -m "chore(release): version packages"

# 4. Build + publish to npm
npm run release

# 5. Push including the git tag
git push --follow-tags
```

### Dry-run (no publish)

```bash
npm run pack:ui          # Inspect the tarball content
npm run publish:ui:dry   # Check publish output without pushing
```

### Automated releases (GitHub Actions)

Add an `NPM_TOKEN` secret in your GitHub repository:
`Settings > Secrets and variables > Actions > New repository secret`

Use an **Automation** token or a **Granular Access Token** with "Bypass 2FA" enabled.

The `release.yml` workflow will:
- Create a "Version Packages" PR when changesets are detected on `main`
- Publish to npm automatically when that PR is merged

---

## License

MIT
