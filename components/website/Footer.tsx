import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 xl:max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image 
                src="/images/logo.png" 
                alt="Vivek Vijay & Co. Logo" 
                width={70} 
                height={70} 
                className="object-contain"
              />
              <div>
                <div className="text-lg font-display font-bold uppercase tracking-wider leading-tight text-white">
                  VIVEK VIJAY &amp; CO.
                </div>
                <div className="text-[10px] tracking-widest text-white uppercase mt-1">Engineering Contractors</div>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Tamil Nadu's trusted engineering contractor since 2007 — delivering landmark infrastructure, institutional, and commercial projects with quality, safety, and precision.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Clock size={16} className="text-[#C89B3C] shrink-0" />
              <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-[#C89B3C] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#C89B3C] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#C89B3C] transition-colors">Our Services</Link></li>
              <li><Link href="/projects" className="hover:text-[#C89B3C] transition-colors">Featured Projects</Link></li>
              <li><Link href="/gallery" className="hover:text-[#C89B3C] transition-colors">Image Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-[#C89B3C] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6 text-white">Our Expertise</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Hospitals &amp; Healthcare</li>
              <li>Commercial Buildings</li>
              <li>Institutional Projects</li>
              <li>Industrial &amp; Warehouses</li>
              <li>Road &amp; Bridge Works</li>
              <li>Landscapes &amp; Green Spaces</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C89B3C] shrink-0 mt-0.5" />
                <span>16/5 Kumarasamy Street, Kalaimagal School Road, Erode – 638001, Tamilnadu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#C89B3C] shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919842044777" className="hover:text-white transition-colors">+91 98420 44777</a>
                  <a href="tel:+919842470001" className="hover:text-white transition-colors">+91 98424 70001</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#C89B3C] shrink-0" />
                <a href="mailto:support@vivekvijayandcompany.in" className="hover:text-white transition-colors">
                  support@vivekvijayandcompany.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} VIVEK VIJAY AND COMPANY. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-gray-600 text-xs">Engineering Excellence Since 2007 · Erode, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}