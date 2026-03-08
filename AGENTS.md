# AGENTS.md

An e-commerce website for bamboo products. Bilingual (EN/VI), CMS-driven landing page, Notion-powered blog, MongoDB via Prisma.

## Stack

- **Framework**: Next.js 15 (App Router, Turbopack dev, `use cache` experimental)
- **React**: 19
- **Language**: TypeScript (strict mode, `@/*` path alias → `./src/*`)
- **Styling**: Tailwind CSS v4 (PostCSS plugin, no `tailwind.config` file — config lives in `globals.css`)
- **UI library**: shadcn/ui (new-york style, neutral base, CSS variables, Radix primitives)
- **State**: Zustand (global UI like dialogs), TanStack Query v5 (server state)
- **i18n**: next-intl v3 (locales: `en`, `vi`; default: `en`)
- **Database**: MongoDB via Prisma (`@prisma/client`)
- **Blog CMS**: Notion API (`@notionhq/client`)
- **Forms**: react-hook-form + Zod + EmailJS
- **Carousels**: Swiper (landing page), Embla (product detail, shadcn carousel)
- **Icons**: lucide-react
- **Font**: Raleway (self-hosted TTF in `src/fonts/`, loaded via `@font-face` in `globals.css`)
- **Package manager**: Yarn (enforced in `engines`)
- **Node**: 22.x (enforced in `engines`)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # i18n locale segment
│   │   ├── layout.tsx      # Root layout (providers, metadata)
│   │   └── (main)/         # Main layout group (navbar + footer)
│   │       ├── layout.tsx
│   │       ├── page.tsx                    # / → LandingPageView
│   │       ├── [slug]/page.tsx             # /:slug → ProductDetailPage
│   │       ├── product/[[...slug]]/page.tsx # /product/[category]/[sub]
│   │       ├── about-us/page.tsx
│   │       ├── contact/page.tsx
│   │       ├── blog/page.tsx
│   │       ├── blog/[slug]/page.tsx
│   │       └── not-found/page.tsx
│   ├── api/                # API routes
│   │   ├── products/       # GET (list), POST (create)
│   │   ├── products/count/ # GET product count
│   │   ├── products/search/# GET search (q param)
│   │   ├── intls/          # POST create i18n entry
│   │   └── revalidate/     # GET cache revalidation
│   └── globals.css         # Tailwind config, theme tokens, fonts
├── components/
│   ├── ui/                 # shadcn/ui primitives (DO NOT hand-edit)
│   ├── dialogs/            # App dialogs (managed via Zustand)
│   ├── screen.tsx          # Content width wrapper (max-w-screen-xl)
│   ├── will-mount.tsx      # Lazy mount wrapper
│   └── will-render.tsx     # Conditional render (If/Else pattern)
├── configs/                # API keys, Notion config
├── constants/              # Enums and static values
├── hooks/                  # Custom React hooks
│   ├── products/           # useGetProductsFromCategory, useSearchProducts
│   ├── use-search-query.ts # URL search param manipulation
│   └── utils/              # useCustomLodashDebounce
├── i18n/                   # next-intl routing, navigation, request config
├── lib/
│   ├── db.ts               # Prisma singleton
│   └── utils.ts            # cn() (clsx + tailwind-merge)
├── middleware.ts            # next-intl locale middleware
├── provider/               # React context/providers
│   ├── dialog-provider.tsx  # Zustand dialog store + DialogProvider
│   ├── intl-provider.tsx    # NextIntlClientProvider wrapper
│   └── query-provider.tsx   # TanStack QueryClientProvider
├── services/               # Data fetching (server-side)
│   ├── category/           # get-all-categories, get-featured-categories
│   ├── product/            # get-*, fetch-* (server vs client fetchers)
│   ├── landing-page/       # get-all-landing-page-items
│   ├── i18n/               # get-all-intl (DB translations)
│   └── notion.ts           # Blog: getBlogPosts, getBlogBySlug, getPageContent
├── types/                  # TypeScript interfaces and types
├── utils/                  # Pure utility functions (formatter.ts)
├── views/                  # Page-level view components
│   ├── landing-page/       # Landing page sections
│   ├── product-showcase-page/ # Product listing with sidebar + pagination
│   ├── product-detail-page/   # Single product view
│   ├── about-us-page/      # Overview + Our Story tabs
│   ├── contact-page/       # Contact form + socials
│   ├── blog-list-page/     # Blog listing
│   ├── blog-detail-page/   # Single blog post (Notion-rendered)
│   └── layouts/            # Main layout (navbar/footer), Blog layout
messages/                   # Static i18n JSON (en.json, vi.json)
prisma/                     # schema.prisma (MongoDB)
public/                     # Static assets (svgs/, images/)
```

## Architecture Patterns

### Server vs Client Components

- **Default to Server Components** — data fetching in views, layouts, and pages.
- `'use client'` only when hooks or interactivity are needed (forms, carousels, dialogs, search).
- Server actions/data: Use `'use cache'` directive for Prisma queries (experimental Next.js feature).

### Data Fetching

- **Server-side**: `src/services/` functions called directly in server components (Prisma queries with `'use cache'`).
- **Client-side**: `src/services/product/fetch-*.ts` call internal `/api/*` routes via `axios`; consumed by TanStack Query hooks in `src/hooks/`.
- **Pattern**: `get-*` = server-only Prisma calls, `fetch-*` = client HTTP calls to API routes.

### Page Architecture

- `src/app/` pages are thin wrappers — they import a view from `src/views/` and pass params.
- `src/views/` contains the actual page implementation, broken into sub-components.
- Each view folder has an `index.tsx` as the main export.

### Routing

- All pages under `src/app/[locale]/(main)/` share the main layout (navbar + footer).
- Blog pages have an additional blog layout with sidebar.
- Product routes use catch-all `[[...slug]]` for `/product`, `/product/category`, `/product/category/subcategory`.
- Dynamic `[slug]` at root level resolves individual products by slug.

### i18n

- **Static strings**: `messages/en.json`, `messages/vi.json` (navbar labels, product strings).
- **DB strings**: `Intl` model in MongoDB, fetched at request time and merged with static messages in `src/i18n/request.ts`.
- **Access**: `useTranslations('Default')` for client, `getTranslations()` for server.
- **Navigation**: Use `Link`, `useRouter`, `redirect` from `@/i18n/navigation` (NOT from `next/navigation` directly).

### State Management

- **Zustand**: `useDialogStore` for modal state (dialog name + data). Defined in `src/provider/dialog-provider.tsx`.
- **TanStack Query**: Product list, search results. 60s `staleTime`. Keys in `src/constants/query-key.ts`.
- **URL state**: Pagination, filters, search via `useSearchQuery` hook (reads/writes URL search params).

## Database Schema (MongoDB via Prisma)

| Model                | Key Fields                                                    | Notes                              |
| -------------------- | ------------------------------------------------------------- | ---------------------------------- |
| `Product`            | SKU (unique), slug (unique), images[], categoryId, isFeatured | Has `translations` relation        |
| `ProductTranslation` | productId, locale (EN/VI), name, description, dimensions[]    | Unique on [productId, locale]      |
| `Category`           | slug (unique), image?, parentId?, isFeatured                  | Self-referential (parent/children) |
| `LandingPageView`    | order, type (enum), data (JSON)                               | CMS-driven landing page blocks     |
| `Intl`               | locale, view, key, value (JSON)                               | Dynamic i18n strings from DB       |

## Coding Conventions

### Files and Naming

- **Files**: kebab-case (`product-carousel.tsx`, `get-all-products.ts`)
- **Components**: PascalCase default exports (`ProductCarousel`, `LandingPageView`)
- **Interfaces**: `I` prefix (`IProductShowcasePageProps`, `IDialogStoreProps`)
- **Types**: No prefix for type aliases (`CategoryWithSubcategories`, `PaginationProps`)
- **Enums**: PascalCase name, UPPER_SNAKE values (`QueryParams.OFFSET`, `LandingPageType.CAROUSEL`)
- **Hooks**: `use-` prefix in filename, `use` prefix in export (`use-search-query.ts` → `useSearchQuery`)
- **Services**: `get-` or `fetch-` prefix describing the action

### Styling

- Tailwind utility classes directly in JSX.
- `cn()` from `@/lib/utils` for conditional/merged classes.
- Custom design tokens defined in `globals.css` `@theme inline` block:
  - `--color-main-bg`, `--color-title`, `--color-subtitle`, `--color-paragraph`, `--color-active-breadcrumb`, `--color-heading`
  - `--font-raleway`
- Use shadcn semantic tokens (`bg-primary`, `text-muted-foreground`, etc.) for standard UI.
- Use custom tokens (`text-title`, `bg-main-bg`, `font-raleway`) for brand-specific styling.

### Import Order (enforced by eslint `simple-import-sort`)

1. Side-effect imports
2. Node builtins + external packages (`react`, `next/*`, `@radix-ui/*`, etc.)
3. Internal aliases (`@/lib/*`, `@/components/*`, `@/services/*`, `@/hooks/*`, etc.)
4. Parent/relative imports
5. Relative sibling imports
6. CSS imports

### Prettier

- Single quotes, trailing commas (all), 2-space tabs, 120 print width, no bracket same line, avoid parens on single arrow params.

### Rules

- `no-console` (only `console.debug` and `console.error` allowed).
- `@typescript-eslint/no-unused-vars`: error.
- `@typescript-eslint/no-explicit-any`: off (any is allowed).
- React hooks rules enforced.

## Environment Variables

| Variable                          | Required | Purpose                   |
| --------------------------------- | -------- | ------------------------- |
| `DATABASE_URL`                    | Yes      | MongoDB connection string |
| `NOTION_API_KEY`                  | Yes      | Notion integration token  |
| `NOTION_DATABASE_ID`              | Yes      | Notion blog database ID   |
| `NOTION_REVALIDATE_INTERVAL`      | No       | Blog cache duration       |
| `NEXT_PUBLIC_EMAILJS_ID`          | Yes      | EmailJS service ID        |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Yes      | EmailJS template ID       |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | Yes      | EmailJS public key        |

## Commands

| Command      | Description               |
| ------------ | ------------------------- |
| `yarn dev`   | Dev server with Turbopack |
| `yarn build` | Production build          |
| `yarn start` | Start production server   |
| `yarn lint`  | ESLint                    |

## Key Decisions and Gotchas

- **No `tailwind.config.*` file** — Tailwind v4 is configured entirely in `globals.css` via `@theme`, `@plugin`, and `@theme inline`.
- **shadcn/ui components** in `src/components/ui/` are generated — edit with caution, prefer adding new shadcn components via CLI (`npx shadcn@latest add <component>`).
- **`WillRender` and `WillMount`** are custom conditional rendering utilities — use `WillRender` for conditional display (If/Else pattern), `WillMount` for lazy DOM mounting (dialog optimization).
- **Image remotes** must be whitelisted in `next.config.ts` `images.remotePatterns`.
- **Blog content** is fetched from Notion and rendered with `@notion-render/client` — no local blog markdown files.
- **`'use cache'`** (experimental) is used in services for Prisma queries — this is Next.js 15 experimental caching, not stable API.
- **Revalidation** is handled via `/api/revalidate` endpoint with a path parameter.
- **Font files** (Raleway TTFs) live in `src/fonts/` but may not be in git — they're referenced from `globals.css`.
- **`.prettierrc` is gitignored** — the canonical Prettier config is inline in `.eslintrc.json` `prettier/prettier` rule.
- **`reactStrictMode: false`** in `next.config.ts`.
