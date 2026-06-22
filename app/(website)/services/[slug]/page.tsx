import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { CTABanner } from '@/components/website/CTABanner';
import { Wrench, HardHat, Home, Building2, Hammer, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  HardHat,
  Home,
  Building2,
  Hammer,
};

export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const service = await db.services.findUnique({
    where: { slug }
  });

  if (!service) {
    notFound();
  }

  const IconComponent = service.icon && iconMap[service.icon] ? iconMap[service.icon] : HardHat;

  return (
    <>
      <div className="bg-primary pt-32 pb-20 text-center relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container relative z-10 mx-auto px-4 xl:max-w-[1280px]">
          <div className="w-20 h-20 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-secondary">
            <IconComponent size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {service.title}
          </h1>
        </div>
      </div>

      <section className="py-20 bg-surface min-h-[50vh]">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
            <h2 className="text-3xl font-display font-bold text-text-dark mb-8">Service Overview</h2>
            
            <div className="prose prose-lg max-w-none text-text-medium mb-12">
              <div className="whitespace-pre-wrap">{service.description}</div>
            </div>

            {/* Example Feature List - Hardcoded for visual completeness, but could be dynamic later */}
            <div className="bg-surface rounded-xl p-8 border border-border">
              <h3 className="text-xl font-bold text-text-dark mb-6">Why Choose Us For This Service?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary shrink-0 mt-1" size={20} />
                  <p className="text-text-medium">Industry-leading safety standards</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary shrink-0 mt-1" size={20} />
                  <p className="text-text-medium">Experienced project managers</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary shrink-0 mt-1" size={20} />
                  <p className="text-text-medium">Transparent pricing & timelines</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary shrink-0 mt-1" size={20} />
                  <p className="text-text-medium">High-quality materials & finish</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}