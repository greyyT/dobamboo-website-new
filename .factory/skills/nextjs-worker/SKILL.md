---
name: nextjs-worker
description: Implements Next.js features including Prisma schema, server components, services, and routing
---

# Next.js Worker

NOTE: Startup and cleanup are handled by `worker-base`. This skill defines the WORK PROCEDURE.

## When to Use This Skill

Use for features involving:
- Prisma schema changes and client generation
- TypeScript type definitions
- Server-side data services (`src/services/`)
- React server/client components (`src/views/`, `src/components/`)
- Next.js App Router pages and routing

## Work Procedure

1. **Read the feature description carefully.** Understand what needs to be built, the preconditions, expected behavior, and verification steps.

2. **Read AGENTS.md** for mission boundaries and coding conventions. Read `.factory/services.yaml` for commands. Read `.factory/library/` for any accumulated knowledge.

3. **Explore existing patterns.** Before writing code, read at least one analogous file for each type of file you'll create:
   - For Prisma models: read `prisma/schema.prisma`
   - For types: read an existing file in `src/types/` (e.g., `landing-page-item-data.ts`)
   - For services: read an existing file in `src/services/` (e.g., `landing-page/get-all-landing-page-items.tsx`)
   - For views: read `src/views/landing-page/` (CMS-driven rendering pattern)
   - For pages: read `src/app/[locale]/(main)/[slug]/page.tsx`
   Match the exact patterns you find.

4. **Implement the feature.** Follow these conventions strictly:
   - Files: kebab-case (`background-title-block.tsx`)
   - Components: PascalCase default exports
   - Interfaces: `I` prefix (`ICustomViewPageProps`)
   - Server components by default; only add `'use client'` when hooks/interactivity needed
   - Use `'use cache'` for Prisma query services
   - Use `cn()` from `@/lib/utils` for conditional classes
   - Use `next/image` for all images (with `fill` and `className="object-cover"`)
   - Use Tailwind utilities directly, custom tokens from `globals.css` for brand styling
   - Locale: convert with `locale.toUpperCase() as Language`
   - Imports: follow `simple-import-sort` order (externals → `@/` aliases → relative)

5. **If modifying Prisma schema:** Run `npx prisma generate` after changes and verify it succeeds.

6. **Run verification:**
   - `yarn build` — must pass (typecheck + compilation + SSG)
   - `yarn lint` — must pass
   - Fix any errors before completing.

7. **Manual verification:** If the feature involves visual components, start the dev server (`PORT=3100 yarn dev`), use curl or agent-browser to verify the page loads. If no data exists in the DB, verify the fallback/404 behavior. Kill the dev server after testing.

8. **Prepare handoff.** Be specific about what was implemented, commands run, and observations.

## Example Handoff

```json
{
  "salientSummary": "Added Prisma CustomView models, created 5 block components in src/views/custom-view-page/, and updated [slug] route to check custom views first. yarn build passed (0 errors), yarn lint passed. Verified via curl that unknown slugs still 404.",
  "whatWasImplemented": "Created CustomView/CustomViewItem/CustomViewItemTranslation Prisma models with CustomLayoutItemType enum. Added TypeScript types in src/types/custom-view.ts. Created server service src/services/custom-view/get-custom-view-by-slug.ts with 'use cache'. Built 5 block components (BackgroundTitleBlock, ImageTextBlock, IconTextRowBlock, BottomImageTextBlock, TextBlock) in src/views/custom-view-page/components/. Created CustomViewPage renderer in src/views/custom-view-page/index.tsx. Updated src/app/[locale]/(main)/[slug]/page.tsx to try custom view lookup before product lookup.",
  "whatWasLeftUndone": "",
  "verification": {
    "commandsRun": [
      { "command": "npx prisma generate", "exitCode": 0, "observation": "Prisma client generated successfully with new CustomView models" },
      { "command": "yarn build", "exitCode": 0, "observation": "Build completed in 28s, 159 pages generated, 0 type errors" },
      { "command": "yarn lint", "exitCode": 0, "observation": "No lint errors" }
    ],
    "interactiveChecks": [
      { "action": "curl http://localhost:3100/en/nonexistent-slug", "observed": "Received 404 page as expected for slug matching neither custom view nor product" }
    ]
  },
  "tests": { "added": [] },
  "discoveredIssues": []
}
```

## When to Return to Orchestrator

- Prisma schema conflicts with existing models
- The `[slug]` route has unexpected logic that makes custom view integration non-trivial
- Build fails due to issues outside the feature scope
- Missing environment variables or database connectivity issues
- Image remote patterns need updating in `next.config.ts`
