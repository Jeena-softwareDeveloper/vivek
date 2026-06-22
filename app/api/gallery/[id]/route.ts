import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = await db.gallery_items.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery item' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const caption = formData.get('caption') as string || '';
      const category = formData.get('category') as string || 'General';
      const featured = formData.get('featured') === 'true';
      const order = parseInt(formData.get('order') as string || '0') || 0;

      let url: string | undefined;
      const imageFile = formData.get('image') as File;

      if (imageFile && imageFile.size > 0) {
        url = await uploadToCloudinary(imageFile, 'construction-gallery');
      }

      const updateData: any = { caption, category, featured, order };
      if (url) updateData.url = url;

      const item = await db.gallery_items.update({ where: { id }, data: updateData });
      return NextResponse.json({ success: true, data: item });
    }

    const data = await req.json();
    const item = await db.gallery_items.update({ where: { id }, data });
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to update gallery item' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.gallery_items.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
