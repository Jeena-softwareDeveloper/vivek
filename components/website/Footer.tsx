import React from 'react';
import Link from 'next/link';
import { HardHat, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#081221] text-white pt-16 pb-8 border-t-[6px] border-[#0a42a8]">
      <div className="container mx-auto px-4 xl:max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <HardHat size={32} className="text-secondary" />
              <span className="text-2xl font-display font-bold uppercase tracking-wider">
                VIVEK VIJAY <span className="text-secondary">&amp; CO.</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Tamil Nadu's trusted engineering contractor since 2007 — delivering landmark infrastructure, institutional, and commercial projects with quality, safety, and precision.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <span className="font-bold text-sm">fb</span>
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <span className="font-bold text-sm">ig</span>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <span className="font-bold text-sm">in</span>
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <span className="font-bold text-sm">yt</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors">Our Services</Link></li>
              <li><Link href="/projects" className="hover:text-secondary transition-colors">Featured Projects</Link></li>
              <li><Link href="/gallery" className="hover:text-secondary transition-colors">Image Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6">Our Expertise</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Hospitals &amp; Healthcare</li>
              <li>Commercial Buildings</li>
              <li>Institutional Projects</li>
              <li>Industrial &amp; Warehouses</li>
              <li>Road &amp; Bridge Works</li>
              <li>Landscapes &amp; Green Spaces</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={24} className="text-secondary shrink-0 mt-0.5" />
                <span>16/5 Kumarasamy Street, Kalaimagal School Road, Erode – 638001, Tamilnadu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-secondary shrink-0" />
                <span>+91 98420 44777 / +91 96553 72227</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-secondary shrink-0" />
                <a href="mailto:support@vivekvijayandcompany.com" className="hover:text-white transition-colors">
                  support@vivekvijayandcompany.com
                </a>
              </li>
              <li className="text-sm text-gray-500">
                Mon – Sat: 9:00 AM – 7:00 PM<br />Sunday: Closed
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} VIVEK VIJAY AND COMPANY. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}