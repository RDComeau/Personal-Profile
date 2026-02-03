# Makefile for Astro project

# Use bash for nicer behavior
SHELL := /bin/bash

# Default target
.DEFAULT_GOAL := help

# Variables
YARN ?= yarn

# Colors (optional)
GREEN := \033[0;32m
NC := \033[0m

.PHONY: help install dev build preview clean lint fmt

help:
	@echo "Astro project Makefile"
	@echo
	@echo "Targets:"
	@echo "  install   Install npm dependencies"
	@echo "  dev       Run dev server (npm run dev)"
	@echo "  build     Build site for production (npm run build)"
	@echo "  preview   Preview built site (npm run preview)"
	@echo "  clean     Remove build artifacts (dist/)"
	@echo
	@echo "Usage:"
	@echo "  make dev"
	@echo "  make build"
	@echo "  make preview"

install:
	@echo -e "$(GREEN)[install] Installing dependencies...$(NC)"
	$(YARN) install

dev: install
	@echo -e "$(GREEN)[dev] Starting Astro dev server...$(NC)"
	$(YARN) run dev

build: install
	@echo -e "$(GREEN)[build] Building Astro project...$(NC)"
	$(YARN) run build

preview: install
	@echo -e "$(GREEN)[preview] Previewing build...$(NC)"
	$(YARN) run preview

clean:
	@echo -e "$(GREEN)[clean] Removing dist/ directory...$(NC)"
	rm -rf dist
