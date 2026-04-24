'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 transform ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg py-3'  
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* --- LOGO --- */}
        <div className="flex items-center z-[60] flex-shrink-0">
          <Link 
            to="/" 
            onClick={handleScrollToTop} 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black italic tracking-tighter text-red-600 uppercase drop-shadow-md whitespace-nowrap"
          >
            STEEL CORE
            <span className="text-white ml-1 sm:ml-2 text-sm sm:text-base md:text-lg lg:text-2xl">FITNESS</span>
          </Link>
        </div>

        {/* --- DESKTOP MENU --- 
            FIX: Changed md:flex to lg:flex because items are too many for 768px tablet width.
        */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-8 font-bold text-[11px] xl:text-sm uppercase tracking-[0.15em] text-white">
          <li>
            <Link to="/" onClick={handleScrollToTop} className="hover:text-red-600 transition-colors duration-300 relative group">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleScrollToTop} className="hover:text-red-600 transition-colors duration-300 relative group">
              About
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/programs" onClick={handleScrollToTop} className="hover:text-red-600 transition-colors duration-300 relative group whitespace-nowrap">
              Work Out Plans
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/trainers" onClick={handleScrollToTop} className="hover:text-red-600 transition-colors duration-300 relative group">
              Trainers
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
         
          <li className="ml-2">
            <a 
              href="/#contact" 
              className="bg-red-600 px-4 xl:px-6 py-2.5 rounded-full hover:bg-white hover:text-red-600 transition-all duration-400 font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)] whitespace-nowrap"
            >
              Join Now
            </a>
          </li>
        </ul>

        {/* --- MOBILE/TABLET MENU BUTTON --- 
            FIX: Changed md:hidden to lg:hidden
        */}
        <div className="flex items-center gap-3 lg:hidden z-[60]">
          {!isMobileMenuOpen && (
            <a 
              href="/#contact" 
              className="bg-red-600 px-4 py-2 rounded-full text-[10px] font-bold text-white uppercase shadow-lg active:scale-95 whitespace-nowrap"
            >
              Join
            </a>
          )}
          
          <button 
            className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
              <span className={`absolute left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'top-2'}`}></span>
              <span className={`absolute left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></span>
            </div>
          </button>
        </div>

      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div 
        className={`fixed inset-0 bg-black/98 backdrop-blur-xl flex flex-col items-center justify-between transition-all duration-500 z-40 pt-24 pb-12 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ height: '100vh', overflowY: 'auto' }}
      >
        <div className="mb-8">
          <span className="text-3xl font-black italic tracking-tighter text-red-600">
            STEEL CORE
            <span className="text-white ml-2 text-xl">FITNESS</span>
          </span>
        </div>

        <div className="w-full max-w-md mx-auto px-6 flex-1 flex flex-col justify-center gap-4">
            <Link to="/" onClick={closeMobileMenu} className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
              <span className="text-xl font-bold text-white">Home</span>
            </Link>
            <Link to="/about" onClick={closeMobileMenu} className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
              <span className="text-xl font-bold text-white">About</span>
            </Link>
            <Link to="/programs" onClick={closeMobileMenu} className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
              <span className="text-xl font-bold text-white">Work Out Plans</span>
            </Link>
            <Link to="/trainers" onClick={closeMobileMenu} className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
              <span className="text-xl font-bold text-white">Trainers</span>
            </Link>
          
        </div>

        <div className="w-full max-w-md mx-auto px-6 mt-8">
          <a href="/#contact" onClick={closeMobileMenu} className="block w-full bg-red-600 text-white text-center py-4 rounded-2xl font-bold uppercase">
            Join Now
          </a>
        </div>
      </div>

    </header>
  );
}

export default Header;