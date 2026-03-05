# design-system-antoinegourgue

A premium Design System for Nuxt 4 and Vue 3.
Includes components, design tokens, Tailwind CSS preset, dark mode support and skeleton loaders.

---

## Installation

```bash
npm install design-system-antoinegourgue
```

### Peer dependencies

```bash
npm install nuxt tailwindcss @nuxtjs/tailwindcss
```

---

## Nuxt integration

### 1. Register the module

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'design-system-antoinegourgue',
  ],
})
```

### 2. Configure the Tailwind preset

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { preset } from 'design-system-antoinegourgue/tailwind/preset'

export default {
  presets: [preset],
  content: [
    './app/**/*.{vue,ts}',
    // Include library components for purging
    './node_modules/design-system-antoinegourgue/dist/runtime/**/*.{vue,js,mjs}',
  ],
  darkMode: 'class',
} satisfies Config
```

All components are auto-imported. No additional imports are required.

---

## Theming

The library uses CSS custom properties as design tokens.
Override them in your project's CSS to customize the theme.

### Change the primary color

```css
/* assets/css/overrides.css */
:root {
  --ds-primary: #0070f3;           /* your brand color */
  --ds-primary-hover: #0060df;
  --ds-primary-active: #0050bb;
  --ds-primary-subtle: #e8f1ff;
  --ds-primary-fg: #ffffff;
  --ds-ring: #0070f3;
}
```

Import it in your Nuxt app:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/css/overrides.css'],
})
```

### Available semantic tokens

| Token | Description |
|-------|-------------|
| `--ds-primary` | Primary brand color (default: `#7f00ff`) |
| `--ds-primary-hover` | Primary hover state |
| `--ds-primary-fg` | Text on primary background |
| `--ds-bg` | Page background |
| `--ds-fg` | Primary foreground text |
| `--ds-fg-muted` | Muted text |
| `--ds-card` | Card background |
| `--ds-border` | Default border color |
| `--ds-ring` | Focus ring color |
| `--ds-danger` | Error/danger color |
| `--ds-success` | Success color |
| `--ds-warning` | Warning color |
| `--ds-radius-sm/md/lg/xl` | Border radius scale |

Full token reference: see `dist/runtime/assets/base.css`.

---

## Dark mode

Dark mode is activated by adding the `dark` class to `<html>`:

```typescript
// Programmatically toggle
document.documentElement.classList.toggle('dark')
```

The library ships dark-mode values for all semantic tokens.

---

## Usage example

```vue
<template>
  <DsButton variant="primary" size="md">
    Save changes
  </DsButton>

  <DsCard>
    <DsCardHeader>
      <DsCardTitle>My card</DsCardTitle>
    </DsCardHeader>
    <DsCardContent>
      Card body content.
    </DsCardContent>
  </DsCard>
</template>
```

---

## Tailwind utilities

The preset maps design tokens to Tailwind classes:

| Tailwind class | CSS variable |
|----------------|-------------|
| `bg-ds-primary` | `--ds-primary` |
| `text-ds-fg` | `--ds-fg` |
| `border-ds-border` | `--ds-border` |
| `ring-ds-ring` | `--ds-ring` |
| `bg-ds-card` | `--ds-card` |
| `text-ds-fg-muted` | `--ds-fg-muted` |

---

## License

MIT
