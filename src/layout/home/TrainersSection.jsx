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
  }, [options]); // Options ko dependency mein dala hai stability ke liye

  return [ref, isVisible];
};

// --- Coach Card Component ---
const CoachCard = ({ name, role, image }) => {
  return (
    <div className="group relative overflow-hidden rounded-sm bg-neutral-900">
      
      {/* --- Image Wrapper with Aspect Ratio --- */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
        />
        {/* --- Dark Overlay Gradient --- */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:from-red-950/90 transition-all duration-500"></div>
      </div>

      {/* --- Content Overlay --- */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
        {/* Red Accent Line */}
        <div className="w-10 h-1 bg-red-600 mb-4 transition-all duration-500 group-hover:w-20"></div>

        <h3 className="text-2xl lg:text-3xl font-black italic text-white uppercase tracking-tighter mb-1">
          {name}
        </h3>
        <p className="text-red-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4">
          {role}
        </p>

        {/* --- Social Icons Slide Up --- */}
        <div className="flex gap-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <SocialIcon path="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          <SocialIcon isXIcon />
          <SocialIcon path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </div>
      </div>
    </div>
  );
};

// --- Simple Social Icon Sub-component ---
const SocialIcon = ({ path, isXIcon }) => (
  <a href="#" className="w-9 h-9 bg-white flex items-center justify-center text-black rounded-full hover:bg-red-600 hover:text-white transition-all duration-300">
    {isXIcon ? (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={path}></path></svg>
    )}
  </a>
);

// --- Main Section ---
const TrainersSection = () => {
  const [contentRef, isVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  const coaches = [
    { id: 1, name: "Hany Rambod", role: "Head Coach / Bodybuilding", image: "/Media/HanyRambod.webp" },
    { id: 2, name: "Glenn Pendlay", role: "Crossfit & HIIT Expert", image: "/Media/GlennPendlay.jpg" },
    { id: 3, name: "Scott Panchik", role: "Strength & Conditioning", image: "/Media/trainerScott.png" }
  ];

  return (
    <section id="coaches" className="bg-black min-h-screen flex flex-col justify-center py-20 relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none"></div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black italic text-white uppercase tracking-tighter">
              Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Best Coaches</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base mt-4 font-light">
              Guided by the best in the industry. Our certified coaches are here to push you beyond your limits.
            </p>
            <div className="w-20 h-1.5 bg-red-600 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <CoachCard key={coach.id} {...coach} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;