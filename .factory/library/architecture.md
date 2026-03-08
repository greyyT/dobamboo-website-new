# Architecture

Architectural decisions, patterns discovered, and conventions.

**What belongs here:** Architectural patterns, component conventions, data flow, rendering strategies.

---

- Next.js 15 App Router with `[locale]` segment for i18n
- Server components by default; `'use client'` only for interactivity
- `'use cache'` experimental directive for Prisma queries
- Views pattern: `src/views/<page-name>/index.tsx` as main export, sub-components alongside
- Services pattern: `src/services/<domain>/get-*.ts` for server Prisma queries, `fetch-*.ts` for client HTTP
- CMS-driven rendering: LandingPageView fetches items, switches on `type` to render block components
- Locale: `Intl` enum (lowercase `en`/`vi`) in routing, `Language` enum (uppercase `EN`/`VI`) in Prisma
- Conversion: `locale.toUpperCase() as Language`
