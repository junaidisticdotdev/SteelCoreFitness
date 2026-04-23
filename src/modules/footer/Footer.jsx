'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const Footer = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Social Media Icons ka data
  const socialIcons = [
    { 
      name: 'Facebook', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg> 
    },
    { 
      name: 'Twitter', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg> 
    },
    { 
      name: 'Instagram', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg> 
    },
    { 
      name: 'YouTube', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/></svg> 
    },
  ];

  return (
    <footer ref={ref} className="bg-neutral-950 text-white pt-20 pb-10 border-t border-neutral-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className={`flex flex-col md:flex-row justify-between items-center mb-16 border-b border-neutral-800 pb-12 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
              Ready to <span className="text-red-600">Transform?</span>
            </h2>
            <p className="text-gray-400 mt-2 ">JOIN THE ELITE COMMUNITY TODAY.</p>
          </div>
          
          {/* JOIN NOW LINK UPDATED */}
          <a href="/#contact">
            <button className="bg-red-600 px-6 py-3 cursor-pointer rounded-full hover:bg-white hover:text-red-600 transition-all duration-400 font-bold shadow-[0_0_20px_rgba(220,38,38,0.5)] transform ">
              JOIN NOW
            </button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className={`transition-all duration-1000 delay-100 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <Link to="/" onClick={handleScrollToTop} className="text-2xl font-black italic tracking-tighter text-red-600 uppercase block mb-6">
              STEEL CORE <span className=" text-white">FITNESS</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We are more than just a gym. We are a community of discipline, strength, and power. Forge your legacy with us.
            </p>
            
            {/* YAHAN ICONS UPDATE KIYE HAIN */}
            <div className="flex gap-4">
              {socialIcons.map((social, idx) => (
                <a key={idx} href="#" aria-label={social.name} className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300">
                   {social.icon}
                </a>
              ))}
            </div>

          </div>

          <div className={`transition-all duration-1000 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 text-white border-l-4 border-red-600 pl-3">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" onClick={handleScrollToTop} className="text-gray-400 hover:text-red-600 hover:translate-x-2 transition-all duration-300 block text-sm">Home</Link></li>
              <li><Link to="/about" onClick={handleScrollToTop} className="text-gray-400 hover:text-red-600 hover:translate-x-2 transition-all duration-300 block text-sm">About Us</Link></li>
              <li><Link to="/programs" onClick={handleScrollToTop} className="text-gray-400 hover:text-red-600 hover:translate-x-2 transition-all duration-300 block text-sm">Workout Plans</Link></li>
              <li><Link to="/trainers" onClick={handleScrollToTop} className="text-gray-400 hover:text-red-600 hover:translate-x-2 transition-all duration-300 block text-sm">Trainers</Link></li>
            </ul>
          </div>

          <div className={`transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 text-white border-l-4 border-red-600 pl-3">Opening Hours</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex justify-between border-b border-neutral-900 pb-2"><span>Mon - Fri</span><span className="text-white font-bold">5:00 AM - 11:00 PM</span></li>
              <li className="flex justify-between border-b border-neutral-900 pb-2"><span>Saturday</span><span className="text-white font-bold">6:00 AM - 9:00 PM</span></li>
              <li className="flex justify-between border-b border-neutral-900 pb-2"><span>Sunday</span><span className="text-red-600 font-bold">Closed</span></li>
            </ul>
          </div>

          <div className={`transition-all duration-1000 delay-400 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 text-white border-l-4 border-red-600 pl-3">Contact Us</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p>Dr Aslam Road, Bangla Gogera,<br/>Okara, Pakistan.</p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <p>+92 323 2662295</p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <p>info@steelcorefitness.com</p>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Steel Core Fitness. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;