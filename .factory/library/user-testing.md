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
