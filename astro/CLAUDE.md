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

**Rendering model:** Astro static site generation with React islands. Astro handles routing and page shells; React components handle interactive UI. Components needing client-side JS must use Astro's `client:*` directives when embedded in `.astro` files.

**Layout hierarchy:**
- `Layout.astro` — Root HTML document wrapper (head, body, global CSS import)
- `SiteLayout.tsx` — React wrapper providing sticky header with navigation
- `ResizableLayout.tsx` — Two-column layout using `react-resizable-panels` (sidebar left, content right)
- `ResizableHeaderLayout.tsx` — Alternative vertical resizable layout (header top, content bottom) with mobile burger menu

Pages compose these layouts. For example, `index.astro` nests: `Layout.astro > SiteLayout > HomeHero + ResizableLayout(AboutMe, Articles)`.

**UI components** follow the shadcn/ui pattern:
- Located in `src/components/ui/`
- Use `class-variance-authority` (CVA) for type-safe variants
- Use the `cn()` utility from `src/lib/utils.ts` (clsx + tailwind-merge)
- Radix UI primitives for accessible, composable behavior

**Theming** is defined entirely in `src/styles/global.css` using Tailwind v4's `@theme` directive with OKLCH CSS custom properties. Light/dark mode via `:root` / `.dark` selectors. No separate `tailwind.config.*` file exists.

**Path alias:** `@/*` maps to `./src/*` (configured in tsconfig.json).
