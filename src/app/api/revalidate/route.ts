import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

import { QueryParams } from '@/constants/query-params';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get(QueryParams.REVALIDATE_PATH);

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  });
}
