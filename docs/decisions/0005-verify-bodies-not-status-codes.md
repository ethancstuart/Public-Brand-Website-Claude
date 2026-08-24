# 0005 — Verify response bodies, never status codes

**Date:** 2026-08-22 · **Status:** accepted, enforced in CI

## Context
Production was declared shipped while `/` still served the previous release — a
stale ISR entry behind a perfectly healthy 200. It was caught by a human reading
the page, not by any check.

## Decision
Assert on **content**. `scripts/smoke.sh` fetches each page individually and
checks for required and forbidden strings. CI runs it after every production
deploy and daily.

## Why
A 200 proves a server answered, not that it answered with the build you shipped.

## Consequences
- Each URL is fetched separately on purpose: passing several to one `curl`
  concatenates the responses, and a string missing from one page is masked by
  another. That exact bug produced a false "verified".
- `/` declares `revalidate = false` — one fetch carrying `next: { revalidate }`
  turns the whole page into a stale-servable ISR entry. Do not add one.
- Related: local green is not reproducible green. `npm ci` was broken for a full
  session — an invalid lockfile dedupe — and went unnoticed because
  `node_modules` was already populated. CI caught it on its first run.
