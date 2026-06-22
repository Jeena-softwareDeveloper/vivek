import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const services = await db.services.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ success: true, data: services });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    
    if (!body.title || !body.slug || !body.description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const newService = await db.services.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        shortDesc: body.shortDesc,
        icon: body.icon,
        image: body.image,
        order: body.order ? parseInt(body.order) : 0,
      }
    });

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
