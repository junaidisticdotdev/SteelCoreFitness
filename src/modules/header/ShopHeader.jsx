import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShopHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  // Scroll Detection Logic
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) setShowHeader(false);
      else setShowHeader(true);
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3 md:py-4'  
          : 'bg-white py-4 md:py-6 border-b border-gray-200' 
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* --- LOGO (Dark Text) --- */}
        <div className="flex items-center z-[60]">
          <Link 
            to="/" 
            onClick={handleScrollToTop} 
            className="text-xl sm:text-2xl md:text-3xl font-black italic tracking-tighter text-red-600 uppercase drop-shadow-sm whitespace-nowrap"
          >
            STEEL CORE
            <span className="text-gray-900 ml-1 sm:ml-2 text-sm sm:text-base md:text-xl">FITNESS</span>
          </Link>
        </div>

        {/* --- DESKTOP MENU (Dark Text) --- */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-8 font-bold text-xs uppercase tracking-[0.2em] text-gray-800">
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
            <Link to="/programs" onClick={handleScrollToTop} className="hover:text-red-600 transition-colors duration-300 relative group">
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
          <li>
            <Link to="/shop" onClick={handleScrollToTop} className="text-red-600 transition-colors duration-300 relative group">
              Shop
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-600 transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <a 
              href="/#contact" 
              className="bg-red-600 text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-red-600 transition-all duration-400 font-bold shadow-[0_0_20px_rgba(220,38,38,0.5)] transform hover:scale-105"
            >
              Join Now
            </a>
          </li>
        </ul>

        {/* --- MOBILE MENU BUTTON (Dark Icon) --- */}
        <div className="flex items-center gap-3 md:hidden z-[60]">
          {!isMobileMenuOpen && (
            <a 
              href="/#contact" 
              className="bg-red-600 px-4 py-2 rounded-full text-xs font-bold text-white uppercase shadow-md hover:bg-black transition-all active:scale-95 whitespace-nowrap"
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
              <span className={`absolute left-0 w-full h-0.5 bg-gray-900 transform transition-all duration-300 ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
              <span className={`absolute left-0 w-full h-0.5 bg-gray-900 transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'top-2'}`}></span>
              <span className={`absolute left-0 w-full h-0.5 bg-gray-900 transform transition-all duration-300 ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></span>
            </div>
          </button>
        </div>

      </nav>

      {/* --- MOBILE MENU OVERLAY (Light Theme) --- */}
      <div 
        className={`fixed inset-0 bg-white/98 backdrop-blur-xl flex flex-col items-center justify-between transition-all duration-500 z-40 pt-24 pb-12 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ height: '100vh', overflowY: 'auto' }}
      >
        <div className="mb-8">
          <span className="text-3xl font-black italic tracking-tighter text-red-600">
            STEEL CORE
            <span className="text-gray-900 ml-2 text-xl">FITNESS</span>
          </span>
        </div>

        <div className="w-full max-w-md mx-auto px-6 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-3">
            <Link to="/" onClick={closeMobileMenu} className="group relative bg-gray-50 hover:bg-red-50 rounded-2xl p-5 transition-all duration-300 border border-gray-200">
              <span className="text-2xl font-bold text-gray-900 block group-hover:text-red-600">Home</span>
            </Link>
            <Link to="/about" onClick={closeMobileMenu} className="group relative bg-gray-50 hover:bg-red-50 rounded-2xl p-5 transition-all duration-300 border border-gray-200">
              <span className="text-2xl font-bold text-gray-900 block group-hover:text-red-600">About</span>
            </Link>
            <Link to="/programs" onClick={closeMobileMenu} className="group relative bg-gray-50 hover:bg-red-50 rounded-2xl p-5 transition-all duration-300 border border-gray-200">
              <span className="text-2xl font-bold text-gray-900 block group-hover:text-red-600">Work Out Plans</span>
            </Link>
            <Link to="/trainers" onClick={closeMobileMenu} className="group relative bg-gray-50 hover:bg-red-50 rounded-2xl p-5 transition-all duration-300 border border-gray-200">
              <span className="text-2xl font-bold text-gray-900 block group-hover:text-red-600">Trainers</span>
            </Link>
            <Link to="/shop" onClick={closeMobileMenu} className="group relative bg-red-50 rounded-2xl p-5 transition-all duration-300 border border-red-200">
              <span className="text-2xl font-bold text-red-600 block">Shop</span>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto px-6 mt-8">
          <a 
            href="/#contact" 
            onClick={closeMobileMenu}
            className="block w-full bg-red-600 text-white text-center py-4 rounded-2xl font-bold text-lg uppercase tracking-wider shadow-lg hover:bg-black transition-colors"
          >
            Join Now - Start Your Journey
          </a>
        </div>
      </div>

    </header>
  );
}

export default ShopHeader;