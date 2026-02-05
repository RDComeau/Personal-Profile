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

## Future SSG Build Pipeline

Currently Astro builds with mock data. When the Ghost Content API integration is implemented:

```
DB starts → healthcheck passes
  → Ghost starts → healthcheck passes
    → Astro SSG build (calls Ghost Content API at build time)
      → static output served by internal Caddy
```

The Astro Dockerfile won't change. The adapter code in `astro/src/lib/content/adapter.ts` will swap from mock data to Ghost API calls. The docker-compose may add a `depends_on` from Astro to Ghost with a healthcheck if Astro needs Ghost available at build time.

## Extensibility

Future services (admin dashboard, database with SQL migrations, etc.) should:
1. Get their own subdirectory with a local Makefile, Dockerfile, and CLAUDE.md
2. Be added as a service in the root `docker-compose.yml`
3. Join the `proxy` network if they need external access
4. Have their env vars scoped to their own subdirectory
5. Get corresponding targets in the root Makefile
6. Get a route entry in the centralized Caddy project

## Cross-Cutting Roadmap

Features that span multiple services or directories:

- [ ] **Ghost → Astro SSG integration** — Build the content normalization layer and SSG adapter to replace mock data with Ghost Content API calls at build time
- [ ] **Admin dashboard** — Separate service for managing content, configuration, and analytics
- [ ] **Database SQL migrations** — Migration scripts and tooling for schema management
- [ ] **CI/CD pipeline** — Automated build, test, and deploy workflow
- [ ] **Monitoring and health checks** — Observability across all services
