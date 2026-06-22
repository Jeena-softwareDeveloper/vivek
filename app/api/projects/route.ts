import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');

    const whereClause: any = {};
    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    if (featured === 'true') whereClause.featured = true;

    const projects = await db.projects.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    const parsedProjects = projects.map(p => ({
      ...p,
      images: (typeof p.images === 'string' && p.images.startsWith('[')) ? JSON.parse(p.images) : (p.images ? [p.images] : [])
    }));

    return NextResponse.json({ success: true, data: parsedProjects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    
    if (!title || !slug || !description || !category) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const existing = await db.projects.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 400 });
    }

    let coverImageUrl = null;
    const coverImage = formData.get('coverImage') as File;
    
    if (coverImage && coverImage.size > 0) {
      coverImageUrl = await uploadToCloudinary(coverImage, 'construction-projects');
    }

    const newProject = await db.projects.create({
      data: {
        title,
        slug,
        description,
        category,
        status: (formData.get('status') as string) || 'ongoing',
        client: formData.get('client') as string || null,
        location: formData.get('location') as string || null,
        year: formData.get('year') ? parseInt(formData.get('year') as string) : null,
        featured: formData.get('featured') === 'true',
        images: "[]", // Will be updated with extra images below
        coverImage: coverImageUrl,
        seoTitle: formData.get('seoTitle') as string || null,
        seoDesc: formData.get('seoDesc') as string || null
      }
    });

    // Handle multiple extra images
    const imageFiles = formData.getAll('images') as File[];
    if (imageFiles.length > 0) {
      const imageUrls: string[] = [];
      for (const imgFile of imageFiles) {
        if (imgFile && imgFile.size > 0) {
          const url = await uploadToCloudinary(imgFile, 'construction-projects');
          imageUrls.push(url);
        }
      }
      if (imageUrls.length > 0) {
        await db.projects.update({
          where: { id: newProject.id },
          data: { images: JSON.stringify(imageUrls) }
        });
        return NextResponse.json({ success: true, data: { ...newProject, images: imageUrls } }, { status: 201 });
      }
    }


    return NextResponse.json({ success: true, data: { ...newProject, images: [] } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
