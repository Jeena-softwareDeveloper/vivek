import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Project } from '@/lib/models/Project';
import { Service } from '@/lib/models/Service';
import { Testimonial } from '@/lib/models/Testimonial';
import { Enquiry } from '@/lib/models/Enquiry';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch counts in parallel
    const [projects, services, testimonials, enquiries] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Testimonial.countDocuments(),
      Enquiry.countDocuments()
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        projects,
        services,
        testimonials,
        enquiries
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
