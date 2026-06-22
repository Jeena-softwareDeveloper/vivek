import React from 'react';
import { db } from '@/lib/db';
import { ProjectCard } from '@/components/website/ProjectCard';
import { CTABanner } from '@/components/website/CTABanner';
import { HeroSlider } from '@/components/website/HeroSlider';

export const dynamic = 'force-dynamic';

export default async function ProjectsPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const whereClause = category ? { category } : {};
  
  const rawProjects = await db.projects.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  const projects = rawProjects.map(p => ({
    ...p,
    images: (typeof p.images === 'string' && p.images.startsWith('[')) ? JSON.parse(p.images) : (p.images ? [p.images] : [])
  }));

  // Extract unique categories for filter (in real app, query DB distinct)
  const allProjects = await db.projects.findMany({ select: { category: true } });
  const categories = Array.from(new Set(allProjects.map(p => p.category)));

  // Fetch featured projects for the hero background slider
  const featuredProjects = await db.projects.findMany({
    where: { featured: true },
    select: { coverImage: true, images: true },
    orderBy: { createdAt: 'desc' },
  });

  const heroImages = featuredProjects
    .map((p: any) => {
      const parsedImages = (typeof p.images === 'string' && p.images.startsWith('[')) ? JSON.parse(p.images) : (p.images ? [p.images] : []);
      return p.coverImage || (parsedImages.length > 0 ? parsedImages[0] : null);
    })
    .filter(Boolean) as string[];

  return (
    <>
      <div className="relative bg-primary pt-32 pb-20 text-center overflow-hidden">
        {heroImages.length > 0 && <HeroSlider images={heroImages} />}
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 drop-shadow-md">
            Our <span className="text-secondary">Portfolio</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow">
            Explore our extensive portfolio of successful construction and engineering projects.
          </p>
        </div>
      </div>

      <section className="py-16 bg-surface min-h-[50vh]">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a 
              href="/projects" 
              className={`px-6 py-2 rounded-full font-medium transition-colors ${!category ? 'bg-secondary text-primary' : 'bg-white text-text-medium hover:bg-secondary/20'}`}
            >
              All Projects
            </a>
            {categories.map((cat) => (
              <a 
                key={cat}
                href={`/projects?category=${encodeURIComponent(cat)}`} 
                className={`px-6 py-2 rounded-full font-medium transition-colors ${category === cat ? 'bg-secondary text-primary' : 'bg-white text-text-medium hover:bg-secondary/20'}`}
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-border">
              <h3 className="text-xl font-bold text-text-dark mb-2">No projects found</h3>
              <p className="text-text-medium">There are currently no projects matching this category.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}