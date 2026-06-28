# Pure Balance AI-Ops State

## Identity

- Project Code: LFNYC-PB
- Name: Pure Balance Holistic Veterinary Services
- Tier: Tier 2 · Risk: Low (static marketing + Netlify contact form)
- Canonical Path: /Users/davidmarsh/Desktop/LiFi NYC/Clients/Pure Balance/pure-balance
- Git-backed: yes · Remote: https://github.com/omgitsthedm/pure-balance.git · Default branch: `master`

## Current Stamp

- Updated: 2026-06-28
- Updated By: Claude
- Basis: AI-Ops onboarding (handoff-ready). Read-only scope.
- Git HEAD at onboarding: b7d10ee4

## Rules Version

- 2026-06-27-aiops-foundation-v1

## State Confidence

- High for path/repo/branch/remote/stack/commands. Live: Netlify primary `pure-balance.netlify.app`; canonical `purebalancevet.com` (custom domain per repo meta).

## Current Live Truth

- Live URL: `https://pure-balance.netlify.app` (Netlify primary); canonical `https://purebalancevet.com`. Project `pure-balance`, Netlify Forms enabled. Static `publish = "."`, no build.
- Internal files blocked from serving via forced `/CLAUDE.md`, `/AGENTS.md`, `/.ai/*` → 404 redirects.
- Production QA status: not run by AI-Ops.

## Repo State

- Branch `master`, in sync with origin at onboarding; clean working tree.
- `_redirects` provides clean-URL 200 rewrites; netlify.toml has clean-URL 301s + security headers.

## Risk / Compliance

- Veterinary practice; no payments/regulated lending. Pricing page figures are client-owned — do not invent/alter without approval. `/contact` = real Netlify lead form; real submissions are transactional.

## QA-PENDING

- Confirm forced 404 redirects catch `/.ai/*` on live (verify `/.ai/STATE.md` → 404 after next deploy).
- Confirm `purebalancevet.com` custom domain is primary/live.

## Do Not Touch

- `.env`/secrets; pricing/medical-service copy without approval.
- The forced `→ 404` redirects (keep internal docs private).
- `git push` to `master` (= production deploy) without `APPROVE LIVE CHANGE`.

## Proposed Changes / Inbox

- None yet.

## Next Steps Queue

- Verify `.ai/*.md` returns 404 on live after this onboarding deploy.

## Recent Session History

- 2026-06-28: Claude onboarded Pure Balance to AI-Ops (handoff-ready). Created `.ai/{LOCK,RULES_HEADER,RULES,STATE}.md` + AGENTS pointer; created repo-level CLAUDE.md (Commands + pointer); added forced `/CLAUDE.md` + `/AGENTS.md` + `/.ai/*` → 404 redirects to netlify.toml. No source/content change. Static site, branch `master`.

## Next Agent Directive

Read `.ai/RULES.md` + `.ai/STATE.md` + `CLAUDE.md` first. Static vet marketing site on `master`. `git push` to `master` = production deploy (gated). Real `/contact` leads are transactional. Pricing copy is client-owned. Keep the forced `→ 404` redirects. Don't read `.env`/secrets.

## Emergency / Bypass Notes

- No bypass for deploy/push/lead-form/production mutations.
- Bypass/YOLO is only an execution accelerator for approved local setup and read-only verification.
- Emergency mode: stop, preserve evidence, smallest reversible action.
