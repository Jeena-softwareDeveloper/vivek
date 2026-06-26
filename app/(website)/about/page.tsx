import React from 'react';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { TeamMember } from '@/lib/models/TeamMember';
import { Testimonial } from '@/lib/models/Testimonial';
import { TeamCard } from '@/components/website/TeamCard';
import { TestimonialCarousel } from '@/components/website/TestimonialCarousel';
import { Target, Shield, Users, HardHat, Building2, CheckCircle2, Leaf, Award, Phone } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Vivek Vijay and Company — 18+ years of engineering excellence in Tamil Nadu. Our story, mission, values, and the expert team behind every landmark project.',
};

export default async function AboutPage() {
  let teamMembers: any[] = [];
  let testimonials: any[] = [];
  try {
    await connectDB();
    const [rawTeam, rawTestimonials] = await Promise.all([
      TeamMember.find().sort({ order: 1 }).lean(),
      Testimonial.find({ active: true }).lean()
    ]);
    teamMembers = JSON.parse(JSON.stringify(rawTeam.map((t: any) => ({ ...t, id: t._id?.toString() }))));
    testimonials = JSON.parse(JSON.stringify(rawTestimonials.map((t: any) => ({ ...t, id: t._id?.toString() }))));
  } catch (error) {
    console.error('Database error in AboutPage:', error);
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-40 pb-20 overflow-hidden bg-[#0f172a] min-h-[65vh] flex flex-col justify-center">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/building.png" 
            alt="Construction background" 
            className="w-full h-full object-cover object-[80%_center]"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent w-3/4"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 xl:max-w-[1280px] relative z-10 w-full">
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-display font-bold text-white mb-4 leading-tight drop-shadow-md">
            Building <span className="text-yellow-500">Tomorrow</span>,<br /> Together
          </h1>
          <p className="text-base md:text-[17px] text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
            For over 18 years, VIVEK VIJAY &amp; CO. has been pioneering architectural excellence and delivering world-class infrastructure across Tamil Nadu. We don&apos;t just construct buildings; we forge lasting legacies built on trust, innovation, and uncompromising quality.
          </p>
        </div>
      </div>

      {/* Our Story & Legacy */}
      <section className="pt-20 pb-10 md:pt-28 md:pb-12 bg-white">
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
                <p className="mb-6 text-justify">
                  Established in 2007, <strong>VIVEK VIJAY &amp; CO.</strong> has grown to become one of Tamil Nadu&apos;s most respected names in engineering and construction. For over 18 years, we have been a driving force behind state-of-the-art commercial complexes, residential properties, and critical infrastructure that redefine the skyline and empower communities.
                </p>
                <p className="mb-6 text-justify">
                  Our success is built on an uncompromising dedication to structural integrity, transparent project management, and cutting-edge construction methodologies. By integrating advanced technology with sustainable building practices, we deliver landmark projects that not only meet today&apos;s stringent standards but are engineered to stand the test of time.
                </p>
                <p className="text-justify">
                  From concept to completion, we function as a trusted partner to our clients. Our multi-disciplinary team of seasoned engineers, architects, and project managers work cohesively to ensure every structure we build reflects our core ethos: <em>Excellence in every brick, Trust in every transaction.</em>
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
                src="/images/engineer_logo_shirt.png" 
                alt="Our Engineers at Work" 
                className="rounded-2xl shadow-2xl w-full h-[400px] sm:h-[500px] object-cover object-[center_15%] relative z-10"
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
      <section className="pt-10 pb-20 md:pt-12 md:pb-28 bg-slate-50">
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

      {/* Board Members Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm block mb-2">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0f172a]">Board Members</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#0a42a8]/10 text-[#0a42a8] rounded-full flex items-center justify-center shrink-0">
                  <Users size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">S. Vivek Vijay</h3>
                  <p className="text-sm font-medium text-slate-500 mb-1">Managing Partner</p>
                  <a href="tel:+919842044777" className="text-base font-semibold text-[#0a42a8] flex items-center gap-2 mt-2 hover:underline">
                    <Phone size={16} /> +91 98420 44777
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#0a42a8]/10 text-[#0a42a8] rounded-full flex items-center justify-center shrink-0">
                  <Users size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">P. Ravikumar</h3>
                  <p className="text-sm font-medium text-slate-500 mb-1">Managing Partner</p>
                  <a href="tel:+919842470001" className="text-base font-semibold text-[#0a42a8] flex items-center gap-2 mt-2 hover:underline">
                    <Phone size={16} /> +91 98424 70001
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 xl:max-w-[1280px]">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm block mb-3">The People Behind the Projects</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0f172a] mb-4">Meet Our Team</h2>
              <p className="text-slate-600 text-lg">Experienced engineers, project managers, and construction specialists committed to delivering excellence on every build.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <TeamCard key={member.id} member={member as any} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 xl:max-w-[1280px]">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm block mb-3">What Our Clients Say</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0f172a] mb-4">Client Testimonials</h2>
              <p className="text-slate-600 text-lg">Real words from the government bodies, institutions, and businesses that trusted us to build their vision.</p>
            </div>
            <TestimonialCarousel testimonials={testimonials as any} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#0a42a8]">
        <div className="container mx-auto px-4 xl:max-w-[1280px] text-center">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-4">Ready to Build with Us?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Let's discuss how our 18+ years of engineering expertise can bring your next project to life.</p>
          <Link href="/contact">
            <button className="bg-[#FFB800] hover:bg-[#E5A600] text-black font-bold px-10 py-4 text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              Get in Touch →
            </button>
          </Link>
        </div>
      </section>

    </>
  );
}
