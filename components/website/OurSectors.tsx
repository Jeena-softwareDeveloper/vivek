import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/db';



export async function OurSectors() {
  const dbServices = await db.services.findMany({
    orderBy: { order: 'asc' },
    take: 3,
  });

  const displaySectors = dbServices.map(s => ({
    title: s.title,
    description: s.shortDesc || s.description.substring(0, 100) + '...',
    image: s.image || '/images/placeholder.jpg',
    link: `/services/${s.slug}`
  }));

  return (
    <section className="py-20 bg-[#f4f7f9] relative overflow-hidden">
      <div className="container mx-auto px-4 xl:max-w-[1280px]">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-[44px] font-display font-extrabold text-[#0f172a] mb-6 tracking-tight">
            OUR SECTORS
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            From hospitals and institutions to warehouses, bridges, and green spaces — we bring deep expertise across every major construction sector in Tamil Nadu.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Arrows */}
          <button className="hidden lg:flex absolute -left-16 top-[45%] -translate-y-1/2 w-14 h-14 rounded-full bg-[#0a42a8] text-white items-center justify-center shadow-lg hover:bg-[#083587] transition-colors z-10 focus:outline-none">
            <ArrowLeft size={24} />
          </button>
          <button className="hidden lg:flex absolute -right-16 top-[45%] -translate-y-1/2 w-14 h-14 rounded-full bg-[#0a42a8] text-white items-center justify-center shadow-lg hover:bg-[#083587] transition-colors z-10 focus:outline-none">
            <ArrowRight size={24} />
          </button>

          {displaySectors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displaySectors.map((sector, idx) => (
                <Link href={sector.link} key={idx} className="bg-white rounded-3xl p-8 pb-0 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-300 group flex flex-col h-[420px] overflow-hidden">
                  {/* Top Right Icon */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-[#0a42a8] text-white flex items-center justify-center rounded-[4px] cursor-pointer hover:bg-[#083587] transition-colors">
                    <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4 pr-12 leading-tight">
                    {sector.title}
                  </h3>
                  
                  <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
                    {sector.description}
                  </p>
                  
                  {/* Bottom Image */}
                  <div className="mt-auto relative h-48 w-full -mx-4 px-4 pb-4">
                    <img src={sector.image} alt={sector.title} className="w-full h-full object-cover rounded-2xl" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-slate-100">
              <p className="text-slate-500">No sectors/services added yet. Please add them in the admin panel.</p>
            </div>
          )}

          <div className="mt-10 md:mt-12 flex justify-center w-full">
            <Link href="/services">
              <Button size="lg" className="rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white px-8 h-12 text-[14px] md:text-base font-medium">
                View All Sectors <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
