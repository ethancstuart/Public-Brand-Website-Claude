#!/usr/bin/env bash
# Syncs resume-base.md from the home-base repo into public/resume.md
# Run manually or as part of the build process.
# Usage: bash scripts/sync-resume.sh

set -euo pipefail

HOMEBASE="${HOME}/Projects/home-base"
SOURCE="${HOMEBASE}/personal/resume-base.md"
DEST="$(dirname "$0")/../public/resume.md"

if [ ! -f "$SOURCE" ]; then
  echo "⚠ home-base resume not found at ${SOURCE} — skipping sync"
  exit 0
fi

cp "$SOURCE" "$DEST"
echo "✓ Synced resume-base.md → public/resume.md"
