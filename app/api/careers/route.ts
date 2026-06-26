import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Career } from '@/lib/models/Career';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const active = searchParams.get('active');
    const department = searchParams.get('department');

    const filter: any = {};
    if (active === 'true') filter.isActive = true;
    if (department && department !== 'all') filter.department = department;

    const items = await Career.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    const result = items.map((i: any) => ({ ...i, id: i._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch careers' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    if (!data.title || !data.department || !data.location || !data.description) {
      return NextResponse.json({ success: false, error: 'Title, department, location, and description are required.' }, { status: 400 });
    }
    const item = await Career.create(data);
    return NextResponse.json({ success: true, data: { ...item.toObject(), id: item._id.toString() } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to create career posting' }, { status: 500 });
  }
}
