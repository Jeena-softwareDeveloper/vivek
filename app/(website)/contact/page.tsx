import React from 'react';
import { ContactForm } from '@/components/website/ContactForm';
import { MapPin, Phone, Mail, Clock, Users } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <div className="bg-primary pt-32 pb-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Contact <span className="text-secondary">Us</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
                    <p className="text-text-medium">+91 98420 44777<br />+91 98424 70001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">Email</h4>
                    <p className="text-text-medium">support@vivekvijayandcompany.in</p>
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
                        +91 98420 44777
                      </p>
                      <p>
                        <strong className="text-slate-800">P. Ravikumar</strong><br/>
                        <span className="text-sm">Managing Partner</span><br/>
                        +91 98424 70001
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
      
      {/* Map Strip placeholder */}
      <div className="h-96 w-full bg-gray-200">
         <iframe 
          src="https://www.google.co.in/maps/embed?pb=!1m18!1m12!1m3!1d193595.25279998183!2d-74.14448744577885!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1716900000000!5m2!1sen!2s" 
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