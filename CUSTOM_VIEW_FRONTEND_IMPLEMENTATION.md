# Custom View Feature - Frontend Implementation Guide

## Overview
Implement a custom view rendering system on the frontend that fetches layout configurations from the CMS API and renders dynamic page layouts with multiple layout types.

## 1. Database Migration

Update the Prisma schema to include the new TEXT_BLOCK layout type:

```prisma
enum CustomLayoutItemType {
  BACKGROUND_TITLE
  IMAGE_TEXT_BLOCK
  ICON_TEXT_ROW
  BOTTOM_IMAGE_TEXT
  TEXT_BLOCK
}
```

Run migration:
```bash
npx prisma db push
# or
npx prisma migrate dev --name add-text-block-layout
```

## 2. API Endpoint Implementation

Since your frontend uses the same Next.js stack with database connection, create your own API route to fetch custom view data.

### 2.1 Create API Route

```typescript
// app/api/custom-view/[slug]/route.ts
import { db } from "@/lib/db"
import { NextRequest } from "next/server"

export async function GET(
  _request: NextRequest, 
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const customView = await db.customView.findUnique({
      where: { slug },
      include: {
        items: {
          orderBy: {
            order: "asc",
          },
        },
      },
    })

    if (!customView) {
      return Response.json(
        { error: "Custom view not found" }, 
        { status: 404 }
      )
    }

    return Response.json(customView)
  } catch (error) {
    console.error("Error fetching custom view:", error)
    return Response.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}
```

### 2.2 Database Client Setup

Ensure you have the Prisma client set up:

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
```

### 2.3 API Response Example

**Endpoint:** `GET /api/custom-view/{slug}`

**Response:**
```json
{
  "id": "...",
  "slug": "about-us",
  "items": [
    {
      "id": "...",
      "order": 0,
      "type": "BACKGROUND_TITLE",
      "data": {
        "title": "Welcome",
        "subtitle": "To our store",
        "backgroundImage": "https://..."
      }
    },
    {
      "id": "...",
      "order": 1,
      "type": "TEXT_BLOCK",
      "data": {
        "text": "This is a simple text block..."
      }
    }
  ],
  "createdAt": "...",
  "updatedAt": "..."
}
```

## 3. TypeScript Type Definitions

Create types for the custom view data structure:

```typescript
export enum CustomLayoutItemType {
  BACKGROUND_TITLE = "BACKGROUND_TITLE",
  IMAGE_TEXT_BLOCK = "IMAGE_TEXT_BLOCK",
  ICON_TEXT_ROW = "ICON_TEXT_ROW",
  BOTTOM_IMAGE_TEXT = "BOTTOM_IMAGE_TEXT",
  TEXT_BLOCK = "TEXT_BLOCK",
}

export interface BackgroundTitleData {
  title: string
  subtitle: string
  backgroundImage: string
}

export interface ImageTextBlockData {
  image: string
  text: string
  imagePosition: "left" | "right"
}

export interface IconTextRowData {
  items: Array<{
    icon: string
    text: string
  }>
}

export interface BottomImageTextData {
  image: string
  overlayText: string
}

export interface TextBlockData {
  text: string
}

export type CustomLayoutItemData = 
  | BackgroundTitleData 
  | ImageTextBlockData 
  | IconTextRowData 
  | BottomImageTextData 
  | TextBlockData

export interface CustomLayoutItem {
  id: string
  type: CustomLayoutItemType
  data: CustomLayoutItemData
  order: number
}

export interface CustomViewResponse {
  id: string
  slug: string
  items: CustomLayoutItem[]
  createdAt: string
  updatedAt: string
}
```

## 4. Frontend Components Implementation

### 4.1 Main Custom View Page Component

Create a page component that fetches and renders the custom view using your own API:

```tsx
// app/[slug]/page.tsx
import { CustomViewRenderer } from "@/components/custom-view/custom-view-renderer"
import { notFound } from "next/navigation"

export default async function CustomViewPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/custom-view/${params.slug}`,
    {
      next: { revalidate: 3600 } // Revalidate every hour
    }
  )
  
  if (!response.ok) {
    notFound()
  }
  
  const customView = await response.json()
  
  return (
    <div className="container mx-auto px-4">
      <CustomViewRenderer items={customView.items} />
    </div>
  )
}
```

### 4.1.1 Alternative: Direct Database Query (Better Performance)

For better performance, you can query the database directly instead of making an HTTP request:

```tsx
// app/[slug]/page.tsx
import { db } from "@/lib/db"
import { CustomViewRenderer } from "@/components/custom-view/custom-view-renderer"
import { notFound } from "next/navigation"

export const revalidate = 3600 // Revalidate every hour

export default async function CustomViewPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const customView = await db.customView.findUnique({
    where: { slug: params.slug },
    include: {
      items: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })
  
  if (!customView) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4">
      <CustomViewRenderer items={customView.items} />
    </div>
  )
}
```

### 4.2 Custom View Renderer Component

```tsx
// components/custom-view/custom-view-renderer.tsx
import { CustomLayoutItem, CustomLayoutItemType } from "@/types/custom-view"
import BackgroundTitleLayout from "./layouts/background-title-layout"
import ImageTextBlockLayout from "./layouts/image-text-block-layout"
import IconTextRowLayout from "./layouts/icon-text-row-layout"
import BottomImageTextLayout from "./layouts/bottom-image-text-layout"
import TextBlockLayout from "./layouts/text-block-layout"

interface CustomViewRendererProps {
  items: CustomLayoutItem[]
}

export function CustomViewRenderer({ items }: CustomViewRendererProps) {
  const renderLayout = (item: CustomLayoutItem) => {
    switch (item.type) {
      case CustomLayoutItemType.BACKGROUND_TITLE:
        return <BackgroundTitleLayout data={item.data} />
      
      case CustomLayoutItemType.IMAGE_TEXT_BLOCK:
        return <ImageTextBlockLayout data={item.data} />
      
      case CustomLayoutItemType.ICON_TEXT_ROW:
        return <IconTextRowLayout data={item.data} />
      
      case CustomLayoutItemType.BOTTOM_IMAGE_TEXT:
        return <BottomImageTextLayout data={item.data} />
      
      case CustomLayoutItemType.TEXT_BLOCK:
        return <TextBlockLayout data={item.data} />
      
      default:
        return null
    }
  }

  return (
    <div className="space-y-12 py-8">
      {items
        .sort((a, b) => a.order - b.order)
        .map((item) => (
          <div key={item.id}>
            {renderLayout(item)}
          </div>
        ))}
    </div>
  )
}
```

## 5. Layout Components

Create individual layout components for each type:

### 5.1 Background Title Layout

```tsx
// components/custom-view/layouts/background-title-layout.tsx
import { BackgroundTitleData } from "@/types/custom-view"

export default function BackgroundTitleLayout({ data }: { data: BackgroundTitleData }) {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      {data.backgroundImage ? (
        <>
          <img 
            src={data.backgroundImage} 
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
            <p className="text-lg md:text-xl">{data.subtitle}</p>
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-700 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
          <p className="text-lg md:text-xl">{data.subtitle}</p>
        </div>
      )}
    </div>
  )
}
```

### 5.2 Image Text Block Layout

```tsx
// components/custom-view/layouts/image-text-block-layout.tsx
import { ImageTextBlockData } from "@/types/custom-view"

export default function ImageTextBlockLayout({ data }: { data: ImageTextBlockData }) {
  const ImageSection = () => (
    <div className="w-full aspect-square rounded-lg overflow-hidden">
      <img 
        src={data.image} 
        alt="Content"
        className="w-full h-full object-cover"
      />
    </div>
  )

  const TextSection = () => (
    <div className="flex items-center">
      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
        {data.text}
      </p>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {data.imagePosition === "left" ? (
        <>
          <ImageSection />
          <TextSection />
        </>
      ) : (
        <>
          <TextSection />
          <ImageSection />
        </>
      )}
    </div>
  )
}
```

### 5.3 Icon Text Row Layout

```tsx
// components/custom-view/layouts/icon-text-row-layout.tsx
import { IconTextRowData } from "@/types/custom-view"

export default function IconTextRowLayout({ data }: { data: IconTextRowData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.items.map((item, index) => (
        <div 
          key={index}
          className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-20 h-20 mb-4 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
            {item.icon ? (
              <img 
                src={item.icon} 
                alt={`Icon ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400">Icon</div>
            )}
          </div>
          <p className="text-gray-700">{item.text}</p>
        </div>
      ))}
    </div>
  )
}
```

### 5.4 Bottom Image Text Layout

```tsx
// components/custom-view/layouts/bottom-image-text-layout.tsx
import { BottomImageTextData } from "@/types/custom-view"

export default function BottomImageTextLayout({ data }: { data: BottomImageTextData }) {
  return (
    <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
      <img 
        src={data.image} 
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-white text-3xl md:text-4xl font-semibold text-center px-4">
          {data.overlayText}
        </h2>
      </div>
    </div>
  )
}
```

### 5.5 Text Block Layout

```tsx
// components/custom-view/layouts/text-block-layout.tsx
import { TextBlockData } from "@/types/custom-view"

export default function TextBlockLayout({ data }: { data: TextBlockData }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
        {data.text}
      </p>
    </div>
  )
}
```

## 6. Database Synchronization

Since the frontend and CMS share the same database (MongoDB), any changes made in the CMS admin panel will be immediately available to the frontend application. The data flow is:

1. **CMS Admin** → Creates/Updates custom view → **Shared Database**
2. **Frontend** → Queries database → Renders custom view

Ensure both applications point to the same `DATABASE_URL` in their environment variables:

```env
# Both CMS and Frontend .env files
DATABASE_URL="mongodb+srv://..."
```

## 7. Usage Example

Once implemented, editors can create custom pages through the CMS admin panel:

1. Go to `/custom-view` in the admin panel
2. Create a new custom view with a unique slug (e.g., "about-us")
3. Add various layout blocks (Background Title, Text Block, Image + Text, etc.)
4. Arrange them in the desired order
5. Save the custom view

The frontend will automatically render the page at `/about-us` with all the layout blocks in the correct order after the revalidation period.

## 8. Additional Considerations

### 8.1 Caching Strategy

**Option 1: Time-based Revalidation (ISR)**
```tsx
// app/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function CustomViewPage({ params }: { params: { slug: string } }) {
  const customView = await db.customView.findUnique({
    where: { slug: params.slug },
    include: { items: { orderBy: { order: "asc" } } },
  })
  
  if (!customView) notFound()
  
  return <CustomViewRenderer items={customView.items} />
}
```

**Option 2: On-demand Revalidation**

Create a webhook endpoint in the CMS to trigger revalidation when content is updated:

```typescript
// CMS: app/api/custom-view/[slug]/revalidate/route.ts
import { NextRequest } from "next/server"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const { secret } = await request.json()

  // Verify secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: "Invalid secret" }, { status: 401 })
  }

  try {
    // Call frontend revalidation endpoint
    const response = await fetch(
      `${process.env.FRONTEND_URL}/api/revalidate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          path: `/${slug}`,
          secret: process.env.REVALIDATION_SECRET 
        }),
      }
    )

    if (!response.ok) {
      throw new Error("Revalidation failed")
    }

    return Response.json({ revalidated: true })
  } catch (error) {
    return Response.json(
      { error: "Error revalidating" }, 
      { status: 500 }
    )
  }
}
```

```typescript
// Frontend: app/api/revalidate/route.ts
import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { secret, path } = await request.json()

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: "Invalid secret" }, { status: 401 })
  }

  try {
    revalidatePath(path)
    return Response.json({ revalidated: true, path })
  } catch (error) {
    return Response.json(
      { error: "Error revalidating" }, 
      { status: 500 }
    )
  }
}
```

Then update the CMS custom view update handler to trigger revalidation:

```typescript
// CMS: Modify app/api/custom-view/[slug]/route.ts PUT handler
export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { items } = await request.json()

  // ... existing update logic ...

  // Trigger frontend revalidation
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/custom-view/${slug}/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.REVALIDATION_SECRET }),
    })
  } catch (error) {
    console.error("Failed to revalidate frontend:", error)
  }

  return Response.json(updatedView)
}
```

### 8.2 Error Handling

Create proper error states:

```tsx
// app/[slug]/page.tsx
import { db } from "@/lib/db"
import { CustomViewRenderer } from "@/components/custom-view/custom-view-renderer"
import { notFound } from "next/navigation"

export default async function CustomViewPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  try {
    const customView = await db.customView.findUnique({
      where: { slug: params.slug },
      include: {
        items: {
          orderBy: { order: "asc" },
        },
      },
    })
    
    if (!customView) {
      notFound()
    }
    
    if (!customView.items || customView.items.length === 0) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-600">
            This page is under construction
          </h1>
        </div>
      )
    }
    
    return (
      <div className="container mx-auto px-4">
        <CustomViewRenderer items={customView.items} />
      </div>
    )
  } catch (error) {
    console.error("Error loading custom view:", error)
    throw error // Will trigger error.tsx
  }
}
```

```tsx
// app/[slug]/error.tsx
'use client'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h2>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}
```

```tsx
// app/[slug]/not-found.tsx
export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold text-gray-600 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="text-blue-500 hover:text-blue-600 underline"
      >
        Go back home
      </a>
    </div>
  )
}
```

### 8.3 Responsive Design
Ensure all layout components are responsive and work well on mobile devices by using Tailwind's responsive classes (sm:, md:, lg:, etc.).

### 8.4 SEO Optimization
```tsx
// app/[slug]/page.tsx
import { db } from "@/lib/db"
import { Metadata } from "next"

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const customView = await db.customView.findUnique({
    where: { slug: params.slug },
    include: {
      items: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
  })
  
  if (!customView) {
    return {
      title: "Page Not Found",
    }
  }

  // Extract title from first item if it's a BACKGROUND_TITLE
  let title = customView.slug
  let description = "Custom page"

  if (customView.items[0]?.type === "BACKGROUND_TITLE") {
    const data = customView.items[0].data as any
    title = data.title || title
    description = data.subtitle || description
  }
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

export default async function CustomViewPage({ params }: { params: { slug: string } }) {
  // ... page implementation
}
```

### 8.5 Static Path Generation (Optional)

For static site generation, generate paths for all custom views:

```tsx
// app/[slug]/page.tsx
import { db } from "@/lib/db"

export async function generateStaticParams() {
  const customViews = await db.customView.findMany({
    select: { slug: true },
  })

  return customViews.map((view) => ({
    slug: view.slug,
  }))
}
```

## 9. Environment Variables

Add these to your `.env` file:

```env
# Database (shared with CMS)
DATABASE_URL="mongodb+srv://..."

# For on-demand revalidation (optional)
REVALIDATION_SECRET="your-secret-key-here"
FRONTEND_URL="https://your-frontend-domain.com"
NEXT_PUBLIC_SITE_URL="https://your-frontend-domain.com"
```

## 10. Testing

Test the implementation with various combinations:
- Different layout types in different orders
- Empty states (no image, no text)
- Long text content with line breaks
- Multiple items of the same type
- Mobile responsiveness
- Loading states
- Error states

## 11. Implementation Checklist

- [ ] Run Prisma migration to add TEXT_BLOCK enum
- [ ] Set up database client (`lib/db.ts`)
- [ ] Create API route (`app/api/custom-view/[slug]/route.ts`)
- [ ] Create type definitions file
- [ ] Create custom view renderer component
- [ ] Create all 5 layout components (Background Title, Image Text Block, Icon Text Row, Bottom Image Text, Text Block)
- [ ] Create page component (`app/[slug]/page.tsx`)
- [ ] Create error and not-found pages
- [ ] Add metadata generation for SEO
- [ ] Set up caching strategy (ISR or on-demand revalidation)
- [ ] Configure environment variables
- [ ] Test all layout types
- [ ] Test responsive design on mobile
- [ ] Test error states

## Summary

This implementation provides a flexible, CMS-driven page builder that allows non-technical users to create custom pages by combining different layout blocks. Since both the CMS and frontend share the same database, changes are immediately available, and the system uses Next.js features like ISR and on-demand revalidation for optimal performance. The system is extensible and can easily accommodate new layout types in the future.
