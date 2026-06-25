import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Service } from '@/lib/models/Service';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

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

    const formData = await req.formData();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;

    if (!title || !slug || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const serviceData: any = {
      title,
      slug,
      description,
      shortDesc: (formData.get('shortDesc') as string) || '',
      icon: (formData.get('icon') as string) || 'HardHat',
      order: formData.has('order') ? parseInt(formData.get('order') as string) || 0 : 0,
    };

    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        serviceData.image = await uploadToCloudinary(imageFile, 'construction-services');
      } else {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
        await fs.writeFile(path.join(uploadDir, filename), buffer);
        serviceData.image = `/uploads/${filename}`;
      }
    }

    const newService = await Service.create(serviceData);

    return NextResponse.json({ success: true, data: { ...newService.toObject(), id: newService._id.toString() } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
