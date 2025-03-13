import { Client } from '@notionhq/client';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { ApiKey } from '@/configs/api-key';
import { Notion } from '@/configs/notion';
import { BlogResponse } from '@/types/blog';

export const notionClient = new Client({
  auth: ApiKey.NOTION_API_KEY,
});

export async function getBlogPosts() {
  'use cache';

  const data = await notionClient.databases.query({
    database_id: Notion.NOTION_DATABASE_ID,
    filter: {
      property: 'Status',
      status: {
        equals: 'Published',
      },
    },
  });

  const blogPosts = data.results as BlogResponse[];

  const sortedBlogPosts = blogPosts.sort((a, b) => {
    const dateA = new Date(a.properties.Date.date.start as string);
    const dateB = new Date(b.properties.Date.date.start as string);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });

  return { data: sortedBlogPosts };
}

export async function getBlogBySlug(slug: string) {
  'use cache';

  const page = await notionClient.databases.query({
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
    database_id: Notion.NOTION_DATABASE_ID,
  });

  return page.results[0] as BlogResponse;
}

export async function getPageContent(pageId: string) {
  'use cache';

  const data = await notionClient.blocks.children.list({ block_id: pageId });

  return data.results as BlockObjectResponse[];
}
