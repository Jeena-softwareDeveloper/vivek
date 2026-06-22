import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    const where: any = {};
    if (page) where.page = page;
    if (section) where.section = section;

    const items = await db.site_content.findMany({
      where,
      orderBy: [{ page: 'asc' }, { section: 'asc' }],
    });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, page, section, key, value } = data;

    if (!id) {
       return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const item = await db.site_content.update({
      where: { id },
      data: { page, section, key, value },
    });
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update content block' }, { status: 500 });
  }
}
