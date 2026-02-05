# -------------------------------------------------------------------
# NOTE: Prefer using the root Makefile for unified orchestration.
#       Run `make up` or `make dev` from the project root.
#       This file is preserved for standalone Ghost development.
# -------------------------------------------------------------------
# -------------------------------------------------------------------
# REQUIRED: Base name for this Ghost instance.
# This must match the prefix used in docker-compose.yml.
# -------------------------------------------------------------------
INSTANCE_NAME = personal-profile

DOCKER_COMPOSE ?= docker compose

.PHONY: up down rebuild logs ps db ghost

# Start only the database
db:
	$(DOCKER_COMPOSE) up -d $(INSTANCE_NAME)-db

# Start only Ghost (assumes DB is already up)
ghost:
	$(DOCKER_COMPOSE) up -d $(INSTANCE_NAME)-ghost

# Full sequence: DB first, pause, then Ghost
up:
	$(DOCKER_COMPOSE) up -d $(INSTANCE_NAME)-db
	@echo "Database started. Press Enter to start Ghost..."
	@read _
	$(DOCKER_COMPOSE) up -d $(INSTANCE_NAME)-ghost

down:
	$(DOCKER_COMPOSE) down

rebuild:
	$(DOCKER_COMPOSE) up --build -d

logs:
	$(DOCKER_COMPOSE) logs -f

ps:
	$(DOCKER_COMPOSE) ps