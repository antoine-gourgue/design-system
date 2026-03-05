<script setup lang="ts">
useHead({ title: 'Theming — DDS' })

const overrideCode = `/* Override the primary color in your CSS */
:root {
  /* Blue theme */
  --ds-primary: #0070f3;
  --ds-primary-hover: #0060d0;
  --ds-primary-active: #0050b0;
  --ds-primary-fg: #ffffff;
  --ds-primary-subtle: #e8f1ff;
  --ds-primary-muted: #cce0ff;
  --ds-ring: #0070f3;
}

.dark {
  --ds-primary: #60a5fa;
  --ds-primary-hover: #93c5fd;
  --ds-primary-subtle: #0c1d3e;
  --ds-primary-muted: #1a3366;
  --ds-ring: #60a5fa;
}`

const darkModeCode = `<script setup>
const isDark = ref(false)

function toggle() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
<\/script>

<template>
  <button @click="toggle">Toggle dark mode</button>
</template>`

const radiusCode = `/* Sharper corners */
:root {
  --ds-radius-xs: 2px;
  --ds-radius-sm: 3px;
  --ds-radius-md: 4px;
  --ds-radius-lg: 6px;
  --ds-radius-xl: 8px;
  --ds-radius-2xl: 10px;
}`
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-6 font-ds">
      <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
      <span>/</span>
      <span class="text-ds-fg">Theming</span>
    </div>

    <h1 class="text-4xl font-bold text-ds-fg tracking-tight mb-3 font-ds">Theming</h1>
    <p class="text-lg text-ds-fg-muted mb-10 font-ds leading-relaxed">
      DDS uses CSS custom properties as the source of truth. Override any token to customize the entire system.
    </p>

    <div class="space-y-10">
      <section>
        <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Change the primary color</h2>
        <p class="text-sm text-ds-fg-muted mb-4 font-ds leading-relaxed">
          Override <code class="font-mono text-ds-primary">--ds-primary</code> and its variants in your global CSS file.
        </p>
        <DocsCodeBlock :code="overrideCode" language="css" filename="app/assets/theme.css" />
      </section>

      <section>
        <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Dark mode</h2>
        <p class="text-sm text-ds-fg-muted mb-4 font-ds leading-relaxed">
          Dark mode is toggled via the <code class="font-mono text-ds-primary">.dark</code> class on <code class="font-mono text-ds-primary">html</code>.
        </p>
        <DocsCodeBlock :code="darkModeCode" language="vue" />
      </section>

      <section>
        <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Override border radius</h2>
        <DocsCodeBlock :code="radiusCode" language="css" />
      </section>
    </div>
  </div>
</template>
