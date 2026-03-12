#!/usr/bin/env bash
# Syncs resume variants from the home-base repo into public/
# Run manually or as part of the build process.
# Usage: bash scripts/sync-resume.sh

set -euo pipefail

HOMEBASE="${HOME}/Projects/home-base"
DEST_DIR="$(dirname "$0")/../public"

VARIANTS=("base" "ai-product" "data-platform" "internal")

synced=0

for variant in "${VARIANTS[@]}"; do
  SOURCE="${HOMEBASE}/personal/resume-${variant}.md"
  if [ -f "$SOURCE" ]; then
    cp "$SOURCE" "${DEST_DIR}/resume-${variant}.md"
    echo "✓ Synced resume-${variant}.md"
    synced=$((synced + 1))
  fi
done

# Copy base as default resume.md for backward compatibility
BASE_SOURCE="${HOMEBASE}/personal/resume-base.md"
if [ -f "$BASE_SOURCE" ]; then
  cp "$BASE_SOURCE" "${DEST_DIR}/resume.md"
  echo "✓ Synced resume-base.md → public/resume.md"
fi

if [ $synced -eq 0 ]; then
  echo "⚠ No resume variants found in ${HOMEBASE}/personal/ — skipping sync"
fi

exit 0
