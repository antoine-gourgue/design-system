<script setup lang="ts">
const tokenGroups = [
  {
    title: 'Border Radius',
    tokens: [
      { token: '--ds-radius-xs', value: '4px', class: 'rounded-ds-xs' },
      { token: '--ds-radius-sm', value: '6px', class: 'rounded-ds-sm' },
      { token: '--ds-radius-md', value: '8px', class: 'rounded-ds-md' },
      { token: '--ds-radius-lg', value: '12px', class: 'rounded-ds-lg' },
      { token: '--ds-radius-xl', value: '16px', class: 'rounded-ds-xl' },
      { token: '--ds-radius-2xl', value: '20px', class: 'rounded-ds-2xl' },
    ],
  },
  {
    title: 'Shadows',
    tokens: [
      { token: '--ds-shadow-sm', value: '0 1px 2px 0 rgb(0 0 0 / 5%)' },
      { token: '--ds-shadow-md', value: '0 4px 6px -1px ...' },
      { token: '--ds-shadow-lg', value: '0 10px 15px -3px ...' },
      { token: '--ds-shadow-xl', value: '0 20px 25px -5px ...' },
    ],
  },
  {
    title: 'Durations',
    tokens: [
      { token: '--ds-duration-fast', value: '100ms' },
      { token: '--ds-duration-base', value: '150ms' },
      { token: '--ds-duration-slow', value: '200ms' },
      { token: '--ds-duration-slower', value: '300ms' },
    ],
  },
  {
    title: 'Easing',
    tokens: [
      { token: '--ds-ease-smooth', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      { token: '--ds-ease-spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
      { token: '--ds-ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
      { token: '--ds-ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
    ],
  },
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-6 font-ds">
      <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
      <span>/</span>
      <span class="text-ds-fg">Tokens</span>
    </div>

    <h1 class="text-4xl font-bold text-ds-fg tracking-tight mb-3 font-ds">Design Tokens</h1>
    <p class="text-lg text-ds-fg-muted mb-10 font-ds leading-relaxed">
      All design decisions are captured as CSS custom properties — easy to override per project.
    </p>

    <div class="space-y-12">
      <section v-for="group in tokenGroups" :key="group.title">
        <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">{{ group.title }}</h2>

        <!-- Radius visual -->
        <div v-if="group.title === 'Border Radius'" class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <div
            v-for="t in group.tokens"
            :key="t.token"
            class="flex flex-col items-center gap-3 p-4 border border-ds-border bg-ds-bg-subtle rounded-ds-lg"
          >
            <div :class="['w-16 h-10 bg-ds-primary-subtle border border-ds-primary/30', t.class]" />
            <div class="text-center">
              <p class="text-xs font-mono text-ds-fg-muted">{{ t.token }}</p>
              <p class="text-xs text-ds-fg-subtle mt-0.5">{{ t.value }}</p>
            </div>
          </div>
        </div>

        <!-- Generic token table -->
        <div v-else class="overflow-x-auto rounded-ds-lg border border-ds-border">
          <table class="w-full text-sm font-ds">
            <thead>
              <tr class="border-b border-ds-border bg-ds-bg-subtle">
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ds-fg-subtle">Token</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ds-fg-subtle">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(t, i) in group.tokens"
                :key="t.token"
                :class="['border-b border-ds-border last:border-0', i % 2 === 0 ? 'bg-ds-bg' : 'bg-ds-bg-subtle']"
              >
                <td class="px-4 py-3">
                  <code class="text-xs font-mono text-ds-primary">{{ t.token }}</code>
                </td>
                <td class="px-4 py-3">
                  <code class="text-xs font-mono text-ds-fg-muted">{{ t.value }}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>
