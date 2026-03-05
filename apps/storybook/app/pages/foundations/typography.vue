<script setup lang="ts">
const sizes = [
  { label: 'text-xs', class: 'text-xs', size: '12px', usage: 'Captions, badges, helper text' },
  { label: 'text-sm', class: 'text-sm', size: '14px', usage: 'Body text, UI labels, table cells' },
  { label: 'text-base', class: 'text-base', size: '16px', usage: 'Default body copy' },
  { label: 'text-lg', class: 'text-lg', size: '18px', usage: 'Lead text, section intro' },
  { label: 'text-xl', class: 'text-xl', size: '20px', usage: 'Subheadings, card titles' },
  { label: 'text-2xl', class: 'text-2xl', size: '24px', usage: 'Section headings (h3)' },
  { label: 'text-3xl', class: 'text-3xl', size: '30px', usage: 'Page headings (h2)' },
  { label: 'text-4xl', class: 'text-4xl', size: '36px', usage: 'Hero headings (h1)' },
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-6 font-ds">
      <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
      <span>/</span>
      <span class="text-ds-fg">Typography</span>
    </div>

    <h1 class="text-4xl font-bold text-ds-fg tracking-tight mb-3 font-ds">Typography</h1>
    <p class="text-lg text-ds-fg-muted mb-10 font-ds leading-relaxed">
      The type scale uses system fonts for maximum readability across platforms.
    </p>

    <!-- Font families -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-ds-fg mb-6 font-ds">Font Families</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-5 rounded-ds-lg border border-ds-border bg-ds-bg">
          <p class="text-xs font-medium uppercase tracking-wider text-ds-fg-subtle mb-3 font-mono">--ds-font-sans</p>
          <p class="text-2xl font-medium text-ds-fg font-ds">The quick brown fox</p>
          <p class="text-sm text-ds-fg-muted mt-2 font-ds">
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
          </p>
        </div>
        <div class="p-5 rounded-ds-lg border border-ds-border bg-ds-bg">
          <p class="text-xs font-medium uppercase tracking-wider text-ds-fg-subtle mb-3 font-mono">--ds-font-mono</p>
          <p class="text-2xl font-mono font-medium text-ds-fg">const x = 42</p>
          <p class="text-sm text-ds-fg-muted mt-2 font-ds">
            "SF Mono", "Fira Code", ui-monospace
          </p>
        </div>
      </div>
    </section>

    <!-- Type scale -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-ds-fg mb-6 font-ds">Type Scale</h2>
      <div class="space-y-1 rounded-ds-lg border border-ds-border overflow-hidden">
        <div
          v-for="(size, i) in sizes"
          :key="size.label"
          :class="['flex items-baseline gap-6 px-5 py-4 border-b border-ds-border last:border-0', i % 2 === 0 ? 'bg-ds-bg' : 'bg-ds-bg-subtle']"
        >
          <div class="w-24 shrink-0">
            <code class="text-xs font-mono text-ds-fg-muted">{{ size.label }}</code>
            <p class="text-xs text-ds-fg-subtle mt-0.5">{{ size.size }}</p>
          </div>
          <p :class="['text-ds-fg font-ds flex-1 leading-none', size.class]">
            The quick brown fox
          </p>
          <span class="text-xs text-ds-fg-subtle shrink-0 hidden sm:block">{{ size.usage }}</span>
        </div>
      </div>
    </section>

    <!-- Font weights -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-ds-fg mb-6 font-ds">Font Weights</h2>
      <div class="space-y-3">
        <div v-for="weight in [{ label: 'Normal (400)', class: 'font-normal' }, { label: 'Medium (500)', class: 'font-medium' }, { label: 'Semibold (600)', class: 'font-semibold' }, { label: 'Bold (700)', class: 'font-bold' }]" :key="weight.label" class="flex items-center gap-6">
          <code class="text-xs font-mono text-ds-fg-muted w-36 shrink-0">{{ weight.label }}</code>
          <p :class="['text-xl text-ds-fg font-ds', weight.class]">Design System</p>
        </div>
      </div>
    </section>
  </div>
</template>
