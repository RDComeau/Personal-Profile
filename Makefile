# Root Makefile — Personal Profile orchestration
# Manages all services from the project root.

SHELL := /bin/bash
.DEFAULT_GOAL := help

DOCKER_COMPOSE ?= docker compose --env-file ./ghost/.env
# Production: explicitly use only docker-compose.yml (no override, no exposed ports)
DOCKER_COMPOSE_PROD = $(DOCKER_COMPOSE) -f docker-compose.yml

# Colors
GREEN  := \033[0;32m
YELLOW := \033[0;33m
NC     := \033[0m

.PHONY: help dev dev-astro dev-ghost up down build rebuild \
        logs logs-astro logs-ghost logs-db ps clean \
        deploy-local init-deploy

# ──────────────────────────────────────────────
# Help
# ──────────────────────────────────────────────

help:
	@echo ""
	@echo -e "$(GREEN)Personal Profile$(NC) — Makefile targets"
	@echo ""
	@echo "  Development (Astro local + Ghost in Docker):"
	@echo "    dev              Start Astro dev server + Ghost/DB in Docker"
	@echo "    dev-astro        Start Astro dev server only (localhost:4321)"
	@echo "    dev-ghost        Start Ghost + DB in Docker (localhost:8080)"
	@echo ""
	@echo "  Production (all services in Docker):"
	@echo "    up               Build and start all services"
	@echo "    down             Stop and remove all containers"
	@echo "    build            Build all Docker images"
	@echo "    rebuild          Force rebuild all images (no cache)"
	@echo ""
	@echo "  Observability:"
	@echo "    logs             Follow logs for all services"
	@echo "    logs-astro       Follow Astro logs"
	@echo "    logs-ghost       Follow Ghost logs"
	@echo "    logs-db          Follow DB logs"
	@echo "    ps               List running containers"
	@echo ""
	@echo "  Maintenance:"
	@echo "    clean            Remove build artifacts and stopped containers"
	@echo ""
	@echo "  Deployment:"
	@echo "    init-deploy      Create deploy directory (run once on homelab)"
	@echo "    deploy-local     Build Astro and deploy to local directory"
	@echo "    restart-astro    Restart Astro container after deploy"
	@echo ""

# ──────────────────────────────────────────────
# Development
# ──────────────────────────────────────────────

dev: dev-ghost dev-astro

dev-astro:
	@echo -e "$(GREEN)[dev-astro]$(NC) Starting Astro dev server..."
	$(MAKE) -C astro dev

dev-ghost:
	@echo -e "$(GREEN)[dev-ghost]$(NC) Starting Ghost + DB in Docker..."
	$(DOCKER_COMPOSE) up -d personal-profile-ghost personal-profile-db

# ──────────────────────────────────────────────
# Production
# ──────────────────────────────────────────────

up:
	@echo -e "$(GREEN)[up]$(NC) Building and starting all services..."
	$(DOCKER_COMPOSE_PROD) up --build -d

down:
	@echo -e "$(GREEN)[down]$(NC) Stopping all services..."
	$(DOCKER_COMPOSE_PROD) down

build:
	@echo -e "$(GREEN)[build]$(NC) Building all Docker images..."
	$(DOCKER_COMPOSE_PROD) build

rebuild:
	@echo -e "$(GREEN)[rebuild]$(NC) Force rebuilding all Docker images..."
	$(DOCKER_COMPOSE_PROD) build --no-cache

# ──────────────────────────────────────────────
# Observability
# ──────────────────────────────────────────────

logs:
	$(DOCKER_COMPOSE) logs -f

logs-astro:
	$(DOCKER_COMPOSE) logs -f personal-profile-astro

logs-ghost:
	$(DOCKER_COMPOSE) logs -f personal-profile-ghost

logs-db:
	$(DOCKER_COMPOSE) logs -f personal-profile-db

ps:
	$(DOCKER_COMPOSE) ps

# ──────────────────────────────────────────────
# Maintenance
# ──────────────────────────────────────────────

clean:
	@echo -e "$(GREEN)[clean]$(NC) Removing build artifacts and stopped containers..."
	$(DOCKER_COMPOSE_PROD) down --remove-orphans
	$(MAKE) -C astro clean

# ──────────────────────────────────────────────
# Deployment
# ──────────────────────────────────────────────

# Initialize deploy directory (run once on homelab)
init-deploy:
	@echo -e "$(GREEN)[init-deploy]$(NC) Creating deploy directory..."
	mkdir -p ./deploy/astro
	@echo "Deploy directory created at ./deploy/astro"
	@echo "Set ASTRO_DIST_PATH in environment if using a different location"

# Local deploy (build + copy to deploy dir)
deploy-local:
	@echo -e "$(GREEN)[deploy-local]$(NC) Building and deploying locally..."
	$(MAKE) -C astro build
	@echo -e "$(GREEN)[deploy-local]$(NC) Copying to deploy directory..."
	mkdir -p ./deploy/astro
	rsync -av --delete astro/dist/ ./deploy/astro/
	@echo -e "$(GREEN)[deploy-local]$(NC) Done. Restart Astro container if needed: make restart-astro"

restart-astro:
	@echo -e "$(GREEN)[restart-astro]$(NC) Restarting Astro container..."
	$(DOCKER_COMPOSE_PROD) restart personal-profile-astro
