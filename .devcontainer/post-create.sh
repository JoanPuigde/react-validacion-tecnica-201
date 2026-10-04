#!/usr/bin/env bash
set -euo pipefail

sudo apt-get update
sudo apt-get install -y --no-install-recommends \
  libgtk-3-0 \
  libgbm1 \
  libnotify4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libpango-1.0-0 \
  libcairo2 \
  libcups2 \
  libxshmfence1

cd bandeja
npm ci
npx cypress install
