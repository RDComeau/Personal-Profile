# CLAUDE.md

Guidance for Claude Code at the repository root (orchestration layer).

## Project Structure

This is a multi-service personal portfolio deployed to a homelab server via Docker.

```
Personal-Profile/
├── astro/              # Astro v5 + React 19 + Tailwind v4 static site (see astro/CLAUDE.md)
├── ghost/              # Ghost CMS + MySQL (see ghost/CLAUDE.md)
├── docker-compose.yml  # Root orchestration — all services
├── Makefile            # Root Makefile — unified commands
├── CLAUDE.md           # This file (architecture + cross-cutting concerns)
└── README.md           # Project documentation
```

## Commands (Root)

```bash
# Development (Astro local, Ghost in Docker)
make dev            # Start Astro dev server + Ghost/DB in Docker
make dev-astro      # Astro dev server only (localhost:4321)
make dev-ghost      # Ghost + DB in Docker only (localhost:8080)

# Production (everything in Docker)
make up             # Build and start all services
make down           # Stop all services
make build          # Build all Docker images
make rebuild        # Force rebuild all images (no cache)

# Observability
make logs           # Follow all service logs
make logs-astro     # Follow Astro logs
make logs-ghost     # Follow Ghost logs
make logs-db        # Follow DB logs
make ps             # List running containers

# Maintenance
make clean          # Remove build artifacts and stopped containers
```

## Services

| Service | Container Name | Internal Port | Dev Mode | Prod Mode |
|---------|---------------|---------------|----------|-----------|
| Astro | personal-profile-astro | 80 | Local yarn dev (4321) | Docker (Caddy static) |
| Ghost | personal-profile-ghost | 2368 | Docker (8080) | Docker |
| MySQL | personal-profile-db | 3306 | Docker (3306) | Docker |

## Network Topology

All routable services join the external `proxy` Docker network. A **centralized Caddy reverse proxy** (managed in a separate project) routes traffic by hostname to each container.

```
Cloudflare Tunnel (TLS) → Caddy (:80) → personal-profile-astro:80
                                       → personal-profile-ghost:2368
```

The centralized Caddy uses this routing pattern:
```
@personalprofile host personal-profile.example.com
handle @personalprofile {
    reverse_proxy personal-profile-astro:80
}
```

The `proxy` network must exist: `docker network create proxy`

Caddy configuration lives in its own project — this repo only ensures containers join `proxy` with predictable `personal-profile-*` names.

## Architecture Conventions

- All Docker service names use the `personal-profile-` prefix
- Environment variables are scoped per service (Ghost env vars live in `ghost/.env`)
- Root docker-compose references them via `env_file: ./ghost/.env`
- Subdirectory Makefiles (`astro/Makefile`, `ghost/Makefile`) still work standalone for isolated development
- The root Makefile delegates to `docker compose` for production and `make -C` for local dev
- The Astro Dockerfile uses multi-stage build: Node 20 Alpine (build) → Caddy 2 Alpine (serve static files)
- The Astro container's internal Caddy is separate from the centralized Caddy — it only serves static files on port 80
- MySQL healthcheck ensures Ghost waits for DB readiness before starting

## SSG Build Pipeline

Astro fetches content from the Ghost Content API at build time (SSG). The data flow:

```
DB starts → healthcheck passes
  → Ghost starts → healthcheck passes
    → Astro SSG build (calls Ghost Content API at build time)
      → static output served by internal Caddy
```

**Local dev workflow (`make dev`):** Astro runs locally via `yarn dev` and calls Ghost in Docker at `localhost:8080`. Hot reload works normally.

**Production build constraint:** The Astro Dockerfile builds at image creation time, when Ghost isn't reachable. Current workaround: build Astro locally first, then build the Docker image. Future solution: a build-time service or CI step that builds Astro with Ghost available, then copies static output into the container.

## Extensibility

Future services (admin dashboard, database with SQL migrations, etc.) should:
1. Get their own subdirectory with a local Makefile, Dockerfile, and CLAUDE.md
2. Be added as a service in the root `docker-compose.yml`
3. Join the `proxy` network if they need external access
4. Have their env vars scoped to their own subdirectory
5. Get corresponding targets in the root Makefile
6. Get a route entry in the centralized Caddy project

## Content Taxonomy

See `CONTENT_TAXONOMY.md` at the project root for the full tagging convention that bridges Ghost CMS and Astro.

Key concepts:
- Ghost internal tags (`#` prefix) encode metadata: `#org-*`, `#cat-*`, `#medium-*`, `#project-*`, `#status-*`
- Regular Ghost tags are technology/topic tags (React, Kubernetes, etc.)
- The Astro normalization layer parses prefixes and maps to `ContentItem` fields
- Projects use individual posts with a `#project-*` umbrella tag for timeline tracking

## Cross-Cutting Roadmap

Features that span multiple services or directories:

### Ghost → Astro SSG Integration (Phased)

- [x] **Phase 1: Ghost API client + normalization layer** — Ghost Content API client (`ghost-client.ts`), normalization layer (`normalize.ts`) parsing `#org-*`, `#cat-*`, `#medium-*`, `#project-*`, `#status-*` tag prefixes. Adapter is async and caches content for the build. Env config via `astro/.env`.
- [x] **Phase 2: Empty state handling** — Home page sections show "Coming Soon!" with dashed border placeholder when no content of that medium exists.
- [x] **Phase 3: SEO canonical URLs** — `canonicalUrl` on `ContentItem`, mapped from Ghost's `canonical_url`. `Layout.astro` renders `<link rel="canonical">` (uses `canonicalUrl` if set, otherwise self-referencing). Page titles also implemented.
- [x] **Phase 4A: Multi-source scaffolding** — `SourceConnection` config model with discriminated union (Ghost, Medium, Substack, Hashnode). Connection definitions in `sources.config.ts` (serializable, admin-dashboard-ready). Parameterized fetchers (`fetchers/`) and normalizers (`normalizers/`). Aggregator orchestrates parallel fetch from all enabled connections. Adapter wired to aggregator with unchanged public API.
- [ ] **Phase 4B: Multi-Ghost instances** — Add additional Ghost connections with separate env vars per instance.
- [ ] **Phase 5A: RSS sources (Medium + Substack)** — `rss-parser` dependency, RSS fetcher, Medium/Substack normalizers.
- [ ] **Phase 5B: Hashnode API** — Hashnode GraphQL fetcher and normalizer.
- [ ] **Phase 5C: Additional external sources** — Extend `PlatformType` for new platforms as needed.

### Production Deployment

- [x] **SSG build with Ghost access** — GitHub Actions self-hosted runner builds on homelab with Ghost network access. See `.github/RUNNER_SETUP.md`.
- [ ] **Hostname configuration** — Domain `richardcomeau.com` purchased. Update centralized Caddy config + Cloudflare Tunnel.
- [ ] **Ghost production URL** — `ghost/.env` `GHOST_URL` must match the public URL for links/images to work correctly.

## CI/CD

GitHub Actions workflows in `.github/workflows/`:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | PR to master | Run tests + validate build (blocks fork PRs from self-hosted runner) |
| `deploy.yml` | Push to master | Full build + deploy to homelab |
| `content-sync.yml` | Every 30 min | Poll Ghost for changes, trigger deploy if new content |
| `test.yml` | Reusable | Unit tests (placeholder until tests added) |
| `build.yml` | Reusable | Build Astro with Ghost API |

**Self-hosted runner**: Required for Ghost API access and deploy. See `.github/RUNNER_SETUP.md`.

**Required secrets** (set in GitHub repo settings):
- `GHOST_URL` — Ghost API URL (e.g., `http://personal-profile-ghost:2368`)
- `GHOST_CONTENT_API_KEY` — Ghost Content API key

### Other

- [ ] **Admin dashboard** — Separate service for managing content, configuration, and analytics
- [ ] **Database SQL migrations** — Migration scripts and tooling for schema management
- [x] **CI/CD pipeline** — GitHub Actions: test, build, deploy workflows with self-hosted runner
- [ ] **Monitoring and health checks** — Observability across all services
