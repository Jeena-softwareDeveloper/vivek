"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

const mediaItems = [
  { type: 'video', src: '/images/image.mp4' },
  { type: 'video', src: '/images/herosection_v2.mp4' },
  { type: 'image', src: '/images/kolathur_angadi.png' }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger entrance animation after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  useEffect(() => {
    // Clear any existing timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setProgress(0);
    const currentMedia = mediaItems[currentIndex];

    // Handle videos
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (idx === currentIndex) {
          vid.currentTime = 0;
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              if (error.name !== 'AbortError') {
                console.warn("Auto-play failed:", error);
              }
            });
          }
        } else {
          vid.pause();
        }
      }
    });

    // Handle images (auto-advance after 5 seconds)
    if (currentMedia.type === 'image') {
      const duration = 5000;
      const intervalTime = 50;
      let elapsed = 0;

      intervalRef.current = setInterval(() => {
        elapsed += intervalTime;
        setProgress((elapsed / duration) * 100);
      }, intervalTime);

      timerRef.current = setTimeout(() => {
        handleNext();
      }, duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  return (
    <div className="relative pt-[104px] h-[65vh] min-h-[400px] md:h-[100vh] md:min-h-[700px] flex items-end pb-10 md:pb-14 overflow-hidden">

      {/* Keyframe animations injected inline */}
      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(36px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroLineGrow {
          from { width: 0; opacity: 0; }
          to   { width: 2rem; opacity: 1; }
        }
        .hero-anim {
          opacity: 0;
        }
        .hero-anim.visible {
          animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-line-anim {
          opacity: 0;
          width: 0;
        }
        .hero-line-anim.visible {
          animation: heroLineGrow 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Background Media */}
      <div className="absolute inset-0 z-0 bg-[#081221]">
        {mediaItems.map((item, index) => {
          const isActive = currentIndex === index;
          return (
            <div 
              key={item.src}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {item.type === 'video' ? (
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[index] = el;
                    }
                  }}
                  src={item.src}
                  muted
                  playsInline
                  onEnded={isActive ? handleNext : undefined}
                  onTimeUpdate={(e) => {
                    if (isActive) {
                      const vid = e.currentTarget;
                      setProgress((vid.currentTime / vid.duration) * 100);
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={item.src} 
                  alt={`Hero slide ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              )}
            </div>
          );
        })}
        {/* Smooth radial dark gradient in the bottom left corner behind text */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-black/90 via-black/10 to-transparent pointer-events-none z-20" />
      </div>

      {/* Video Navigation UI */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:left-auto md:translate-x-0 md:right-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-30 flex flex-row md:flex-col gap-3">
        {mediaItems.map((_, index) => {
          const isActive = currentIndex === index;
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative overflow-hidden transition-all duration-500 rounded-full ${
                isActive 
                  ? 'bg-white/20 w-10 h-2 md:w-2 md:h-10 shadow-[0_0_12px_rgba(255,255,255,0.1)]' 
                  : 'bg-white/40 w-4 h-1.5 md:w-1.5 md:h-4 hover:bg-white/80 hover:w-6 md:hover:w-1.5 md:hover:h-6'
              }`}
              aria-label={`Play slide ${index + 1}`}
            >
              {isActive && (
                <>
                  {/* Horizontal progress for mobile */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-secondary shadow-[0_0_12px_rgba(10,66,168,0.8)] transition-all duration-75 md:hidden"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Vertical progress for desktop */}
                  <div 
                    className="absolute top-0 left-0 w-full bg-secondary shadow-[0_0_12px_rgba(10,66,168,0.8)] transition-all duration-75 hidden md:block"
                    style={{ height: `${progress}%` }}
                  />
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Hero Content with staggered entrance animations */}
      <div className="relative z-30 w-full px-4 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 md:gap-8 pr-12 md:pr-24">
        <div className="text-left max-w-3xl">

          {/* Eyebrow label — animates first */}
          <div
            className={`hero-anim flex items-center gap-3 mb-4 md:mb-5 ${mounted ? 'visible' : ''}`}
            style={{ animationDelay: '0ms' }}
          >
            <span
              className={`hero-line-anim h-[2px] bg-[#FFB800] inline-block ${mounted ? 'visible' : ''}`}
              style={{ animationDelay: '120ms' }}
            />
            <span className="text-[#FFB800] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase drop-shadow">
              18+ Years of Proven Excellence
            </span>
          </div>

          {/* Headline — animates second */}
          <h1
            className={`hero-anim text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg ${mounted ? 'visible' : ''}`}
            style={{ animationDelay: '180ms' }}
          >
            Built to Last. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-secondary drop-shadow-lg">
              Designed to Inspire.
            </span>
          </h1>

          {/* Subtitle — animates third */}
          <p
            className={`hero-anim text-base sm:text-lg md:text-xl text-gray-200 mb-0 lg:mb-10 mr-auto leading-relaxed drop-shadow-md max-w-2xl ${mounted ? 'visible' : ''}`}
            style={{ animationDelay: '340ms' }}
          >
            From iconic commercial landmarks to thoughtfully crafted residences — we engineer spaces that shape Tamil Nadu's skyline and stand the test of time.
          </p>
        </div>

        {/* CTA Buttons — animate last */}
        <div
          className={`hero-anim flex flex-row items-center justify-start lg:justify-end gap-2 sm:gap-4 w-full lg:w-auto shrink-0 mt-2 md:mt-0 ${mounted ? 'visible' : ''}`}
          style={{ animationDelay: '500ms' }}
        >
            <Link href="/projects" className="flex-1 sm:flex-none">
              <Button className="w-full sm:w-auto px-1 sm:px-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-[12px] sm:text-base h-11 sm:h-12 whitespace-nowrap">
                Explore Our Work
              </Button>
            </Link>
            <Link href="/contact" className="flex-1 sm:flex-none">
              <Button className="w-full sm:w-auto px-1 sm:px-8 text-[12px] sm:text-base h-11 sm:h-12 bg-[#FFB800] hover:bg-[#E5A600] text-black font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group gap-1 sm:gap-2 whitespace-nowrap border-none">
                Start Your Project <ArrowRight size={14} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}