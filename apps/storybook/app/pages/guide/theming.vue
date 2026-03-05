<script setup lang="ts">
useHead({ title: 'Theming — DDS' })

const primaryCode = `/* app/assets/theme.css */
:root {
  /* Example: blue brand color */
  --ds-primary: #0070f3;
  --ds-primary-hover: #0060df;
  --ds-primary-active: #0050bb;
  --ds-primary-subtle: #e8f1ff;
  --ds-primary-muted: #cce0ff;
  --ds-primary-fg: #ffffff;
  --ds-ring: #0070f3;
}

/* Dark mode variant */
.dark {
  --ds-primary: #60a5fa;
  --ds-primary-hover: #93c5fd;
  --ds-primary-subtle: #0c1d3e;
  --ds-primary-muted: #1a3366;
  --ds-ring: #60a5fa;
}`

const importCode = `// nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/theme.css'],
})`

const darkModeCode = `<script setup lang="ts">
const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
<\/script>

<template>
  <DsButton variant="ghost" @click="toggleDark">
    {{ isDark ? 'Light mode' : 'Dark mode' }}
  </DsButton>
</template>`

const radiusCode = `/* Sharper corners */
:root {
  --ds-radius-xs: 2px;
  --ds-radius-sm: 3px;
  --ds-radius-md: 4px;
  --ds-radius-lg: 6px;
  --ds-radius-xl: 8px;
  --ds-radius-2xl: 10px;
}

/* Rounder corners */
:root {
  --ds-radius-xs: 6px;
  --ds-radius-sm: 10px;
  --ds-radius-md: 14px;
  --ds-radius-lg: 20px;
  --ds-radius-xl: 28px;
  --ds-radius-2xl: 36px;
}`

const tokensRef = [
  { token: '--ds-primary', default: '#7f00ff', desc: 'Primary brand color' },
  { token: '--ds-primary-hover', default: '#7000e0', desc: 'Primary hover state' },
  { token: '--ds-primary-active', default: '#6000c2', desc: 'Primary active/pressed state' },
  { token: '--ds-primary-fg', default: '#ffffff', desc: 'Text on primary background' },
  { token: '--ds-primary-subtle', default: '#f5f0ff', desc: 'Subtle primary background' },
  { token: '--ds-primary-muted', default: '#ede0ff', desc: 'Muted primary background' },
  { token: '--ds-bg', default: '#ffffff', desc: 'Page background' },
  { token: '--ds-bg-subtle', default: '#fafafa', desc: 'Subtle background (sidebar, etc.)' },
  { token: '--ds-bg-muted', default: '#f4f4f5', desc: 'Muted background (inputs, etc.)' },
  { token: '--ds-bg-elevated', default: '#ffffff', desc: 'Elevated surface (cards, popovers)' },
  { token: '--ds-fg', default: '#09090b', desc: 'Primary text' },
  { token: '--ds-fg-muted', default: '#71717a', desc: 'Secondary/muted text' },
  { token: '--ds-fg-subtle', default: '#a1a1aa', desc: 'Subtle/placeholder text' },
  { token: '--ds-border', default: '#e4e4e7', desc: 'Default border color' },
  { token: '--ds-border-muted', default: '#f4f4f5', desc: 'Subtle border' },
  { token: '--ds-border-strong', default: '#a1a1aa', desc: 'Strong border' },
  { token: '--ds-ring', default: '#7f00ff', desc: 'Focus ring color' },
  { token: '--ds-danger', default: '#ef4444', desc: 'Error/danger' },
  { token: '--ds-success', default: '#22c55e', desc: 'Success' },
  { token: '--ds-warning', default: '#f59e0b', desc: 'Warning' },
  { token: '--ds-info', default: '#3b82f6', desc: 'Informational' },
  { token: '--ds-radius-sm', default: '6px', desc: 'Small radius' },
  { token: '--ds-radius-md', default: '8px', desc: 'Medium radius' },
  { token: '--ds-radius-lg', default: '12px', desc: 'Large radius' },
  { token: '--ds-radius-xl', default: '16px', desc: 'Extra large radius' },
  { token: '--ds-radius-full', default: '9999px', desc: 'Full/pill radius' },
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-6 font-ds">
      <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
      <span>/</span>
      <span class="text-ds-fg">Theming</span>
    </div>

    <h1 class="text-4xl font-bold text-ds-fg tracking-tight mb-3 font-ds">
      Theming
    </h1>
    <p class="text-lg text-ds-fg-muted mb-10 font-ds leading-relaxed">
      DDS uses CSS custom properties as the single source of truth for all visual decisions.
      Override any token in your project CSS to instantly retheme every component.
    </p>

    <div class="space-y-12">

      <!-- Change primary color -->
      <section>
        <h2 class="text-xl font-semibold text-ds-fg mb-2 font-ds">Change the primary color</h2>
        <p class="text-sm text-ds-fg-muted mb-4 font-ds leading-relaxed">
          Override <code class="font-mono text-ds-primary">--ds-primary</code> and its variants in a CSS file
          to apply your brand color across all components at once.
        </p>
        <DocsCodeBlock :code="primaryCode" language="css" filename="app/assets/theme.css" />
        <p class="text-sm text-ds-fg-muted mt-4 mb-2 font-ds">
          Then import it in your Nuxt config:
        </p>
        <DocsCodeBlock :code="importCode" language="ts" filename="nuxt.config.ts" />
      </section>

      <!-- Dark mode -->
      <section>
        <h2 class="text-xl font-semibold text-ds-fg mb-2 font-ds">Dark mode</h2>
        <p class="text-sm text-ds-fg-muted mb-4 font-ds leading-relaxed">
          Dark mode is activated by toggling the <code class="font-mono text-ds-primary">.dark</code> class on the
          <code class="font-mono text-ds-primary">&lt;html&gt;</code> element.
          All tokens have dark-mode values built in — no extra CSS required.
        </p>
        <DocsCodeBlock :code="darkModeCode" language="vue" />
      </section>

      <!-- Border radius -->
      <section>
        <h2 class="text-xl font-semibold text-ds-fg mb-2 font-ds">Override border radius</h2>
        <p class="text-sm text-ds-fg-muted mb-4 font-ds leading-relaxed">
          The radius scale can be made sharper or rounder by overriding the radius tokens.
        </p>
        <DocsCodeBlock :code="radiusCode" language="css" />
      </section>

      <!-- Token reference table -->
      <section>
        <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Token reference</h2>
        <div class="overflow-x-auto rounded-ds-xl border border-ds-border">
          <table class="w-full text-sm font-ds">
            <thead class="bg-ds-bg-subtle">
              <tr>
                <th class="text-left px-4 py-3 text-ds-fg-muted font-medium">Token</th>
                <th class="text-left px-4 py-3 text-ds-fg-muted font-medium">Default (light)</th>
                <th class="text-left px-4 py-3 text-ds-fg-muted font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(t, i) in tokensRef"
                :key="t.token"
                :class="i % 2 === 0 ? 'bg-ds-bg' : 'bg-ds-bg-subtle'"
                class="border-t border-ds-border"
              >
                <td class="px-4 py-2.5">
                  <code class="font-mono text-ds-primary text-xs">{{ t.token }}</code>
                </td>
                <td class="px-4 py-2.5 text-ds-fg-muted font-mono text-xs">
                  {{ t.default }}
                </td>
                <td class="px-4 py-2.5 text-ds-fg-muted">
                  {{ t.desc }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs text-ds-fg-subtle mt-3 font-ds">
          Full reference: <code class="font-mono">node_modules/design-system-antoinegourgue/dist/runtime/assets/base.css</code>
        </p>
      </section>

    </div>
  </div>
</template>
