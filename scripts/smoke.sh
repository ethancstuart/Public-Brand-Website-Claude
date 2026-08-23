#!/usr/bin/env bash
# Content smoke test against a running site.
#
#   bash scripts/smoke.sh https://ethancstuart.com
#   bash scripts/smoke.sh                            # defaults to localhost:3000
#
# This asserts on RESPONSE BODIES, not status codes. A 200 proves a server
# answered; it does not prove it answered with the build you just shipped. That
# distinction is the whole point of this script: `/` once served a stale ISR
# entry from the previous release while returning a perfectly healthy 200.
#
# Each URL is fetched and checked INDIVIDUALLY. Do not "optimise" this by
# passing several URLs to one curl — the responses concatenate, and a string
# missing from one page is masked by its presence in another.

set -uo pipefail

BASE="${1:-http://localhost:3000}"
FAILED=0

red()  { printf "\033[31m%s\033[0m\n" "$1"; }
green(){ printf "\033[32m%s\033[0m\n" "$1"; }

fetch() {
  # Cache-busting note: a query string does NOT bust Vercel's ISR cache for a
  # prerendered route, so it is not used here. Correctness comes from the page
  # being a static deployment artifact, which the build enforces.
  curl -fsSL --max-time 25 -H 'Cache-Control: no-cache' -H 'Pragma: no-cache' "$1" 2>/dev/null
}

# --- strings that must NEVER appear in public copy ---------------------------
# Deleted products, retired framing, and dead domains. If one of these shows up,
# either a stale build is being served or a regression reintroduced it.
FORBIDDEN=(
  "Meridian"
  "RidgeCap"
  "Quant Engine"
  "Sports ML"
  "Modeling Lab"
  "RE Stack"
  "eight products"
  "nexuswatch.io"
  "zerotoship.dev"
  "scale just changes"
  # Masthead was dropped as a planned product on 2026-08-23.
  "Masthead"
)

# Render HTML down to readable text: drop comments and tags (JSX splits
# `formerly {value}` with an HTML comment, so the raw markup never contains the
# phrase literally even though the reader sees it) and collapse whitespace.
as_text() {
  sed -e 's/<!--[^>]*-->//g' -e 's/<[^>]*>/ /g' <<<"$1" | tr -s '[:space:]' ' '
}

check_forbidden() {
  local url="$1" body
  body="$(fetch "$url")" || { red "FAIL  $url — could not fetch"; FAILED=1; return; }
  for s in "${FORBIDDEN[@]}"; do
    if grep -qiF -- "$s" <<<"$body"; then
      red "FAIL  $url — forbidden string present: \"$s\""
      FAILED=1
    fi
  done
}

# "Zero to Ship" is the former name of Prototype Studio. On the register
# listings it is allowed ONLY as the alias trail — never as a live product
# name. (On the case study itself the rename is the subject matter, so the name
# legitimately appears in the Formerly fact and in the pivot narrative.)
check_alias_only() {
  local url="$1" text total aliased
  text="$(as_text "$(fetch "$url")")" || { red "FAIL  $url — could not fetch"; FAILED=1; return; }
  total=$(grep -oiF -- "Zero to Ship" <<<"$text" | wc -l | tr -d ' ')
  aliased=$(grep -oiF -- "formerly Zero to Ship" <<<"$text" | wc -l | tr -d ' ')
  if [ "$total" != "$aliased" ]; then
    red "FAIL  $url — \"Zero to Ship\" appears $total time(s), only $aliased as an alias trail"
    FAILED=1
  fi
}

check_required() {
  local url="$1"; shift
  local body
  body="$(fetch "$url")" || { red "FAIL  $url — could not fetch"; FAILED=1; return; }
  for s in "$@"; do
    if ! grep -qiF -- "$s" <<<"$body"; then
      red "FAIL  $url — required string MISSING: \"$s\""
      FAILED=1
    fi
  done
}

check_status() {
  local url="$1" want="$2" got
  got=$(curl -s -o /dev/null -w '%{http_code}' --max-time 25 "$url")
  if [ "$got" != "$want" ]; then
    red "FAIL  $url — expected $want, got $got"
    FAILED=1
  fi
}

echo "Smoke testing $BASE (content, not status codes)"
echo

PAGES=(/ /about /portfolio /writing /resume /contact
       /portfolio/allisons-kitchen /portfolio/nexuswatch /portfolio/altogether
       /portfolio/gridiron /portfolio/the-composer /portfolio/product-os
       /portfolio/zero-to-ship)

for p in "${PAGES[@]}"; do check_forbidden "$BASE$p"; done

# The register listings must never present the old name as current.
check_alias_only "$BASE/"
check_alias_only "$BASE/portfolio"

# The renamed product's own page must lead with the current name.
if ! grep -qiF "Prototype Studio" <<<"$(as_text "$(fetch "$BASE/portfolio/zero-to-ship")")"; then
  red "FAIL  $BASE/portfolio/zero-to-ship — does not name Prototype Studio"
  FAILED=1
fi

# The home page must actually be the register — this is what a status code check
# cannot tell you, and what let a stale `/` go unnoticed.
check_required "$BASE/" \
  "I run an AI-native product organization" \
  "How the work gets made" \
  "Operating record" \
  "Allison" \
  "Prototype Studio"

check_required "$BASE/portfolio" \
  "Allison" "NexusWatch" "Altogether" "Gridiron" "Composer" "Product OS" "Prototype Studio"

# Retired products redirect rather than dead-end; unknown slugs are real 404s.
for s in meridian ridgecap quant-engine sports-ml; do
  check_status "$BASE/portfolio/$s" 308
done
check_status "$BASE/portfolio/definitely-not-a-project" 404

echo
if [ "$FAILED" -eq 0 ]; then
  green "PASS — all pages serve the current build, no dead facts present."
else
  red "SMOKE TEST FAILED"
  exit 1
fi
