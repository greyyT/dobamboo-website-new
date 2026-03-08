# Environment

Environment variables, external dependencies, and setup notes.

**What belongs here:** Required env vars, external API keys/services, dependency quirks, platform-specific notes.
**What does NOT belong here:** Service ports/commands (use `.factory/services.yaml`).

---

- DATABASE_URL: MongoDB connection string (required)
- NOTION_API_KEY, NOTION_DATABASE_ID: Notion blog integration (required)
- NEXT_PUBLIC_EMAILJS_*: EmailJS for contact form (required)
- Node 22.x, Yarn 1.22.x
- Port 3000 is occupied by another project; use port 3100 for dev server
