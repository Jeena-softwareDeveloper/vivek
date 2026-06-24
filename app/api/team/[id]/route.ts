import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { TeamMember } from '@/lib/models/TeamMember';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await req.json();
    const item = await TeamMember.findByIdAndUpdate(id, data, { new: true }).lean() as any;
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await TeamMember.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete team member' }, { status: 500 });
  }
}
