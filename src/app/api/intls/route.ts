import db from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();

  const intl = await db.intl.create({
    data: body,
  });

  return Response.json(intl);
}
