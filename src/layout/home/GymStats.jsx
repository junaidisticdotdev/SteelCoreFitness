'use client';

import React, { useEffect, useState, useRef } from 'react';

// --- Custom Hook: Scroll Detection ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Jab element screen pe ho to TRUE, jab bahar jaye to FALSE (Reset)
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

// --- Component: Animated Number Counter (FIXED) ---
const AnimatedNumber = ({ end, duration, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Agar visible nahi hai, to count ko 0 kar do aur wapis jao
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Percentage calculate karo (0 to 1)
      const percentage = Math.min(progress / duration, 1);
      
      // Count update karo
      setCount(Math.floor(end * percentage));

      // Agar duration puri nahi hui to loop chalao
      if (progress < duration) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    // Animation start karo
    animationFrameId = window.requestAnimationFrame(animate);

    // Cleanup: Agar component unmount ho to animation rok do
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, isVisible]); // Dependencies

  return <span>{count}</span>;
};

// --- Component: Stat Card ---
const StatCard = ({ icon, number, suffix, label, direction }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 });

  // Animation Direction Logic
  const translateClass = isVisible
    ? "opacity-100 translate-y-0"   // Visible: Apni jagah par
    : "opacity-0 translate-y-20";   // Hidden: Thoda neechay

  return (
    <div
      ref={ref}
      className={`cursor-pointer relative group p-8 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-sm hover:border-red-600 transition-all duration-700 ease-out transform ${translateClass}`}
    >
      <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Icon */}
        <div className="mb-5 p-4 bg-black rounded-full border border-neutral-800 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white text-red-600 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
          {icon}
        </div>

        {/* Animated Number */}
        <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-sans italic">
          <AnimatedNumber end={number} duration={2000} isVisible={isVisible} />
          <span className="text-red-600">{suffix}</span>
        </h3>

        {/* Label */}
        <p className="text-sm font-bold text-white uppercase tracking-widest group-hover:text-white transition-colors">
          {label}
        </p>
      </div>
    </div>
  );
};

// --- Main Section ---
const GymStats = () => {
  // Yahan main section ki animation ke liye hook call kiya hai
  const [contentRef, isVisible] = useOnScreen({ threshold: 0.1 });

  const stats = [
    {
      id: 1,
      number: 1200,
      suffix: "+",
      label: "Active Members",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" /><path d="M6 3v18M18 3v18" strokeLinecap="round" strokeWidth={3}/></svg>
    },
    {
      id: 2,
      number: 15,
      suffix: "+",
      label: "Expert Trainers",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
    {
      id: 3,
      number: 85,
      suffix: "+",
      label: "Modern Machines",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    },
    {
      id: 4,
      number: 5000,
      suffix: "kg",
      label: "Fat Burned",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
    }
  ];

  return (
    // Yahan Base Dark Background (#0a0a0a) add kiya hai
    <div className="bg-[#0a0a0a] py-24 relative overflow-hidden">
      
      {/* --- Ambient Glowing Orbs --- */}
      {/* Top Left Red Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none z-0"></div>
      
      {/* Bottom Right Deep Red Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-red-900/15 blur-[120px] pointer-events-none z-0"></div>

      {/* Content Container (z-10 lagaya ha taake glows ke upar rahay) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Yahan wrapper pe reference aur classes add kiye hain taake poora content animate ho */}
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-y-0'  
              : 'opacity-0 translate-y-20'   
          }`}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase italic tracking-tighter">
              WHY CHOOSE <span className="text-red-600">US?</span>
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mt-4 skew-x-[-20deg]"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard
                key={stat.id}
                icon={stat.icon}
                number={stat.number}
                suffix={stat.suffix}
                label={stat.label}
                direction="up" 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GymStats;