# User Testing

Testing surface: tools, URLs, setup steps, isolation notes, known quirks.

**What belongs here:** How to manually test the application, entry points, tools, known issues.

---

## Testing Surface

- **Dev server**: `PORT=3100 yarn dev` → http://localhost:3100
- **Home page redirect**: `/` redirects to `/en` (i18n middleware)
- **Tools**: curl for HTTP checks, agent-browser for visual verification
- **Custom view pages**: Navigate to `/en/<slug>` or `/vi/<slug>` where `<slug>` matches a CustomView in MongoDB
- **Fallback**: If no custom view data exists in DB, the slug route falls back to product lookup, then 404

## Known Quirks

- Port 3000 is occupied by another project; always use port 3100
- No test framework configured; validation relies on `yarn build` + `yarn lint`
- Build generates ~157 static pages; takes ~28s

## Custom-View Milestone Fixtures (session 353a918a)

- `ut-cv-full-353a918a`: Full-page custom view with all 5 block types and EN/VI translations.
- `ut-cv-edge-353a918a`: Edge-case custom view (empty background image, right-position image-text, empty icon URL, empty bottom image, empty text, empty icon-row items).
- `ut-cv-empty-items-353a918a`: Custom view with zero items.
- `ut-cv-missing-en-353a918a`: Item missing EN translation (VI-only) for fallback testing.
- `ut-product-only-353a918a`: Product fixture (no custom view with same slug) for product fallback route check.
- `ut-shared-slug-353a918a`: Product + custom view share slug for precedence check.

## Flow Validator Guidance: Web UI

- Use `agent-browser` for user-surface assertions and `curl` for quick HTTP/status checks.
- Base URL: `http://localhost:3100`.
- Use only fixture slugs under session namespace `353a918a`; do not alter non-fixture records.
- Read-only interactions only (navigation, locale switching, visual/DOM checks).
- Record exact page URLs and observed text snippets in each flow report.

## Flow Validator Guidance: Command Validation

- For infra assertions, run only project validators (`npx prisma generate`, `yarn build`, `yarn lint`) from repo root.
- Do not modify source code or config during validation.
- Capture exit codes and relevant output excerpts in flow reports.
