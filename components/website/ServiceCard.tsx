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
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImages[index % fallbackImages.length];
          }}
        />
        {/* Dark gradient overlay mainly at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050f24] via-[#050f24]/60 to-transparent opacity-90 transition-opacity duration-500" />
        
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
          <div className="flex items-center gap-5">
            {/* Blue Icon Circle */}
            <div className="w-14 h-14 shrink-0 rounded-full bg-[#0a42a8]/90 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 group-hover:bg-[#0a42a8] transition-colors">
              <IconComponent size={24} strokeWidth={1.5} />
            </div>
            
            {/* Text container */}
            <div className="flex-1">
              <h3 className="text-xl font-display font-bold text-white mb-1.5 line-clamp-1 leading-tight group-hover:text-blue-100 transition-colors">
                {service.title}
              </h3>
              <div className="flex items-center gap-1.5 text-[13px] font-medium text-white/80 group-hover:text-white transition-colors">
                Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}