#!/usr/bin/env bash
# Syncs resume content from the home-base repo into public/.
# Copies the markdown source AND builds a designed PDF via Typst.
# Usage: bash scripts/sync-resume.sh

set -euo pipefail

HOMEBASE="${HOME}/Projects/home-base"
DEST_DIR="$(dirname "$0")/../public"

# 1. Markdown copy (used by /resume page parser + .md download)
SOURCE_MD="${HOMEBASE}/personal/resume-base.md"
if [ -f "$SOURCE_MD" ]; then
  cp "$SOURCE_MD" "${DEST_DIR}/resume.md"
  echo "✓ Synced resume-base.md → public/resume.md"
else
  echo "⚠ No resume markdown found at ${SOURCE_MD} — skipping md sync"
fi

# 2. Typst PDF build (used by PDF download)
SOURCE_TYP="${HOMEBASE}/personal/resume-base.typ"
if command -v typst >/dev/null 2>&1; then
  if [ -f "$SOURCE_TYP" ]; then
    typst compile "$SOURCE_TYP" "${DEST_DIR}/resume.pdf" 2>/dev/null
    echo "✓ Built resume-base.typ → public/resume.pdf"
  else
    echo "⚠ No Typst source at ${SOURCE_TYP} — skipping PDF build"
  fi
else
  echo "⚠ typst not installed (brew install typst) — skipping PDF build"
fi

exit 0
