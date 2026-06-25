import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { TeamMember } from '@/lib/models/TeamMember';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const updateData: any = {};
      ['name', 'designation', 'bio', 'email'].forEach(field => {
        const val = formData.get(field);
        if (val !== null && val !== 'undefined') updateData[field] = val as string;
      });
      if (formData.has('order')) {
        updateData.order = parseInt(formData.get('order') as string) || 0;
      }
      const imageFile = formData.get('image') as File;
      if (imageFile && imageFile.size > 0) {
        if (process.env.CLOUDINARY_CLOUD_NAME) {
          updateData.image = await uploadToCloudinary(imageFile, 'construction-team');
        } else {
          const bytes = await imageFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
          await fs.writeFile(path.join(uploadDir, filename), buffer);
          updateData.image = `/uploads/${filename}`;
        }
      } else if (formData.get('removeImage') === 'true') {
        updateData.image = null;
      }
      const item = await TeamMember.findByIdAndUpdate(id, updateData, { new: true }).lean() as any;
      return NextResponse.json({ success: true, data: { ...item, id: item._id?.toString() } });
    }

    const data = await req.json();
    const item = await TeamMember.findByIdAndUpdate(id, data, { new: true }).lean() as any;
    return NextResponse.json({ success: true, data: { ...item, id: item._id?.toString() } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to update team member' }, { status: 500 });
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
