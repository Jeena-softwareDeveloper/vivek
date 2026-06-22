'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col bg-gradient-to-b from-[#0a1230] via-[#0a1230]/90 to-transparent">
      {/* Top Bar */}
      <div className="hidden lg:flex border-b border-white/10 text-gray-300 text-[13px] py-2">
        <div className="container mx-auto px-4 xl:max-w-[1280px] flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919842044777" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} className="text-gray-300" /> +91 98420 44777
            </a>
            <a href="mailto:support@vivekvijayandcompany.in" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} className="text-gray-300" /> support@vivekvijayandcompany.in
            </a>
            <span className="flex items-center gap-2 hidden xl:flex text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              16/5 Kumarasamy Street, Kalaimagal School Road, Erode - 638001, Tamilnadu
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="text-white w-full pb-2 pt-1 relative z-10">
        <div className="container mx-auto px-4 xl:max-w-[1280px] flex items-center justify-between">
          {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group -ml-2">
          <Image
            src="/images/logo.png"
            alt="Vivek Vijay & Co. Logo"
            width={72}
            height={72}
            className="object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col justify-center ml-1">
            <span className="text-[13px] sm:text-[22px] leading-none font-serif font-bold uppercase tracking-wide drop-shadow-md text-white mb-1 whitespace-nowrap">
              VIVEK VIJAY AND COMPANY
            </span>
            <div className="w-full h-[1px] bg-white/60 mb-1.5"></div>
            <span className="text-[7.5px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.3em] text-white/90 font-medium uppercase whitespace-nowrap">
              Engineering Contractors
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[14px] font-semibold transition-colors hover:text-white flex items-center gap-1 pb-1 border-b-2 ${
                  pathname === link.href ? 'text-white border-[#FFB800]' : 'text-gray-300 border-transparent'
                }`}
              >
                {link.name}
                {link.name === 'Services' && <ChevronDown size={14} className="opacity-70 mt-0.5" />}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white hover:text-secondary focus:outline-none p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full shadow-xl border-t border-white/10" style={{ background: 'linear-gradient(135deg, rgba(5,10,30,0.88) 0%, rgba(10,25,65,0.78) 60%, rgba(0,70,150,0.6) 100%)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
          <nav className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  pathname === link.href ? 'text-secondary' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}