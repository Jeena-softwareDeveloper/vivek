import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Career } from '@/lib/models/Career';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await Career.findById(id).lean() as any;
    if (!item) return NextResponse.json({ success: false, error: 'Career posting not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch career posting' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await req.json();
    const item = await Career.findByIdAndUpdate(id, data, { new: true }).lean() as any;
    if (!item) return NextResponse.json({ success: false, error: 'Career posting not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to update career posting' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Career.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ success: false, error: 'Career posting not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete career posting' }, { status: 500 });
  }
}
