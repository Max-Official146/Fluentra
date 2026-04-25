#!/usr/bin/env bash
set -euo pipefail

echo "Checking local prerequisites..."

if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js is not installed. Install Node 18+ first."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "❌ npm is not installed."
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "❌ python3 is not installed (required for local static server)."
  exit 1
fi

echo "✅ Node: $(node --version)"
echo "✅ npm:  $(npm --version)"
echo "✅ python3: $(python3 --version)"

echo "All good. Run: npm run check && npm run start"
