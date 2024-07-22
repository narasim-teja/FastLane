.PHONY: build
build: ## Build the production docker image.
	docker compose build

.PHONY: start
start: ## Start the production docker container.
	docker compose up -d

.PHONY: stop
stop: ## Stop the production docker container.
	docker compose down

.PHONY: logs
logs: ## Show the logs of the production docker container.
	docker compose logs -f

.PHONY: push
push: ## Push the production docker image to the registry.
	docker compose push