'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- Custom Hook for Scroll Animation ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]); 

  return [ref, isVisible];
};

const ContactSection = () => {
  const [contentRef, isVisible] = useOnScreen({ threshold: 0.1, rootMargin: "50px" });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goal: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, goal } = formData;
    const whatsappNumber = "923232662295"; 
    const message = `*New Application from Steel Core Fitness*%0a%0a*Name:* ${firstName} ${lastName}%0a*Email:* ${email}%0a*Phone:* ${phone}%0a*Goal:* ${goal}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    /* FIX 1: h-[calc(100vh-80px)] ko min-h-screen se replace kiya aur overflow-hidden ko auto/visible rakha */
    <section id="contact" className="bg-neutral-950 min-h-screen flex flex-col justify-center py-16 lg:py-24 relative overflow-visible">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic text-white uppercase tracking-tighter mb-2">
              Join The <span className="text-red-600">Elite</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xs md:text-sm">
              Ready to forge your legacy? Drop your details below and our team will get in touch with you immediately.
            </p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            
            {/* Left Side: Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-neutral-950 p-6 border border-red-800 rounded-sm shadow-xl hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] duration-300 transition-all group">
                <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-full mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-1">Location</h3>
                <p className="text-gray-400 text-xs md:text-sm">Dr Aslam Road, Bangla Gogera,<br/>Okara, Pakistan.</p>
              </div>

              <div className="bg-neutral-950 p-6 border border-red-800 rounded-sm shadow-xl hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] duration-300 transition-all group">
                <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-full mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-1">Call Us</h3>
                <p className="text-gray-400 text-xs md:text-sm">+92 323 2662295<br/>Mon - Sat, 5AM - 11PM</p>
              </div>

              <div className="bg-neutral-950 p-6 border border-red-800 rounded-sm shadow-xl hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] duration-300 transition-all group">
                <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-full mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-1">Email Us</h3>
                <p className="text-gray-400 text-xs md:text-sm">info@steelcore.com<br/>support@steelcore.com</p>
              </div>

              <div className="bg-neutral-950 p-6 border border-red-800 rounded-sm shadow-xl hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] duration-300 transition-all group">
                <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-full mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-1">Hours</h3>
                <p className="text-gray-400 text-xs md:text-sm">Mon-Fri: 5:00 AM - 11:00 PM<br/><span className="text-red-500">Sunday: Closed</span></p>
              </div>
            </div>

            {/* Right Side: Form - Padding aur alignment fix */}
            <div className="relative">
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              <form 
                className="relative flex flex-col gap-5 bg-neutral-900/90 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-red-900/30 shadow-2xl" 
                onSubmit={handleSubmit}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First Name" 
                    className="flex-1 bg-neutral-800 border border-neutral-700/50 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all rounded-sm" 
                  />
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last Name" 
                    className="flex-1 bg-neutral-800 border border-neutral-700/50 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all rounded-sm" 
                  />
                </div>
                
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address" 
                  className="w-full bg-neutral-800 border border-neutral-700/50 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all rounded-sm" 
                />
                
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number" 
                  className="w-full bg-neutral-800 border border-neutral-700/50 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all rounded-sm"  
                />
                
                <textarea 
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                  placeholder="Your Fitness Goal..." 
                  rows="4" 
                  className="w-full bg-neutral-800 border border-neutral-700/50 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all rounded-sm" 
                ></textarea>
                
                <button 
                  type="submit" 
                  className="group relative w-full py-4 mt-2 bg-red-600 text-white font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 rounded-sm cursor-pointer shadow-lg hover:shadow-red-600/40"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Submit Application
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;