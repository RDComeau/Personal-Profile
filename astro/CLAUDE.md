# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
make dev        # Install deps + start dev server (localhost:4321)
make build      # Install deps + production build to dist/
make preview    # Install deps + preview production build
make clean      # Remove dist/
make install    # Install dependencies only
```

Underlying commands use `yarn` (configurable via `YARN` variable in Makefile). No linting or testing is configured.

## Architecture

This is a personal profile/portfolio site built with **Astro v5** + **React 19** + **Tailwind CSS v4**.

**Rendering model:** Astro static site generation with React islands. Astro handles routing and page shells; React components handle interactive UI. Components using client-side state (`useState`, `useEffect`, event handlers) **must** have `client:load` on their tag in `.astro` files — this is per-component, not inherited from parents.

**Page composition** (`index.astro`):
```
Layout.astro > SiteLayout
  ├── HomeHero (client:load — typing animation)
  └── ResizableLayout (client:load — sidebar toggle)
        ├── AboutMe
        ├── LatestArticles
        ├── LatestPodcasts
        ├── LatestReadings
        └── LatestProjects
```

**Layout components:**
- `Layout.astro` — Root HTML document wrapper (head, body, global CSS import)
- `SiteLayout.tsx` — Sticky header with centered navigation (Home, About, Projects, Blog)
- `ResizableLayout.tsx` — Overlay sidebar drawer (toggle button on left edge, slides over content, full-height). Does **not** use `react-resizable-panels` despite the name — it's a simple `useState` + CSS transform drawer.

**Content sections** in `src/components/sections/`:
- `HomeHero` — Full-viewport hero with animated typing effect cycling through titles
- `Articles`, `Podcasts` — Vertical list layout with thumbnail, title, excerpt, date
- `Readings`, `Projects` — 3-across card grid layout
- `Projects` has organization badges (color-coded), status indicators, and technology tags
- `Sidebar` — Navigation, newsletter signup, popular tags, social links (rendered inside the drawer)

**Custom hooks** in `src/hooks/`:
- `useTypingEffect` — Character-by-character type/pause/erase animation cycle

**UI components** follow the shadcn/ui pattern:
- Located in `src/components/ui/`
- Use `class-variance-authority` (CVA) for type-safe variants
- Use the `cn()` utility from `src/lib/utils.ts` (clsx + tailwind-merge)
- Radix UI primitives for accessible, composable behavior

**Theming** is defined entirely in `src/styles/global.css` using Tailwind v4's `@theme` directive with OKLCH CSS custom properties. Light/dark mode via `:root` / `.dark` selectors. No separate `tailwind.config.*` file exists. Use theme token classes (`bg-background`, `text-muted-foreground`, `border-border`) for structural colors. Reserve hardcoded palette colors only for semantic accents (badges).

**Path alias:** `@/*` maps to `./src/*` (configured in tsconfig.json).
