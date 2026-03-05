<template>
  <footer class="border-t border-ds-border bg-ds-bg mt-auto">
    <div class="max-w-screen-2xl mx-auto px-4 lg:px-6 py-8 lg:pl-72">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">

        <!-- Left: logo + name -->
        <div class="flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo" class="size-8 object-contain dark:invert" />
          <span class="text-sm font-semibold text-ds-fg font-ds">DDS</span>
          <span class="text-ds-fg-muted text-sm">— Design System</span>
        </div>

        <!-- Center: links -->
        <div class="flex items-center gap-5 text-sm text-ds-fg-muted">
          <NuxtLink to="/guide/installation" class="hover:text-ds-fg transition-colors">Docs</NuxtLink>
          <NuxtLink to="/components" class="hover:text-ds-fg transition-colors">Components</NuxtLink>
          <a
            href="https://www.npmjs.com/package/design-system-antoinegourgue"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-ds-fg transition-colors flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 0v24h24V0H0zm19.2 19.2H12v-9.6H7.2v9.6H4.8V4.8h14.4v14.4z"/>
            </svg>
            npm
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-ds-fg transition-colors flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        <!-- Right: copyright -->
        <p class="text-xs text-ds-fg-subtle">
          MIT License &middot; Antoine Gourgue
        </p>

      </div>
    </div>
  </footer>
</template>
