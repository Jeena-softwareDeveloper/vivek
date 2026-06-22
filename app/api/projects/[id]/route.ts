import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await db.projects.findUnique({
      where: { id }
    });

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const parsedProject = {
      ...project,
      images: (typeof project.images === 'string' && project.images.startsWith('[')) ? JSON.parse(project.images) : (project.images ? [project.images] : [])
    };

    return NextResponse.json({ success: true, data: parsedProject });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const formData = await req.formData();
    
    const updateData: any = {};
    const stringFields = ['title', 'slug', 'description', 'category', 'status', 'client', 'location', 'seoTitle', 'seoDesc'];
    
    stringFields.forEach(field => {
      const val = formData.get(field);
      if (val !== null) updateData[field] = val as string;
    });

    if (formData.has('year')) {
      updateData.year = formData.get('year') ? parseInt(formData.get('year') as string) : null;
    }
    
    if (formData.has('featured')) {
      updateData.featured = formData.get('featured') === 'true';
    }

    const coverImage = formData.get('coverImage') as File;
    if (coverImage && coverImage.size > 0) {
      updateData.coverImage = await uploadToCloudinary(coverImage, 'construction-projects');
    }

    // Handle existing images from the frontend
    let finalImages: string[] = [];
    if (formData.has('existingImages')) {
      try {
        finalImages = JSON.parse(formData.get('existingImages') as string);
      } catch (e) {
        finalImages = [];
      }
    } else {
      const existing = await db.projects.findUnique({ where: { id }, select: { images: true } });
      finalImages = (typeof existing?.images === 'string' && existing.images.startsWith('[')) ? JSON.parse(existing.images) : (existing?.images ? [existing.images] : []);
    }

    // Handle new multiple extra images
    const imageFiles = formData.getAll('images') as File[];
    if (imageFiles.length > 0) {
      for (const imgFile of imageFiles) {
        if (imgFile && imgFile.size > 0) {
          const url = await uploadToCloudinary(imgFile, 'construction-projects');
          finalImages.push(url);
        }
      }
    }
    
    updateData.images = JSON.stringify(finalImages);

    const updatedProject = await db.projects.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await db.projects.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
