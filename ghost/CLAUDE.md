# CLAUDE.md — Ghost CMS

Guidance for Claude Code when working in the `ghost/` directory.

## Overview

Ghost CMS instance backed by MySQL, running in Docker. Serves as the headless content management system for the personal profile site. Ghost Admin provides the authoring UI; the Content API provides read access for the Astro frontend's SSG builds.

## Docker Setup

Two services:
- **`personal-profile-ghost`** — `ghost:5-alpine`, exposes port 2368 internally
- **`personal-profile-db`** — `mysql:8`, exposes port 3306 internally

The root `docker-compose.yml` is the primary orchestration file. The local `docker-compose.yml` in this directory is preserved for reference but deprecated.

## Environment Variables

Defined in `ghost/.env` (copy from `.env.example`):

| Variable | Purpose |
|----------|---------|
| `GHOST_URL` | Public URL of Ghost (used for link generation) |
| `MYSQL_ROOT_PASSWORD` | MySQL root password |
| `MYSQL_USER` | MySQL application user |
| `MYSQL_PASSWORD` | MySQL application password |
| `MYSQL_DATABASE` | MySQL database name |

## Makefile Commands (Standalone)

These work from within the `ghost/` directory for isolated Ghost development. Prefer the root Makefile for normal workflow.

```bash
make db       # Start database only
make ghost    # Start Ghost only (assumes DB is running)
make up       # Full sequence: DB first, pause, then Ghost
make down     # Stop all services
make rebuild  # Rebuild with --build flag
make logs     # Follow logs
make ps       # Show running containers
```

## Volumes

| Host Path | Container Path | Purpose |
|-----------|---------------|---------|
| `./content` | `/var/lib/ghost/content` | Ghost content (uploads, settings, etc.) |
| `./themes` | `/var/lib/ghost/content/themes` | Ghost themes |
| `./data/mysql` | `/var/lib/mysql` | MySQL data persistence |

Content and MySQL data are gitignored. Themes are tracked.

## Startup Order

MySQL must be fully ready before Ghost starts — Ghost will fail if the database isn't accepting connections. The root docker-compose handles this via a MySQL healthcheck with `condition: service_healthy`. The local Makefile uses a manual pause as a fallback.

## Ghost Admin & Content API

- **Admin UI**: `http://localhost:8080/ghost` (dev mode)
- **Content API**: `http://personal-profile-ghost:2368/ghost/api/content/` (internal, used by Astro at build time)
- Content API requires an API key (configured in Ghost Admin under Integrations)

## Roadmap

- [ ] **Initial content setup** — Create first articles, configure site metadata, set up custom integration for Content API key
- [ ] **Theme customization** — Evaluate whether a custom Ghost theme is needed or if Ghost is used purely as headless CMS
- [ ] **Content modeling** — Define tag taxonomy, author setup, and content structure that maps to Astro's `ContentItem` type
- [ ] **API configuration** — Set up the custom integration and Content API key for Astro SSG builds
- [ ] **Backup strategy** — Automated Ghost content and MySQL data backups
