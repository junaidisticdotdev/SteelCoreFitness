'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- Modified Scroll Hook (Re-triggers Animation) ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const GallerySection = () => {
  // --- Data (Fixed Paths) ---
  const images = [
        "/Media/crossfit.png",

    "/Media/GlennPendlay.jpg",
    "/Media/HanyRambod.webp",
    "/Media/ScottPanchik.jpg",
    "/Media/image1.jpg",
    "/Media/image2.jpg",
    "/Media/image3.jpg",
    "/Media/image4.jpg",
    "/Media/calisthenics.png",
    "/Media/cardio.webp",
         "/Media/bodybuilding.webp",

    "/Media/weightlifting.jpg",
   
  ];

  // --- Slider Logic ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(1);
  
  // Animation Ref
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  useEffect(() => {
    const handleResize = () => {
      setItemsPerScreen(window.innerWidth < 768 ? 1 : 4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < images.length - itemsPerScreen) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); 
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(images.length - itemsPerScreen);
    }
  };

  return (
    <section id="gallery" className="bg-neutral-950 py-24 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-900/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- ANIMATED TEXT HEADER --- */}
        <div ref={ref} className="text-center mb-16 overflow-hidden">
          
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter mb-4">
              Our <span className="text-red-600">Atmosphere</span>
            </h2>
          </div>

          <div className={`transition-all duration-1000 ease-out delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Step inside the iron paradise. Where focus meets fury. Take a look at where legends are made.
            </p>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
          </div>
        </div>

        {/* --- SLIDER AREA --- */}
        <div className={`relative group/slider transition-all duration-1000 ease-out delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Left Button (<) */}

          
       <button
  onClick={prevSlide}
  title="Previous Slide"
  style={{ transformStyle: 'preserve-3d' }}
  className="group absolute left-0 lg:left-15 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-20 z-20 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]  text-white  shadow-[0_0_15px_rgba(220,38,38,0.5)] transform-gpu will-change-transform bg-red-600 border-red-600/80 hover:scale-110 hover:shadow-[0_20px_60px_-15px_rgba(220,38,38,0.6)] active:scale-95 group-hover/slider:opacity-100 cursor-pointer"
>
  {/* Hover white overlay */}
  <div 
    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform-gpu"
    style={{ transformStyle: 'preserve-3d' }}
  ></div>

  {/* Icons container */}
  <div 
    className="relative flex items-center transition-transform duration-500 group-hover:-translate-x-[150%] transform-gpu will-change-transform"
    style={{ transformStyle: 'preserve-3d' }}
  >
    
    {/* Main Left Arrow */}
    <svg 
      className="w-6 h-6 text-white" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>

    {/* Secondary Left Arrow (Hover) */}
    <svg 
      className="absolute left-[150%] w-6 h-6 text-white" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
    
  </div>
</button>

          {/* Right Button (>) */}
         <button
  onClick={nextSlide}
  title="Next Slide"
  style={{ transformStyle: 'preserve-3d' }}
  className="group absolute right-0 lg:right-15 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-20 z-20 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]  text-white  shadow-[0_0_15px_rgba(220,38,38,0.5)] transform-gpu will-change-transform bg-red-600 border-red-600/80 hover:scale-110 hover:shadow-[0_20px_60px_-15px_rgba(220,38,38,0.6)] active:scale-95  group-hover/slider:opacity-100 cursor-pointer"
>
  {/* Hover white overlay */}
  <div 
    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform-gpu"
    style={{ transformStyle: 'preserve-3d' }}
  ></div>

  {/* Icons container - Ye ab right ki taraf slide karega */}
  <div 
    className="relative flex items-center transition-transform duration-500 group-hover:translate-x-[150%] transform-gpu will-change-transform"
    style={{ transformStyle: 'preserve-3d' }}
  >
    
    {/* Main Right Arrow */}
    <svg 
      className="w-6 h-6 text-white" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>

    {/* Secondary Right Arrow (Jo piche se aayega) */}
    <svg 
      className="absolute right-[150%] w-6 h-6 text-white" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
    
  </div>
</button>
          {/* --- Images Track --- */}
          <div className="overflow-hidden w-full">
            {/* HARDWARE ACCELERATION ADDED HERE (transform-gpu will-change-transform) */}
            <div 
              className="flex transition-transform duration-700 ease-in-out transform-gpu will-change-transform"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerScreen)}%)` }}
            >
              {images.map((src, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsPerScreen}%` }}
                >
                  <div className="h-80 md:h-64 w-full rounded-sm overflow-hidden border border-neutral-900 bg-neutral-900">
                    <img
                      src={src}
                      alt="Gym Gallery"
                      // pointer-events-none taake image drag hone ki koshish me atke na
                      className="w-full h-full object-cover pointer-events-none" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Slider Dots */}
        <div className={`flex justify-center mt-8 gap-2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {Array.from({ length: images.length - itemsPerScreen + 1 }).map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-red-600' : 'w-2 bg-neutral-700'}`}
            ></div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;