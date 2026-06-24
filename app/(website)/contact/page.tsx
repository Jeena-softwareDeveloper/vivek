import React from 'react';
import { ContactForm } from '@/components/website/ContactForm';
import { MapPin, Phone, Mail, Clock, Users } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | VIVEK VIJAY AND COMPANY',
  description: 'Get in touch with Vivek Vijay and Company — Tamil Nadu\'s trusted engineering contractor. Call, email or visit our Head Office in Erode.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-40 pb-20 overflow-hidden bg-[#0f172a] min-h-[65vh] flex flex-col justify-center">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/contact_hero_bg.png" 
            alt="Contact background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent w-3/4"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 xl:max-w-[1280px] relative z-10 w-full">
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-display font-bold text-white mb-4 leading-tight drop-shadow-md">
            Contact <span className="text-yellow-500">Us</span>
          </h1>
          <p className="text-base md:text-[17px] text-gray-200 leading-relaxed max-w-xl drop-shadow-md">
            Get in touch with our team of experts to discuss your next construction project.
          </p>
        </div>
      </div>

      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-6">Get In Touch</h3>
                <p className="text-text-medium mb-8">
                  We are ready to lead you into the future of construction. Fill out the form or reach us via the details below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">Head Office</h4>
                    <p className="text-text-medium">16/5 Kumarasamy Street,<br />Kalaimagal School Road,<br />Erode - 638001, Tamilnadu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">Phone</h4>
                    <p className="text-text-medium">
                      <a href="tel:+919842044777" className="hover:text-[#0a42a8] transition-colors">+91 98420 44777</a><br />
                      <a href="tel:+919842470001" className="hover:text-[#0a42a8] transition-colors">+91 98424 70001</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">Email</h4>
                    <a href="mailto:support@vivekvijayandcompany.in" className="text-text-medium hover:text-[#0a42a8] transition-colors">
                      support@vivekvijayandcompany.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">Working Hours</h4>
                    <p className="text-text-medium">Mon - Sat: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-slate-200">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-3">Board Members</h4>
                    <div className="text-text-medium space-y-4">
                      <p>
                        <strong className="text-slate-800">S. Vivek Vijay</strong><br/>
                        <span className="text-sm">Managing Partner</span><br/>
                        <a href="tel:+919842044777" className="hover:text-[#0a42a8] transition-colors">+91 98420 44777</a>
                      </p>
                      <p>
                        <strong className="text-slate-800">P. Ravikumar</strong><br/>
                        <span className="text-sm">Managing Partner</span><br/>
                        <a href="tel:+919842470001" className="hover:text-[#0a42a8] transition-colors">+91 98424 70001</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl shadow-sm border border-border">
              <h3 className="text-2xl font-bold text-text-dark mb-8">Send Us a Message</h3>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
      
      {/* Google Maps — Erode Head Office */}
      <div className="h-96 w-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.4178073855936!2d77.71396947495286!3d11.341208488877773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f35e0e44f2b%3A0x8e7b3e4e0f2e6b2a!2sKumarasamy%20St%2C%20Erode%2C%20Tamil%20Nadu%20638001!5e0!3m2!1sen!2sin!4v1719100000000!5m2!1sen!2sin"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}