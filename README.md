# Personal Profile

A multi-service personal portfolio and content platform deployed via Docker to a homelab server.

## Architecture

```
┌─────────────────────────────────────────────────┐
│              Cloudflare Tunnel (TLS)            │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│          Caddy Reverse Proxy (:80)              │
│          (external, separate project)           │
│          Docker network: proxy                  │
└───────┬────────────────────────────┬────────────┘
        │                            │
┌───────▼──────────┐      ┌─────────▼────────────┐
│  Astro (static)  │      │     Ghost CMS        │
│  caddy:2-alpine  │      │   ghost:5-alpine     │
│  Port 80         │      │   Port 2368          │
│  personal-       │      │   personal-          │
│  profile-astro   │      │   profile-ghost      │
└──────────────────┘      └─────────┬────────────┘
                                    │
                          ┌─────────▼────────────┐
                          │     MySQL 8          │
                          │  personal-profile-db │
                          │  Port 3306           │
                          └──────────────────────┘
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Node.js 20+](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) (for local development)
- External Docker network: `docker network create proxy`

## Quick Start

### Production (all services in Docker)

```bash
cp ghost/.env.example ghost/.env   # Edit with real values
make up                            # Build and start all services
```

### Development

```bash
cp ghost/.env.example ghost/.env   # Edit with real values
make dev                           # Astro dev server (localhost:4321) + Ghost in Docker (localhost:8080)
```

## Services

| Service   | Description                                               | Dev Access     | Prod Access     |
| --------- | --------------------------------------------------------- | -------------- | --------------- |
| **Astro** | Static portfolio site (Astro v5 + React 19 + Tailwind v4) | localhost:4321 | Via Caddy proxy |
| **Ghost** | Headless CMS for blog content                             | localhost:8080 | Via Caddy proxy |
| **MySQL** | Ghost database                                            | localhost:3306 | Internal only   |

## Makefile Targets

| Target            | Description                              |
| ----------------- | ---------------------------------------- |
| `make help`       | List all available targets               |
| `make dev`        | Start Astro locally + Ghost/DB in Docker |
| `make dev-astro`  | Start Astro dev server only              |
| `make dev-ghost`  | Start Ghost + DB in Docker only          |
| `make up`         | Build and start all services in Docker   |
| `make down`       | Stop and remove all containers           |
| `make build`      | Build all Docker images                  |
| `make rebuild`    | Force rebuild all images (no cache)      |
| `make logs`       | Follow logs for all services             |
| `make logs-astro` | Follow Astro logs only                   |
| `make logs-ghost` | Follow Ghost logs only                   |
| `make logs-db`    | Follow DB logs only                      |
| `make ps`         | List running containers                  |
| `make clean`      | Remove build artifacts and containers    |

## Project Structure

```
Personal-Profile/
├── astro/                  # Astro frontend application
│   ├── src/                # Source code (pages, components, data, styles)
│   ├── public/             # Static assets
│   ├── Dockerfile          # Multi-stage build (Node → Caddy)
│   ├── Caddyfile           # Internal static file server config
│   ├── .dockerignore       # Docker build exclusions
│   ├── Makefile            # Local dev commands
│   ├── CLAUDE.md           # Astro-specific Claude Code guidance
│   └── package.json
├── ghost/                  # Ghost CMS
│   ├── content/            # Ghost content (gitignored)
│   ├── themes/             # Ghost themes
│   ├── data/               # MySQL data (gitignored)
│   ├── .env.example        # Environment variables template
│   ├── Makefile            # Ghost-specific commands
│   └── CLAUDE.md           # Ghost-specific Claude Code guidance
├── docker-compose.yml      # All services orchestration
├── docker-compose.override.yml  # Dev port overrides
├── Makefile                # Unified build/deploy commands
├── CLAUDE.md               # Root Claude Code guidance
└── README.md               # This file
```

## Environment Variables

Ghost environment variables live in `ghost/.env` (copy from `ghost/.env.example`):

| Variable              | Service | Description                  |
| --------------------- | ------- | ---------------------------- |
| `GHOST_URL`           | Ghost   | Public URL of Ghost instance |
| `MYSQL_ROOT_PASSWORD` | MySQL   | Root password                |
| `MYSQL_USER`          | MySQL   | Application user             |
| `MYSQL_PASSWORD`      | MySQL   | Application password         |
| `MYSQL_DATABASE`      | MySQL   | Database name                |

## Deployment

This project deploys to a homelab server running:

1. **Cloudflare Tunnel** — terminates TLS and forwards traffic to the server
2. **Caddy** — centralized reverse proxy container on the `proxy` Docker network (separate project), routes by hostname
3. **This project** — all containers join the `proxy` network with `personal-profile-*` names

The centralized Caddy routes requests by hostname to the appropriate container:

```
@personalprofile host personal-profile.example.com
handle @personalprofile {
    reverse_proxy personal-profile-astro:80
}
```

### Startup Order

MySQL starts first with a healthcheck. Ghost waits for MySQL to be healthy before starting. Astro builds independently with mock data (future: will depend on Ghost for SSG content).

## Future: SSG Build Pipeline

When Static Site Generation with Ghost content is implemented:

```
DB ready → Ghost ready → Astro SSG build (fetches from Ghost Content API) → static output → served by Caddy
```

The Astro adapter code (`astro/src/lib/content/adapter.ts`) will swap from mock data to Ghost API calls. The Dockerfile and container setup won't change.

## Adding New Services

1. Create a subdirectory with its own `Dockerfile`, `Makefile`, and `CLAUDE.md`
2. Add the service to the root `docker-compose.yml` on the `proxy` network
3. Scope environment variables to the service's subdirectory
4. Add Makefile targets to the root `Makefile`
5. Add a route in the centralized Caddy project
6. Update this README
