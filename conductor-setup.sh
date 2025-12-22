#!/bin/bash

# Install dependencies
bun install

# Copy .env.local from repo root if it exists
if [ -f "$CONDUCTOR_ROOT_PATH/.env.local" ]; then
    cp "$CONDUCTOR_ROOT_PATH/.env.local" .env.local
    echo "Copied .env.local from repo root"
else
    echo "Warning: No .env.local found at $CONDUCTOR_ROOT_PATH/.env.local"
    echo "Please create one based on .env.example"
fi
