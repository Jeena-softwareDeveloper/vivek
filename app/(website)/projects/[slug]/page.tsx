import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { CTABanner } from '@/components/website/CTABanner';
import { Badge } from '@/components/ui/Badge';
import { Calendar, MapPin, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const rawProject = await db.projects.findUnique({
    where: { slug }
  });

  if (!rawProject) {
    notFound();
  }

  const project = {
    ...rawProject,
    images: (typeof rawProject.images === 'string' && rawProject.images.startsWith('[')) ? JSON.parse(rawProject.images) : (rawProject.images ? [rawProject.images] : [])
  };

  return (
    <>
      {/* Project Hero Banner */}
      <div 
        className="relative h-[60vh] min-h-[400px] flex items-end pb-16"
        style={{
          backgroundImage: `url('${project.coverImage || (project.images && project.images.length > 0 ? project.images[0] : '/images/placeholder.jpg')}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark gradient overlay for text readability without blue tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050f24]/90 via-[#050f24]/40 to-black/20" />
        <div className="container relative z-10 mx-auto px-4 xl:max-w-[1280px]">
          <Badge className="mb-4 text-sm px-4 py-1" variant="warning">
            {project.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            {project.title}
          </h1>
        </div>
      </div>

      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Link href="/projects" className="inline-flex items-center text-text-medium hover:text-primary mb-8 font-medium transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Projects
              </Link>
              
              <h2 className="text-3xl font-display font-bold text-text-dark mb-6">Project Overview</h2>
              <div className="prose prose-lg max-w-none text-text-medium">
                {/* Assuming description is plain text, preserving whitespace */}
                <div className="whitespace-pre-wrap">{project.description}</div>
              </div>

              {/* Project Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-display font-bold text-text-dark mb-6">Project Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(project.images as string[]).map((imgUrl: string, idx: number) => (
                      <div key={idx} className="relative h-[250px] sm:h-[300px] rounded-xl overflow-hidden group shadow-sm border border-border">
                        <img 
                          src={imgUrl} 
                          alt={`${project.title} - Image ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-xl border border-border sticky top-32 shadow-sm">
                <h3 className="text-xl font-bold text-text-dark mb-6 border-b border-border pb-4">
                  Project Details
                </h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin className="text-secondary shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block text-sm text-text-light mb-1">Location</span>
                      <span className="font-semibold text-text-dark">{project.location || 'N/A'}</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <User className="text-secondary shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block text-sm text-text-light mb-1">Client</span>
                      <span className="font-semibold text-text-dark">{project.client || 'N/A'}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Calendar className="text-secondary shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block text-sm text-text-light mb-1">Year Completed</span>
                      <span className="font-semibold text-text-dark">{project.year || 'Ongoing'}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}