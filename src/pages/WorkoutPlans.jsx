'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '../modules/header/Header';
import Footer from '../modules/footer/Footer';

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
  }, []); 

  return [ref, isVisible];
};

// --- BACKGROUND ANIMATION COMPONENT ---
const BackgroundAnimation = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-black">
    <div className="absolute top-[0%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] animate-blob"></div>
    <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-red-900/15 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[0%] left-[20%] w-[50%] h-[50%] bg-neutral-800/40 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
    <div className="absolute inset-0 bg-[radial-gradient(#555_1px,transparent_1px)] [background-size:30px_30px] opacity-30 animate-pan-dots"></div>
    
    <style>
      {`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 15s infinite alternate ease-in-out; }
        .animation-delay-2000 { animation-delay: -5s; }
        .animation-delay-4000 { animation-delay: -10s; }
        @keyframes pan-dots {
          0% { background-position: 0px 0px; }
          100% { background-position: 30px 30px; }
        }
        .animate-pan-dots { animation: pan-dots 5s linear infinite; }
      `}
    </style>
  </div>
);

const ProgramSection = ({ data, index }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2, rootMargin: "0px" });
  const isEven = index % 2 === 0;

  return (
    <section className={`py-12 lg:py-16 w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center relative z-10 border-b border-red-950 hover:bg-red-950/20 transition-colors duration-500`}>
      <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px] relative overflow-hidden group px-4 lg:px-8">
        <div className="w-full h-full relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-sm">
          <img src={data.image} alt={data.title} className="absolute w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-transparent transition-colors duration-500"></div>
        </div>
      </div>

      <div ref={ref} className="w-full lg:w-1/2 p-6 lg:p-12 xl:p-16 flex flex-col justify-center relative z-10">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-red-600/10 font-black text-6xl md:text-8xl absolute -top-4 right-4 pointer-events-none select-none">
            0{index + 1}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-black italic uppercase text-white tracking-tighter mb-4 relative z-10 leading-none">
            {data.title}
          </h2>

          <div className="w-16 h-1 bg-red-600 mb-6 skew-x-[-20deg]"></div>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 relative z-10 max-w-xl">
            {data.desc}
          </p>
          <ul className="space-y-3 mb-8 relative z-10">
            {data.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center text-gray-200 font-bold text-xs md:text-sm uppercase tracking-widest">
                <svg className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                {benefit}
              </li>
            ))}
          </ul>
          <button className="relative z-10 self-start px-6 py-3 bg-transparent border border-red-600 text-white font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer transition-all duration-300 rounded-sm">
            Start This Program
          </button>
        </div>
      </div>
    </section>
  );
};

const WorkoutPlans = () => {
  const programsData = [
    { id: 1, title: "Body Building", image: "/Media/bodybuilder.png", desc: "Sculpt your physique and maximize muscle growth with precision training.", benefits: ["Muscle Hypertrophy", "Customized Diet Plans", "Advanced Machine Access"] },
    { id: 2, title: "Weight Lifting", image: "/Media/weightlifterolympian.png", desc: "Push your limits and build raw strength through expert coaching on the Big Three lifts.", benefits: ["Raw Power Development", "Form & Technique Correction", "1-on-1 Spotting"] },
    { id: 3, title: "Cross Fit", image: "/Media/crossfit.png", desc: "Experience high-intensity functional movements that challenge your endurance and strength.", benefits: ["High-Intensity Fat Burn", "Cardio-Respiratory Endurance", "Community Group Sessions"] },
    { id: 4, title: "MMA", image: "/Media/mma.png", desc: "Improve your reflexes, agility, and self-defense skills with pro coaching.", benefits: ["Self Defense Skills", "Agility & Reflex Speed", "Full Body Conditioning"] },
    { id: 5, title: "Cardio", image: "/Media/workoutplancardioimage.png", desc: "Boost your endurance and burn calories efficiently. High-energy sessions designed for rapid fat loss.", benefits: ["Improved Heart Health", "Rapid Fat Loss", "Stamina & Endurance"] },
    { id: 6, title: "Calisthenics", image: "/Media/workoutplanarthur.png", desc: "Master your bodyweight with gravity-defying strength and control.", benefits: ["Core Strength", "Flexibility & Mobility", "No Equipment Needed"] }
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-[80px]">
        
        {/* Top Section without animation */}
        <div className="w-full py-16 md:py-20 text-center bg-black/40 border-b border-neutral-900 relative">
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-white uppercase tracking-tighter relative z-10 mb-3 leading-none">
             Choose Your <span className="text-red-600">Battle</span>
           </h1>
           <p className="text-gray-300 max-w-2xl mx-auto text-sm relative z-10 px-4">
             Discover our elite training programs designed to push you beyond your limits. Find the perfect fit for your fitness goals.
           </p>
        </div>
        
        {/* Lower Section WITH Animation */}
        <div className="relative w-full overflow-hidden">
          <BackgroundAnimation />
          <div className="relative z-10">
            {programsData.map((program, index) => (
              <ProgramSection key={program.id} data={program} index={index} />
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default WorkoutPlans;