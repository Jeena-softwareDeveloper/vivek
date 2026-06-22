'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Building2, Home, Landmark } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  // Determine icon based on category
  const categoryLower = project.category.toLowerCase();
  let CategoryIcon = Landmark;
  if (categoryLower.includes('commercial') || categoryLower.includes('industrial')) CategoryIcon = Building2;
  if (categoryLower.includes('residential') || categoryLower.includes('villa') || categoryLower.includes('apartment')) CategoryIcon = Home;

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div className="relative h-[320px] lg:h-[380px] rounded-2xl overflow-hidden bg-slate-900 shadow-lg border border-white/10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[#0a42a8]/20">
        
        {/* Background Image */}
        <img
          src={project.coverImage || (project.images && project.images.length > 0 ? project.images[0] : '/images/placeholder.jpg')}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050f24] via-[#050f24]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Category Badge */}
        <div className="absolute top-5 left-5 z-20">
          <div className="bg-[#0a42a8] text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5">
            <CategoryIcon size={14} />
            {project.category}
          </div>
        </div>

        {/* Content Box at Bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-20">
          <h3 className="text-[20px] lg:text-[22px] font-display font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-200 transition-colors">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-slate-300 text-[13px] mb-3">
            <MapPin size={14} className="text-[#0a42a8]" />
            <span className="line-clamp-1">{project.location || 'Multiple Locations'}</span>
          </div>

          {/* Details Row */}
          <div className="flex items-center gap-4 text-slate-400 text-[12px] mb-3 pb-3 border-b border-white/10">
            {project.client && (
              <div className="flex items-center gap-1.5">
                <Building2 size={14} className="text-[#0a42a8]" />
                <span className="truncate max-w-[120px]">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#0a42a8]" />
                <span>Completed: {project.year}</span>
              </div>
            )}
          </div>
          
          {/* Action Link */}
          <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#0a42a8] group-hover:text-blue-400 transition-colors">
            View Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}