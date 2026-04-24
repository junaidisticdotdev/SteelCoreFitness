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
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg py-3'  
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center relative">
        
        {/* --- LOGO --- */}
        <div className="flex items-center z-[110] relative">
          <Link 
            to="/" 
            onClick={handleScrollToTop} 
            className="text-lg sm:text-xl md:text-2xl font-black italic tracking-tighter text-red-600 uppercase whitespace-nowrap"
          >
            STEEL CORE
            <span className="text-white ml-1">FITNESS</span>
          </Link>
        </div>

        {/* --- DESKTOP MENU --- */}
        <ul className="hidden lg:flex items-center gap-8 font-bold text-sm uppercase tracking-widest text-white">
          <li><Link to="/" onClick={handleScrollToTop} className="hover:text-red-600 transition-all">Home</Link></li>
          <li><Link to="/about" onClick={handleScrollToTop} className="hover:text-red-600 transition-all">About</Link></li>
          <li><Link to="/programs" onClick={handleScrollToTop} className="hover:text-red-600 transition-all">Work Out Plans</Link></li>
          <li><Link to="/trainers" onClick={handleScrollToTop} className="hover:text-red-600 transition-all">Trainers</Link></li>
          <li>
            <a href="/#contact" className="bg-red-600 px-6 py-2.5 rounded-full hover:bg-white hover:text-red-600 transition-all font-bold">
              Join Now
            </a>
          </li>
        </ul>

        {/* --- MOBILE BUTTONS --- */}
        <div className="flex items-center gap-3 lg:hidden z-[110] relative">
          <a 
            href="/#contact" 
            className="bg-red-600 px-4 py-2 rounded-full text-[10px] font-bold text-white uppercase"
          >
            Join
          </a>
          
          <button 
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div 
        className={`fixed inset-0 w-full h-screen bg-black transition-all duration-500 ease-in-out z-[90] ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          <Link to="/" onClick={handleScrollToTop} className="text-2xl font-bold text-white uppercase tracking-tighter">Home</Link>
          <Link to="/about" onClick={handleScrollToTop} className="text-2xl font-bold text-white uppercase tracking-tighter">About</Link>
          <Link to="/programs" onClick={handleScrollToTop} className="text-2xl font-bold text-white uppercase tracking-tighter">Work Out Plans</Link>
          <Link to="/trainers" onClick={handleScrollToTop} className="text-2xl font-bold text-white uppercase tracking-tighter">Trainers</Link>
          
          <a 
            href="/#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 w-full max-w-xs bg-red-600 text-white text-center py-4 rounded-xl font-black uppercase tracking-widest"
          >
            Join Now
          </a>
        </div>
      </div>

    </header>
  );
}

export default Header;