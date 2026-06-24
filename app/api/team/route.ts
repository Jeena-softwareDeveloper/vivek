import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { TeamMember } from '@/lib/models/TeamMember';

export async function GET(req: Request) {
  try {
    await connectDB();
    const items = await TeamMember.find().sort({ order: 1 }).lean();
    const result = items.map((i: any) => ({ ...i, id: i._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const item = await TeamMember.create(data);
    return NextResponse.json({ success: true, data: { ...item.toObject(), id: item._id.toString() } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 500 });
  }
}
