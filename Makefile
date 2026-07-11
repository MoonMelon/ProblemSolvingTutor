.PHONY: dev build preview install clean

# Start development server (requires Node 20+; uses nvm if available)
dev:
	@if command -v nvm >/dev/null 2>&1 || [ -s "$$HOME/.nvm/nvm.sh" ]; then \
		. "$$HOME/.nvm/nvm.sh" && nvm use 22 --silent && npm run dev; \
	else \
		npm run dev; \
	fi

# Production build
build:
	@if command -v nvm >/dev/null 2>&1 || [ -s "$$HOME/.nvm/nvm.sh" ]; then \
		. "$$HOME/.nvm/nvm.sh" && nvm use 22 --silent && npm run build; \
	else \
		npm run build; \
	fi

# Preview the production build locally
preview: build
	@if command -v nvm >/dev/null 2>&1 || [ -s "$$HOME/.nvm/nvm.sh" ]; then \
		. "$$HOME/.nvm/nvm.sh" && nvm use 22 --silent && npm run preview; \
	else \
		npm run preview; \
	fi

# Install dependencies
install:
	npm install

# Remove node_modules and build output
clean:
	rm -rf node_modules dist
