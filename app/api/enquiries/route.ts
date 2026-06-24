import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Enquiry } from '@/lib/models/Enquiry';
import { getAuthAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const filter: any = {};
    if (status) filter.status = status;

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 }).lean();
    const result = enquiries.map((e: any) => ({ ...e, id: e._id.toString() }));

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const newEnquiry = await Enquiry.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
      status: 'new'
    });

    return NextResponse.json({ success: true, data: { ...newEnquiry.toObject(), id: newEnquiry._id.toString() } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
