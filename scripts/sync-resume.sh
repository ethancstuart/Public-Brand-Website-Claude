#!/usr/bin/env bash
# Syncs resume from the home-base repo into public/
# Run manually or as part of the build process.
# Usage: bash scripts/sync-resume.sh

set -euo pipefail

HOMEBASE="${HOME}/Projects/home-base"
DEST_DIR="$(dirname "$0")/../public"

SOURCE="${HOMEBASE}/personal/resume-base.md"
if [ -f "$SOURCE" ]; then
  cp "$SOURCE" "${DEST_DIR}/resume.md"
  echo "✓ Synced resume-base.md → public/resume.md"
else
  echo "⚠ No resume found at ${SOURCE} — skipping sync"
fi

exit 0
