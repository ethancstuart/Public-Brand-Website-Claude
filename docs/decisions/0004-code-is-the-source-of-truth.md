# 0004 — Code is the source of truth; everything else is a projection

**Date:** 2026-08-22, extended 2026-08-23 · **Status:** accepted

## Context
Facts about the products lived in Notion, in this repo, in ten resume files, and
later in Figma. Sessions booted from Notion and wrote stale context into
production — dead product names and a domain pointing at another company.

## Decision
This repo is canonical. Notion is deprecated and must not be read for facts.
Figma **mirrors** code and is regenerated on token change — never hand-edited,
never synced back.

## Why
Every additional writable copy is a future contradiction. The cost is not the
copy; it is that nobody knows which one is right.

## Consequences
- Session start is: read CLAUDE.md → `git log` → ask. No Notion.
- One Figma file for the site system (`kI3fVPePZ7fDxSMjKLBeyN`). A second file
  appeared on 2026-08-23 mirroring the same tokens; merged and retired.
- `public/resume.md` and `.pdf` are build artifacts, but **Vercel cannot reach
  home-base**, so the committed copies are what ship. Fixing the source alone
  changes nothing in production.
