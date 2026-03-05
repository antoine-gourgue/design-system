# @my-scope/nuxt-ds — Monorepo

A premium Design System for Nuxt 4 and Vue 3.
Built with TypeScript, Tailwind CSS, CVA and design tokens.

---

## Repository structure

```
design-system/
├── packages/
│   └── ui/                    @my-scope/nuxt-ds (published library)
│       ├── src/
│       │   ├── module.ts      Nuxt module entry
│       │   └── runtime/
│       │       ├── assets/base.css     CSS design tokens (light + dark)
│       │       ├── utils/cn.ts
│       │       ├── composables/
│       │       └── components/         Vue SFCs
│       └── tailwind/
│           └── preset.js      Tailwind preset (exported)
│
├── apps/
│   └── storybook/             Documentation app (Nuxt 4, port 3001)
│
└── .changeset/                Changesets config (versioning)
```

---

## Getting started

```bash
npm install
npm run build
npm run dev:storybook
```

---

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the library |
| `npm run typecheck` | Type-check the library |
| `npm run lint` | Lint the library |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Format source files with Prettier |
| `npm run dev:storybook` | Start the documentation app (port 3001) |
| `npm run pack:ui` | Create a local tarball of the library |
| `npm run publish:ui:dry` | Dry-run publish (no credentials needed) |
| `npm run publish:ui` | Publish to npm |
| `npm run changeset` | Create a new changeset |
| `npm run version` | Apply pending changesets and bump versions |
| `npm run release` | Build + publish all pending changesets |

---

## Versioning and release workflow

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

### 1. Create a changeset

After making changes to `packages/ui`, describe them:

```bash
npm run changeset
```

This launches an interactive prompt:
- Select the packages changed: `@my-scope/nuxt-ds`
- Select the bump type:
  - `patch` — bug fixes, non-breaking improvements
  - `minor` — new features, backward compatible
  - `major` — breaking changes
- Write a short summary of the change

A new file is created in `.changeset/`. Commit it with your changes.

### 2. Apply changesets and bump version

When ready to release:

```bash
npm run version
```

This reads all pending `.changeset/*.md` files, bumps `packages/ui/package.json` version and updates `CHANGELOG.md`.

Review the diff, then commit:

```bash
git add .
git commit -m "chore(release): version packages"
```

### 3. Build and publish

```bash
npm run release
```

This runs `npm run build` then `changeset publish`, which:
- Publishes `@my-scope/nuxt-ds` to the npm registry
- Creates a Git tag for the release (e.g. `@my-scope/nuxt-ds@0.2.0`)

Push the tags:

```bash
git push --follow-tags
```

### Full release command sequence

```bash
# 1. Create a changeset (after your changes)
npm run changeset

# 2. Commit your changes + the changeset file
git add .
git commit -m "feat(ui): add new component"

# 3. Bump version + generate changelog
npm run version
git add .
git commit -m "chore(release): version packages"

# 4. Build + publish to npm
npm run release

# 5. Push everything including tags
git push --follow-tags
```

### Dry-run (no publish)

To check what would be published without actually publishing:

```bash
# Check tarball content
npm run pack:ui

# Dry-run publish (reads package.json, checks credentials, does not push)
npm run publish:ui:dry
```

### Breaking changes

When introducing a breaking change, select `major` in the changeset prompt
and prefix the summary with `BREAKING CHANGE:`.

Changesets will add a `## Major Changes` section to the CHANGELOG.

---

## Adding a component

1. Create `packages/ui/src/runtime/components/DsMyComponent.vue`
2. Export it in `packages/ui/src/module.ts` (add to `componentList`)
3. Create `packages/ui/src/runtime/components/DsMyComponentSkeleton.vue`
4. Add docs in `apps/storybook/app/data/components.ts`
5. Add navigation entry in `apps/storybook/app/data/nav.ts`
6. Run `npm run build` to rebuild

---

## Changing the primary color

Override `--ds-primary` in your project CSS:

```css
:root {
  --ds-primary: #0070f3;
  --ds-primary-hover: #0060df;
  --ds-primary-active: #0050bb;
  --ds-primary-subtle: #e8f1ff;
  --ds-primary-fg: #ffffff;
  --ds-ring: #0070f3;
}
```

---

## Publishing to npm

### Requirements

- An npm account with access to the `@my-scope` scope (or change the scope in `packages/ui/package.json`)
- An `NPM_TOKEN` secret in GitHub repository settings (for automated releases)

### First publish

If publishing for the first time under a new scope:

```bash
npm login
npm run build
npm run publish:ui
```

### Automated releases (GitHub Actions)

Add `NPM_TOKEN` to your GitHub repository secrets:

`Settings > Secrets and variables > Actions > New repository secret`

The `release.yml` workflow will automatically:
- Create a "Version Packages" pull request when changesets are detected
- Publish to npm when that PR is merged

---

## Installation in a consumer project

```bash
npm install @my-scope/nuxt-ds
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@my-scope/nuxt-ds',
  ],
})
```

```typescript
// tailwind.config.ts
import { preset } from '@my-scope/nuxt-ds/tailwind/preset'

export default {
  presets: [preset],
  content: [
    './app/**/*.{vue,ts}',
    './node_modules/@my-scope/nuxt-ds/dist/runtime/**/*.{vue,js,mjs}',
  ],
  darkMode: 'class',
}
```

---

## License

MIT
