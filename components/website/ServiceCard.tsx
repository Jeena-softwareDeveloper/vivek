'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, Home, Hammer, Sofa, Compass, Handshake } from 'lucide-react';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const defaultImages = [
    '/images/placeholder.jpg',
    '/images/placeholder.jpg',
    '/images/placeholder.jpg',
    '/images/placeholder.jpg',
    '/images/placeholder.jpg',
    '/images/placeholder.jpg',
  ];
  
  const imgUrl = service.image || defaultImages[index % defaultImages.length];

  // Map icons based on index to match design
  const icons = [Building2, Home, Hammer, Sofa, Compass, Handshake];
  const IconComponent = icons[index % icons.length];

  return (
    <Link href={`/services/${service.slug}`} className="block group">
      <div className="relative h-[280px] lg:h-[320px] rounded-lg overflow-hidden bg-slate-900 shadow-md transition-shadow hover:shadow-xl">
        <img
          src={imgUrl}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImages[index % defaultImages.length];
          }}
        />
        {/* Dark gradient overlay mainly at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050f24] via-[#050f24]/40 to-transparent opacity-80 transition-opacity duration-500" />
        
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-20">
          <h3 className="text-[20px] lg:text-[22px] font-display font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-200 transition-colors">
            {service.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-slate-300 text-[13px] mb-3">
            <IconComponent size={14} className="text-blue-400" />
            <span className="line-clamp-1">Professional Service</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[12px] mb-3 pb-3 border-b border-white/10">
             <div className="flex items-center gap-1.5">
                <Building2 size={14} className="text-blue-400" />
                <span className="truncate max-w-[120px]">Vivek Vijay & Co</span>
              </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-[14px] font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
            Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}