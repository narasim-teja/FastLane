.PHONY: build
build: ## Build the production docker image.
	bunx @turbo/workspaces@latest convert ./ pnpm
	docker compose build
	bunx @turbo/workspaces@latest convert ./ bun

.PHONY: start
start: ## Start the production docker container.
	docker compose up -d

.PHONY: stop
stop: ## Stop the production docker container.
	docker compose down