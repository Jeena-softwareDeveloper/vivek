import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (category) where.category = category;
    if (featured === 'true') where.featured = true;

    const items = await db.gallery_items.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const contentType = req.headers.get('content-type') || '';

    // Handle multipart/form-data (file uploads)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const caption = formData.get('caption') as string || '';
      const category = formData.get('category') as string || 'General';
      const featured = formData.get('featured') === 'true';
      const order = parseInt(formData.get('order') as string || '0') || 0;

      // Support multiple images: images[] field
      const imageFiles = formData.getAll('images') as File[];
      const created = [];

      for (const imageFile of imageFiles) {
        if (imageFile && imageFile.size > 0) {
          const url = await uploadToCloudinary(imageFile, 'construction-gallery');
          const item = await db.gallery_items.create({
            data: { url, caption, category, featured, order },
          });
          created.push(item);
        }
      }

      // Fallback: single 'image' field
      if (created.length === 0) {
        const singleImage = formData.get('image') as File;
        if (singleImage && singleImage.size > 0) {
          const url = await uploadToCloudinary(singleImage, 'construction-gallery');
          const item = await db.gallery_items.create({
            data: { url, caption, category, featured, order },
          });
          created.push(item);
        }
      }

      if (created.length === 0) {
        return NextResponse.json({ success: false, error: 'No valid images provided' }, { status: 400 });
      }

      return NextResponse.json({ success: true, data: created }, { status: 201 });
    }

    // Handle JSON body (legacy)
    const data = await req.json();
    const item = await db.gallery_items.create({ data });
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to create gallery item' }, { status: 500 });
  }
}
