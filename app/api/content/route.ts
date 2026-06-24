import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { SiteContent } from '@/lib/models/SiteContent';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    const filter: any = {};
    if (page) filter.page = page;
    if (section) filter.section = section;

    const items = await SiteContent.find(filter).sort({ page: 1, section: 1 }).lean();
    const result = items.map((i: any) => ({ ...i, id: i._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { id, page, section, key, value } = data;

    if (!id) {
       return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const item = await SiteContent.findByIdAndUpdate(id, { page, section, key, value }, { new: true }).lean() as any;
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update content block' }, { status: 500 });
  }
}
