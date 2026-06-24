import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Settings } from '@/lib/models/Settings';

export async function GET(req: Request) {
  try {
    await connectDB();
    const settings = await Settings.findOne().lean() as any;
    if (settings) {
      settings.id = settings._id.toString();
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { id, ...updateData } = data;

    let item: any;
    if (id) {
      item = await Settings.findByIdAndUpdate(id, updateData, { new: true }).lean();
    } else {
      // If no settings exist yet, create one
      item = await Settings.create(updateData);
      item = item.toObject();
    }

    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
