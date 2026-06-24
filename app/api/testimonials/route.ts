import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Testimonial } from '@/lib/models/Testimonial';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const active = searchParams.get('active');

    const filter: any = {};
    if (active === 'true') filter.active = true;

    const items = await Testimonial.find(filter).sort({ createdAt: -1 }).lean();
    const result = items.map((i: any) => ({ ...i, id: i._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const item = await Testimonial.create(data);
    return NextResponse.json({ success: true, data: { ...item.toObject(), id: item._id.toString() } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 });
  }
}
