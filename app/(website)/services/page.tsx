import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ServiceCard } from '@/components/website/ServiceCard';
import { CTABanner } from '@/components/website/CTABanner';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const services = await db.services.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-[#081221] min-h-[40vh] flex items-center">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/services_hero_bg.png" 
            alt="Services background" 
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-[#081221]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#081221]/90 to-transparent w-2/3"></div>
        </div>
        
        <div className="container mx-auto px-4 xl:max-w-[1280px] relative z-10 w-full">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-[#0a42a8]">Services</span>
            </h1>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-10 drop-shadow-md">
              Comprehensive construction solutions tailored to meet the unique needs of every client and project.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-surface min-h-[50vh]">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service as any} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-border">
              <h3 className="text-xl font-bold text-text-dark mb-2">No services found</h3>
              <p className="text-text-medium">We are currently updating our service offerings.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}