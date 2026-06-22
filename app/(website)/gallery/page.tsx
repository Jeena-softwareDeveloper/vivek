import React from 'react';
import { db } from '@/lib/db';
import { GalleryGrid } from '@/components/website/GalleryGrid';
import { CTABanner } from '@/components/website/CTABanner';

export const dynamic = 'force-dynamic';

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const whereClause = category ? { category } : {};
  
  const galleryItems = await db.gallery_items.findMany({
    where: whereClause,
    orderBy: { order: 'asc' }
  });

  // Extract unique categories
  const allItems = await db.gallery_items.findMany({ select: { category: true } });
  const categories = Array.from(new Set(allItems.map(i => i.category).filter(Boolean)));

  return (
    <>
      <div className="bg-primary pt-32 pb-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Image <span className="text-secondary">Gallery</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A visual showcase of our craftsmanship, progress, and completed works.
          </p>
        </div>
      </div>

      <section className="py-16 bg-surface min-h-[50vh]">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a 
              href="/gallery" 
              className={`px-6 py-2 rounded-full font-medium transition-colors ${!category ? 'bg-secondary text-primary' : 'bg-white text-text-medium hover:bg-secondary/20'}`}
            >
              All Images
            </a>
            {categories.map((cat) => (
              <a 
                key={cat}
                href={`/gallery?category=${encodeURIComponent(cat as string)}`} 
                className={`px-6 py-2 rounded-full font-medium transition-colors ${category === cat ? 'bg-secondary text-primary' : 'bg-white text-text-medium hover:bg-secondary/20'}`}
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Grid */}
          {galleryItems.length > 0 ? (
            <GalleryGrid items={galleryItems as any} />
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-border">
              <h3 className="text-xl font-bold text-text-dark mb-2">No images found</h3>
              <p className="text-text-medium">Check back later for updates to our gallery.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}