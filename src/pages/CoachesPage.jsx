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

const CoachDetailSection = ({ coach, index }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2, rootMargin: "0px" });
  const bgColor = index % 2 === 0 ? "bg-transparent" : "bg-neutral-900/30";

  return (
    <section ref={ref} className={`py-12 lg:py-16 w-full flex items-center border-b border-neutral-900/50 ${bgColor} relative z-10 transition-colors duration-500 hover:bg-neutral-900/50`}>
      <div className={`max-w-7xl mx-auto px-6 w-full transition-all duration-1000 ease-out transform z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="relative group order-2 lg:order-1 max-w-sm lg:max-w-md mx-auto w-full">
            <div className="relative h-[350px] md:h-[450px] overflow-hidden rounded-sm border border-neutral-800 shadow-[0_0_20px_rgba(220,38,38,0.2)] group-hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-all duration-500 bg-black">
              <img src={coach.image} alt={coach.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-red-600 text-white px-3 py-2 text-sm font-black italic shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
              {coach.exp} EXP
            </div>
          </div>

          <div className="order-1 lg:order-2 p-4 lg:p-0">
            <h4 className="text-red-600 font-bold text-xs uppercase tracking-[0.3em] mb-2">{coach.specialty}</h4>
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-4 leading-none">
              {coach.name}
            </h2>
            <div className="w-16 h-1 bg-red-600 mb-6 skew-x-[-20deg]"></div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
              {coach.bio}
            </p>
            <div className="space-y-3 mb-8">
              {coach.achievements.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,1)]"></div>
                  <span className="font-bold uppercase tracking-wider text-xs md:text-sm">{item}</span>
                </div>
              ))}
            </div>
            <button className="px-8 py-3 bg-transparent border-2 border-red-600 text-white text-xs md:text-sm font-black italic uppercase hover:bg-red-600 transition-all duration-300 cursor-pointer">
              Train With {coach.name.split(' ')[0]}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoachesPage = () => {
  const coachesData = [
    { name: "Hany Rambod", specialty: "Bodybuilding", image: "/Media/HanyRambod.webp", exp: "20+ Years", bio: "Known as 'The Pro Creator', Hany has helped elite athletes win 20+ Olympia titles.", achievements: ["22X Olympia Winning Coach", "Creator of FST-7 Training", "Nutrition Expert"] },
    { name: "Glenn Pendlay", specialty: "Powerlifting", image: "/Media/GlennPendlay.jpg", exp: "15+ Years", bio: "A legend in Olympic weightlifting, Glenn focuses on explosive power and fundamental strength.", achievements: ["Level 5 USAW Coach", "Pendlay Row Inventor", "Strength Scientist"] },
    { name: "Scott Panchik", specialty: "Crossfit", image: "/Media/trainerScott.png", exp: "12+ Years", bio: "A multi-year CrossFit Games veteran, Scott brings a unique blend of endurance and mental toughness.", achievements: ["8X CrossFit Games Veteran", "Endurance Specialist", "Mobility Expert"] },
    { name: "Bahram Rajabzadeh", specialty: "Mixed Martial Arts", image: "/Media/BahramRajabzadeh.jpg", exp: "25+ Years", bio: "An elite striker and mixed martial artist. Focus on explosive power and striking combinations.", achievements: ["Glory Kickboxing Veteran", "Pro MMA Champion", "Striking Specialist"] },
    { name: "Haron Mintz", specialty: "Weight Loss", image: "/Media/trainerHaron.png", exp: "8+ Years", bio: "Specializing in body recomposition, Haron combines high-volume training with metabolic conditioning.", achievements: ["World Record Holder", "Metabolic Specialist", "Nutrition Coach"] },
    { name: "Arthur", specialty: "Calisthenics", image: "/Media/trainerArthur.png", exp: "10+ Years", bio: "Master your body with gravity-defying strength and control. Focus on functional movements and muscle-ups.", achievements: ["Calisthenics Pioneer", "Master of Static Holds", "Bodyweight Expert"] }
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-[80px]">
        {/* Top Section without animation */}
        <section className="py-16 md:py-20 flex flex-col items-center justify-center bg-black border-b border-neutral-900 relative">
          <h1 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter text-center z-10 mb-2 leading-none">
            ELITE <span className="text-red-600">COACHES</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest z-10">Pick Your Path To Greatness</p>
        </section>

        {/* Lower Section WITH Animation */}
        <div className="relative w-full overflow-hidden">
          <BackgroundAnimation />
          <div className="relative z-10">
            {coachesData.map((coach, index) => (
              <CoachDetailSection key={index} coach={coach} index={index} />
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default CoachesPage;