# Personal Profile

A personal portfolio and profile site for Richard Comeau — Senior Cloud & DevOps Engineer. Built with Astro, React, and Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Yarn](https://yarnpkg.com/) package manager

## Getting Started

```bash
make dev
```

This installs dependencies and starts the dev server at `http://localhost:4321`.

## Makefile

All common tasks are available through the Makefile:

| Command         | What it does                                      |
| :-------------- | :------------------------------------------------ |
| `make help`     | List all available targets                        |
| `make install`  | Install dependencies (`yarn install`)             |
| `make dev`      | Install deps + start dev server at localhost:4321 |
| `make build`    | Install deps + production build to `dist/`        |
| `make preview`  | Install deps + preview the production build       |
| `make clean`    | Remove `dist/` build artifacts                    |

The `YARN` variable can be overridden if needed: `make dev YARN=npx yarn`.

## Project Structure

```
src/
├── components/
│   ├── sections/     # Page content sections (HomeHero, AboutMe, Articles, etc.)
│   └── ui/           # Reusable UI primitives (Button, Input, etc.)
├── hooks/            # Custom React hooks (useTypingEffect, etc.)
├── layouts/          # Page layout wrappers (Layout.astro, SiteLayout, ResizableLayout)
├── lib/              # Utility functions (cn helper)
├── pages/            # File-based routing (index.astro, profile.astro)
└── styles/           # Global CSS and theme definitions
```

## Tech Stack

- **Astro v5** — Static site generation with file-based routing
- **React 19** — Interactive UI components via Astro's island architecture
- **Tailwind CSS v4** — Utility-first styling with OKLCH color theming
- **TypeScript** — Type safety for React components
- **Lucide React** — Icon library
- **Radix UI** — Accessible component primitives
- **class-variance-authority** — Type-safe component variants (shadcn/ui pattern)

## Things Worth Considering

- **Astro island hydration:** React components in `.astro` files are server-rendered by default. Any component using client-side state (`useState`, `useEffect`, event handlers) must have a `client:load` or `client:idle` directive to ship JavaScript to the browser.
- **Theming:** All color tokens are defined in `src/styles/global.css` using CSS custom properties. Use theme token classes (`bg-background`, `text-muted-foreground`, `border-border`, etc.) for structural colors. Reserve hardcoded palette colors (e.g., `bg-amber-100`) only for intentional semantic accents like badges.
- **No linting or testing** is currently configured.
- **Local notes:** Files matching `*.local.md` are gitignored for personal reference that shouldn't be committed.
