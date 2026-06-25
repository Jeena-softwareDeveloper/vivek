import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { Category } from '@/lib/models/Category';
import { Settings } from '@/lib/models/Settings';
import { AdminUser } from '@/lib/models/AdminUser';
import { Service } from '@/lib/models/Service';
import { Project } from '@/lib/models/Project';

export async function GET() {
  try {
    await connectDB();

    // Clear existing
    await Category.deleteMany({});
    await Settings.deleteMany({});
    await AdminUser.deleteMany({});
    await Service.deleteMany({});
    await Project.deleteMany({});

    // 1. Create Admin
    const hashedPassword = await bcrypt.hash('AdminPassword123!', 10);
    await AdminUser.create({
      name: 'Super Admin',
      email: 'admin@vivekvijayandcompany.com',
      password: hashedPassword,
      role: 'admin'
    });

    // 2. Create Categories
    await Category.create([
      { name: 'Commercial', slug: 'commercial', type: 'general' },
      { name: 'Residential', slug: 'residential', type: 'general' },
      { name: 'Industrial', slug: 'industrial', type: 'general' },
      { name: 'Infrastructure', slug: 'infrastructure', type: 'general' }
    ]);

    // 3. Create Settings
    await Settings.create({
      companyName: 'Vivek Vijay & Company',
      email: 'contact@vivekvijayandcompany.com',
      phone: '+91 98765 43210',
      address: 'Chennai, Tamil Nadu',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      seoTitle: 'Vivek Vijay & Company | Builders & Engineers',
      seoDesc: 'Leading construction company in Tamil Nadu with over 18+ years of experience.'
    });

    // 4. Create dummy services
    await Service.create([
      {
        title: 'Building Construction',
        slug: 'building-construction',
        description: 'Full-scale building construction for commercial and residential properties.',
        shortDesc: 'End-to-end building construction services.',
        icon: 'Building2',
        order: 1
      },
      {
        title: 'Infrastructure Development',
        slug: 'infrastructure-development',
        description: 'Roads, bridges, and large scale infrastructure projects.',
        shortDesc: 'Heavy civil and infrastructure construction.',
        icon: 'HardHat',
        order: 2
      }
    ]);

    return NextResponse.json({ message: 'Seeding completed successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
