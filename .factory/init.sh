#!/bin/bash
set -e

cd /Users/nhan.nguyen/Documents/dobamboo-website-new

# Install dependencies (idempotent)
yarn install --frozen-lockfile 2>/dev/null || yarn install

# Generate Prisma client
npx prisma generate
