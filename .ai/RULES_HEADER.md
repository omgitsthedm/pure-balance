# Pure Balance AI-Ops Rules Header

Project Code:

LFNYC-PB

Project Name:

Pure Balance Holistic Veterinary Services

Business Line:

Client Projects under Little Fight NYC

Tier:

Tier 2 — static marketing site with a live Netlify lead form

Risk:

Low — holistic veterinary practice (by appointment only). No payments, no regulated lending; a real `/contact` Netlify lead form is the only transactional surface.

Canonical Path:

/Users/davidmarsh/Desktop/LiFi NYC/Clients/Pure Balance/pure-balance

Remote:

https://github.com/omgitsthedm/pure-balance.git  (default branch: `master`)

Host:

Netlify — project `pure-balance`. **Static site, `publish = "."`** (whole repo root), no build. Netlify Forms enabled. Internal files blocked from public serving via forced `/CLAUDE.md`, `/AGENTS.md`, `/.ai/*` → 404 redirects.

Live URL:

`https://pure-balance.netlify.app` (Netlify primary; canonical `https://purebalancevet.com` — custom domain)

Stack:

Static HTML/CSS/JS (9 pages: home, about, what-we-treat, pricing, faq, book, contact, privacy, terms). No framework, no build step, no `package.json`. `book` page is email/by-appointment (no embedded booking widget); `contact` uses a Netlify form (honeypot).

## Commands

- Dev / preview: serve the folder statically (e.g. `npx serve .` or Netlify dev); no build needed.
- Build: none (`publish = "."`, static).
- Lint/format: none defined.
- Deploy: `git push origin master` → Netlify auto-publishes (push = production deploy → gated by `APPROVE LIVE CHANGE`).

## Locked Rules

- Live client site — treat as production. Branch is `master` (not main).
- `/contact` is a real Netlify lead form — do not submit test leads against production.
- LiFi brand standards apply (orange `#FE5800` agency brand; site palette in CLAUDE.md). LiFi footer present.
- **Never publish prices** as hard commitments — keep pricing copy to what the client has approved (a `pricing` page exists; treat its figures as client-owned, do not invent/alter without approval).
- Images `.webp` + explicit `width`/`height` + lazy-load below fold.
- Mobile-first, WCAG AA contrast, body text 16px+, respect `prefers-reduced-motion`.
- `git push` (to `master`) = production deploy → gated. `.env`/secrets never read.
- `.ai/`, `CLAUDE.md`, `AGENTS.md` stay private via the forced `→ 404` redirects — do not remove them.

## Pure Balance QA Harness Map

Observational (agent may run): `git status/log`, read source/config, static local serve, public GET to purebalancevet.com / pure-balance.netlify.app, read-only Netlify deploy metadata.

Transactional/gated (David-run / approved): `git push`/Netlify deploy; real `/contact` lead submissions; changes to pricing/medical-service copy; DNS/domain/env changes.
