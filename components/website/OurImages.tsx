'use client';

import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function OurImages({ items = [] }: { items?: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  if (!items || items.length === 0) {
    return null;
  }

  const displayItems = items.map(item => item.url);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8; // Scroll by 80% of container width
      
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />

      <div className="container mx-auto px-4 xl:max-w-[1280px]">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-[44px] font-display font-extrabold text-[#0f172a] mb-6 tracking-tight">
            OUR GALLERY
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            Explore a visual journey of our iconic projects, construction processes, and the dedicated teams behind our success.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Arrows */}
          <button 
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#0a42a8] text-white items-center justify-center shadow-lg hover:bg-[#083587] transition-colors z-10 focus:outline-none"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#0a42a8] text-white items-center justify-center shadow-lg hover:bg-[#083587] transition-colors z-10 focus:outline-none"
          >
            <ArrowRight size={24} />
          </button>

          {/* Scrolling Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {displayItems.map((src, idx) => (
              <div 
                key={idx} 
                className="w-[85vw] md:w-[45vw] lg:w-[calc(25%_-_18px)] flex-shrink-0 h-[300px] md:h-[400px] snap-center rounded-3xl overflow-hidden shadow-md group relative cursor-pointer"
              >
                <img 
                  src={src} 
                  alt={`Gallery Image ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/40">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
