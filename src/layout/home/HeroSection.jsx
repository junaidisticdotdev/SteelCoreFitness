'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- Custom Hook: Re-triggerable Animation ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isVisible];
};

const HeroSection = () => {
  const images = [
    "/Media/gymbackground.jpg",
    "/Media/gymbackground2.jpg",
    "/Media/gymbackground3.jpg",
    "/Media/gymbackground4.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentRef, isVisible] = useOnScreen({ threshold: 0.1 });

  // --- Background Change Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-left">
      
      {/* --- BACKGROUND SLIDER --- */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={img} 
            alt={`Gym Background ${index + 1}`} 
            className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-linear ${
              index === currentIndex ? 'scale-110' : 'scale-100'
            }`} 
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>
      ))}

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40 pt-10"> 
        
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 delay-300 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-y-0'  
              : 'opacity-0 translate-y-20'   
          }`}
        >
          
          <h2 className="text-white text-xs md:text-sm lg:text-base font-bold italic uppercase tracking-[0.3em] mb-4 flex flex-wrap items-center gap-2"> 
            Welcome to <span className='text-red-600 tracking-normal font-black text-sm md:text-xl lg:text-2xl'> STEEL CORE <span className='text-white tracking-normal font-black text-sm md:text-xl lg:text-xl'> FITNESS </span> </span> 
          </h2>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic text-white tracking-tighter mb-6 drop-shadow-2xl leading-[0.9]">
            BUILD YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">
              OWN EMPIRE<span className="text-red-600 ml-1">.</span>
            </span>
          </h1>

          <p className="text-gray-300 text-sm md:text-lg max-w-lg mb-10 leading-relaxed font-light">
            Push your limits and break barriers. Join the elite community dedicated to transforming bodies and minds.
          </p>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/#pricing" 
              className="px-8 py-3 bg-red-700 hover:bg-white hover:text-red-600 text-white font-bold text-sm rounded-full uppercase tracking-widest transition-all duration-400 shadow-[0_0_20px_rgba(220,38,38,0.4)] text-center"
            >
              Start Training
            </a>
            
            <Link 
              to="/programs" 
              onClick={handleScrollToTop}
              className="px-8 py-3 bg-transparent hover:bg-white hover:text-black text-white font-bold text-sm rounded-full uppercase tracking-widest transition-all duration-400 border border-white/50 text-center"
            >
              View Workout Plans
            </Link>
          </div>

        </div>

      </div>

      {/* --- SCROLL INDICATOR (Visual Extra) --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-[2px] h-12 bg-gradient-to-b from-red-600 to-transparent animate-bounce"></div>
      </div>

    </section>
  );
};

export default HeroSection;