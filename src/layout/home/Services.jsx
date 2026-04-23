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

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const Services = () => {
  // Threshold ko 0.1 rakha hai taake shaking na ho
  const [contentRef, isVisible] = useOnScreen({ threshold: 0.1 });

  // --- YAHAN SE AAP IMAGES AUR PARAGRAPHS CHANGE KAR SAKTAY HAIN ---
  const cardsData = [
    {
      id: 1,
      title: "Body Building",
      image: "/Media/homepagebodybuilder.png", // Yahan apni pehli image ka path dein
      desc: "Sculpt your physique and maximize muscle growth with precision training. Build your dream body."
    },
    {
      id: 2,
      title: "Weight Lifting",
      image: "/Media/weightlifterpasha.jpg", // Yahan doosri image ka path dein
      desc: "Push your limits and build raw strength through expert coaching on the Big Three lifts."
    },
    {
      id: 3,
      title: "Cross Fit",
      image: "/Media/crossfit.png", // Yahan teesri image ka path dein
      desc: "Experience high-intensity functional movements that challenge your endurance and strength."
    },
    {
      id: 4,
      title: "MMA",
      image: "/Media/mma.png", // Yahan chothi image ka path dein
      desc: "Train like a fighter. Improve your reflexes, agility, and self-defense skills with pro coaching."
    },
    {
      id: 5,
      title: "Cardio",
      image: "/Media/homepagecardio.png", // Yahan panchvi image ka path dein
      desc: "Boost your endurance and burn calories efficiently. High-energy sessions for heart health."
    },
    {
      id: 6,
      title: "Calisthenics",
      image: "/Media/homepagearthur.png", // Yahan chatti image ka path dein
      desc: "Master your bodyweight with gravity-defying strength and control. Build lean muscle naturally."
    }
  ];

  return (
    // Main Wrapper
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden relative">
      
      {/* === RED GLOW EFFECT BACKGROUND === */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-red-900/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* SHAKING FIX: Stable Wrapper */}
      <div ref={contentRef} className="w-full max-w-7xl relative z-10">
        
        {/* ANIMATED WRAPPER */}
        <div 
          className={`w-full flex flex-col items-center transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          
          {/* === HEADER SECTION === */}
          <div className="text-center mb-8 lg:mb-12 w-full">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase italic tracking-tighter">
              WORKOUT <span className="text-red-600">PROGRAMS</span>
            </h2>
            {/* Short Red Line */}
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4 skew-x-[-20deg]"></div>
          </div>

          {/* === GRID CONTAINER === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full lg:h-[520px]">
            
            {/* Cards Mapping */}
            {cardsData.map((item) => (
              <div 
                key={item.id} 
                className="group relative h-64 lg:h-full w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 transition-transform duration-500 ease-out hover:scale-105 cursor-pointer flex flex-col justify-end shadow-2xl"
              >
                {/* Yahan item.image aa jayega dynamic tareeqay se */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 h-full w-full " 
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 "></div>
                <div className="absolute top-0 left-0 h-1 w-0 bg-red-600 transition-all duration-500 group-hover:w-full z-10"></div>
                
                {/* Content Area */}
                <div className="relative z-10 p-5 lg:p-6 transform transition-transform duration-500 translate-y-12 group-hover:translate-y-0">
                  
                  {/* Yahan item.title aa jayega */}
                  <h3 className="text-xl lg:text-3xl font-bold text-white uppercase italic tracking-wider mb-2 group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Yahan item.desc aa jayega */}
                  <p className="text-white text-xs lg:text-lg opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100 line-clamp-2">
                    {item.desc}
                  </p>
                  
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;