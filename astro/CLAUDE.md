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

This is a personal site and content hub built with **Astro v5** + **React 19** + **Tailwind CSS v4**. It serves as a convergence point for software engineering, entrepreneurship, and content creation.

**Rendering model:** Astro static site generation with React islands. Astro handles routing and page shells; React components handle interactive UI. Components using client-side state (`useState`, `useEffect`, event handlers) **must** have `client:load` on their tag in `.astro` files — this is per-component, not inherited from parents.

### Pages

| Route | File | Notes |
|-------|------|-------|
| `/` | `index.astro` | Home page — hero, latest content sections, sidebar drawer |
| `/about` | `about.astro` | Hero, personal journey, interactive timeline, skills, personal interests, CTA |
| `/blog` | `blog.astro` | All content with client-side filtering by medium/org/category/tag + pagination |
| `/blog/[slug]` | `blog/[slug].astro` | Individual content pages via `getStaticPaths` |
| `/contact` | `contact.astro` | Opportunity cards, contact form, sidebar with social/availability |
| `/projects` | `projects.astro` | Redirects to `/blog?type=project` |

### Page composition (`index.astro`)
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

### Layout components
- `Layout.astro` — Root HTML document wrapper (head, body, global CSS import)
- `SiteLayout.tsx` — Sticky header with centered navigation (Home, About, Blog, Contact)
- `ResizableLayout.tsx` — Overlay sidebar drawer (toggle button on left edge, slides over content, full-height). Does **not** use `react-resizable-panels` despite the name — it's a simple `useState` + CSS transform drawer.

### Data layers

**Content data** (`src/lib/content/`): Adapter pattern for blog/content items. All content flows through a single `ContentItem` type with optional medium-specific fields. Currently backed by mock data; designed to swap to Ghost CMS without changing any components.
- `types.ts` — `ContentItem`, `Medium`, `BlogFilters`, taxonomy types
- `taxonomy.ts` — Static arrays of organizations, categories, tags with slugs and color classes; lookup helpers (`getOrgBySlug`, `getOrgColorClass`)
- `mock-data.ts` — ~17 `ContentItem[]` entries (articles, podcasts, readings, projects)
- `adapter.ts` — `getAllContent()`, `getLatestByMedium()`, `getContentBySlug()`, `filterContent()`, `paginateContent()`, taxonomy count functions
- `index.ts` — Barrel export

**About data** (`src/lib/about/`): Typed data for the about page timeline, skills, and personal interests.
- `types.ts` — `Role`, `RoleType` (`"org" | "full-time" | "contract" | "military" | "project" | "education" | "community"`), `SkillCategory`, `PersonalInterest`, `CompanyDef`
- `data.ts` — `roles[]` (16 entries), `skillCategories[]`, `personalInterests[]`, `companyColors` (color-coded badges per company), `typeLabels` (badge styles per role type)
- `index.ts` — Barrel export

### Component groups

**About components** (`src/components/about/`):
- `AboutHero` — Profile photo, positioning statement, social links, CTAs
- `AboutJourney` — Three-paragraph personal narrative
- `AboutTimeline` (client:load) — Interactive filterable experience timeline with type tabs, company chips, staggered animations. Orgs sort to top; then by date descending; then by type priority.
- `AboutSkills` — 3-column grid of skill categories
- `AboutPersonal` — 2x2 card grid of personal interests with SVG icons
- `AboutCta` — Closing CTA linking to /contact and /blog

**Blog components** (`src/components/blog/`):
- `BlogLayout` (client:load) — Top-level island composing filter bar + grid + sidebar in 2/3 + 1/3 layout
- `BlogFilterBar` — Medium tabs + removable active filter chips
- `BlogGrid` — 2-column card grid of `BlogCard` components
- `BlogCard` — Content card with medium badge, org badge, status indicator, tech tags
- `BlogSidebar` — Inline right sidebar with org/category/tag filters and newsletter signup
- `BlogPagination` — Page navigation with configurable items per page
- `useBlogFilters` — Hook that parses URL query params, filters/paginates content, syncs URL via `history.replaceState`

**Contact components** (`src/components/contact/`):
- `ContactPage` (client:load) — "What I'm open to" opportunity cards, contact form with topic dropdown, sidebar with email/location/social/availability

**Home sections** (`src/components/sections/`):
- `HomeHero` — Full-viewport hero with animated typing effect cycling through titles
- `Articles`, `Podcasts` — Vertical list layout; accept `items: ContentItem[]` props from the adapter
- `Readings`, `Projects` — 3-across card grid; accept `items: ContentItem[]` props from the adapter
- `Projects` has organization badges (color-coded), status indicators, and technology tags
- `Sidebar` — Navigation, newsletter signup, popular tags, social links (rendered inside the drawer)
- `AboutMe`, `Footer`, `NewsletterCta` — Supporting sections

**Custom hooks** in `src/hooks/`:
- `useTypingEffect` — Character-by-character type/pause/erase animation cycle

**UI components** follow the shadcn/ui pattern:
- Located in `src/components/ui/`
- Use `class-variance-authority` (CVA) for type-safe variants
- Use the `cn()` utility from `src/lib/utils.ts` (clsx + tailwind-merge)
- Radix UI primitives for accessible, composable behavior

### Theming

Defined entirely in `src/styles/global.css` using Tailwind v4's `@theme` directive with OKLCH CSS custom properties. Light/dark mode via `:root` / `.dark` selectors. No separate `tailwind.config.*` file exists. Use theme token classes (`bg-background`, `text-muted-foreground`, `border-border`) for structural colors. Reserve hardcoded palette colors only for semantic accents (badges).

**Path alias:** `@/*` maps to `./src/*` (configured in tsconfig.json).

## Roadmap

### Ghost SSG Integration (see root CLAUDE.md for cross-cutting phases)

- [ ] **Phase 1: Ghost API client + normalization** — Create `src/lib/content/ghost-client.ts` (fetch from Ghost Content API), create `src/lib/content/normalize.ts` (parse `#org-*`, `#cat-*`, `#medium-*`, `#project-*`, `#status-*` tags into `ContentItem` fields). Update `adapter.ts` to call Ghost instead of importing mock data. Add env config for `GHOST_URL` and `GHOST_CONTENT_API_KEY`.
- [ ] **Phase 2: Empty state handling** — Home page sections (`Articles`, `Podcasts`, `Readings`, `Projects`) show "Coming Soon!" when `items` array is empty. Blog page can remain blank.
- [ ] **Phase 3: SEO canonical URLs** — Add `canonicalUrl` to `ContentItem` type. Map from Ghost's `canonical_url`. Render `<link rel="canonical">` in `Layout.astro`. For cross-org content, canonical points to the originating org's site.
- [ ] **Phase 4: Multi-org aggregation** — Fetch from multiple Ghost instances at build time. Config array of `{ name, url, apiKey }` endpoints. Merge + deduplicate content. Auto-set canonical URLs to source org.
- [ ] **Phase 5: External content sources (RSS/API)** — Fetch content from external platforms (Medium, Hashnode, etc.) via RSS feeds or public APIs. Normalize into `ContentItem` type alongside Ghost content. Canonical URLs point to the original platform URL. Adapter config supports a list of `{ name, type: "rss" | "api", url }` sources.
- [ ] **Blog post page with Ghost HTML** — Render Ghost's `html` field in `blog/[slug].astro` instead of excerpt placeholder. Style Ghost HTML output with Tailwind prose classes.

### Other Features

- [ ] **Dark mode toggle** — Add user-facing theme switcher (CSS custom properties already support `.dark` selector)
- [ ] **Newsletter integration** — Connect newsletter signup forms to an actual email service
- [ ] **SEO and meta tags** — Add Open Graph, Twitter Card, and structured data to all pages
- [ ] **Linting and testing** — Configure ESLint and a test runner
- [ ] **Contact form backend** — Wire the contact form to a real submission handler
