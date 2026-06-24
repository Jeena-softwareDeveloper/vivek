import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Project } from '@/lib/models/Project';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const project = await Project.findById(id).lean() as any;

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { ...project, id: project._id.toString() } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
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
    } else if (formData.get('removeCoverImage') === 'true') {
      updateData.coverImage = null;
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
      const existing = await Project.findById(id).select('images').lean() as any;
      finalImages = existing?.images || [];
    }

    // Handle new multiple extra images
    const imageFiles = formData.getAll('images') as File[];
    for (const imgFile of imageFiles) {
      if (imgFile && imgFile.size > 0) {
        const url = await uploadToCloudinary(imgFile, 'construction-projects');
        finalImages.push(url);
      }
    }

    updateData.images = finalImages;

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true }).lean() as any;

    return NextResponse.json({ success: true, data: { ...updatedProject, id: updatedProject._id.toString() } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await Project.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
