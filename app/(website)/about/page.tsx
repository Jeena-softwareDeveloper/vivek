import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { TeamCard } from '@/components/website/TeamCard';
import { TestimonialCarousel } from '@/components/website/TestimonialCarousel';
import { Target, Shield, Users, HardHat, Building2, CheckCircle2, Leaf, Award } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const [teamMembers, testimonials] = await Promise.all([
    db.team_members.findMany({ orderBy: { order: 'asc' } }),
    db.testimonials.findMany({ where: { active: true } })
  ]);

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-[#081221]">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/building.png" 
            alt="Construction background" 
            className="w-full h-full object-cover object-[75%_center] opacity-60"
          />
          {/* Gradients to keep text readable on left but image clear on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#081221] via-[#081221]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#081221] via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 xl:max-w-[1280px] relative z-10">
          <div className="max-w-3xl text-left">
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-[#0a42a8]">Tomorrow</span>,<br /> Together
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-10 drop-shadow-md">
              VIVEK VIJAY &amp; CO. has been shaping Tamil Nadu's skyline and delivering engineering excellence since 2007. We don&apos;t just build structures; we build trust, communities, and lasting legacies.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story & Legacy */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <div className="mb-6">
                <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm block mb-3">Our History</span>
                <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0f172a] mb-6 leading-tight">
                  A Legacy of Excellence Since 2007
                </h2>
                <div className="w-16 h-[4px] bg-[#0a42a8] mb-8"></div>
              </div>
              
              <div className="prose prose-lg text-slate-600 mb-10 leading-relaxed">
                <p className="mb-6">
                  As a premier engineering contractor in Tamil Nadu, India, we have been at the forefront of infrastructure development since 2007. With many years of experience, we bring a comprehensive range of capabilities to major infrastructure projects, demonstrating an unwavering commitment to quality, safety, and efficiency.
                </p>
                <p>
                  Our integrated approach and adaptability enable us to deliver exceptional results across various sectors. Each project is meticulously monitored to ensure maximum utilization of materials, structural integrity, and timely completion. Our dedication to excellence has established us as a trusted leader in the industry, consistently meeting the highest standards of construction and engineering.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0a42a8] shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f172a] text-lg mb-1">Our Mission</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">To deliver exceptional, high-quality structures that inspire communities and stand the ultimate test of time.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0a42a8] shrink-0">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f172a] text-lg mb-1">Our Vision</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">To be the most trusted and innovative engineering contractor across Tamil Nadu and South India, setting the gold standard for quality infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Images */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#0a42a8]/10 rounded-full blur-2xl z-0"></div>
              <img 
                src="/images/man_wrtiong.png" 
                alt="Our Engineers at Work" 
                className="rounded-2xl shadow-2xl w-full h-[400px] sm:h-[500px] object-cover relative z-10"
              />
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-11/12 sm:w-auto sm:translate-x-0 sm:-left-6 md:-left-12 bg-[#0a42a8] text-white p-6 rounded-xl shadow-2xl z-20 md:max-w-[220px] flex flex-col items-center sm:items-start text-center sm:text-left">
                <Award size={32} className="mb-3 text-white/80" />
                <div className="text-4xl font-extrabold mb-2">18+</div>
                <div className="text-sm font-medium leading-snug">Years of Engineering Mastery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-28 bg-[#f8fafc]">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm block mb-3">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0f172a] mb-6">Our Core Values</h2>
            <p className="text-slate-600 text-lg">These foundational principles guide every project we undertake and every relationship we build.</p>
          </div>

          <div className="bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none border border-slate-100 md:border-none overflow-hidden md:overflow-visible">
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8 divide-y divide-slate-100 md:divide-y-0">
              {[
                {
                  title: "Uncompromising Quality",
                  desc: "We adhere strictly to international standards, ensuring that every brick laid is a testament to perfection."
                },
                {
                  title: "Safety First",
                  desc: "The safety of our workforce and clients is our absolute priority. We maintain zero-tolerance safety policies."
                },
                {
                  title: "Innovation",
                  desc: "We leverage modern technology, from BIM modeling to sustainable materials, pushing construction boundaries."
                },
                {
                  title: "Sustainability",
                  desc: "We are committed to green building practices that minimize environmental impact and maximize energy efficiency."
                }
              ].map((value, idx) => (
                <div key={idx} className="p-6 md:p-8 md:bg-white md:rounded-2xl md:shadow-sm md:border md:border-slate-100 md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-[#0f172a] mb-2 md:mb-3 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0a42a8] md:hidden shrink-0"></span>
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed pl-5 md:pl-0">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




    </>
  );
}
