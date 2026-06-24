import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Service } from '@/lib/models/Service';
import { getAuthAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const services = await Service.find().sort({ order: 1 }).lean();
    const result = services.map((s: any) => ({ ...s, id: s._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    if (!body.title || !body.slug || !body.description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const newService = await Service.create({
      title: body.title,
      slug: body.slug,
      description: body.description,
      shortDesc: body.shortDesc,
      icon: body.icon,
      image: body.image,
      order: body.order ? parseInt(body.order) : 0,
    });

    return NextResponse.json({ success: true, data: { ...newService.toObject(), id: newService._id.toString() } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
