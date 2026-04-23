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
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []); 

  return [ref, isVisible];
};

// --- FIXED BACKGROUND ANIMATION (SAB SE PEECHAY) ---
const BackgroundAnimation = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
    <div className="absolute top-[0%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] animate-blob"></div>
    <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-red-900/15 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[0%] left-[20%] w-[50%] h-[50%] bg-neutral-800/40 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
    <div className="absolute inset-0 bg-[radial-gradient(#555_1.5px,transparent_1.5px)] [background-size:30px_30px] opacity-30 animate-pan-dots"></div>
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

const Aboutpage = () => {
  const [heroRef, isHeroVisible] = useOnScreen({ threshold: 0.1 });
  const [originRef, isOriginVisible] = useOnScreen({ threshold: 0.1 });
  const [visionRef, isVisionVisible] = useOnScreen({ threshold: 0.1 });
  const [valuesRef, isValuesVisible] = useOnScreen({ threshold: 0.1 });
  const [chooseRef, isChooseVisible] = useOnScreen({ threshold: 0.1 });

  const animateIn = (isVisible) => `transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`;

  const coreValues = [
    { title: "Discipline", desc: "Motivation is temporary; discipline is permanent. We build habits that forge unbreakable mindsets.", icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { title: "Community", desc: "You are not alone. Train among the elite, support each other, and rise together.", icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { title: "Excellence", desc: "We settle for nothing less than perfection in our facilities and your results.", icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> }
  ];

  const cardGlow = "shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:border-red-600/50 transition-all duration-100";

  return (
    <div className="bg-black min-h-screen flex flex-col font-sans relative">
      <Header />
      
      {/* ANIMATION SAB SE PEECHAY (z-0) */}
      <BackgroundAnimation />

      <main className="flex-grow pt-[80px] relative z-10">
        
        {/* HERO SECTION - iska background black hoga taake piche animation na dikhe */}
        <section ref={heroRef} className="relative z-20 w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0">
            <img src="/Media/image3.jpg" alt="Hero" className="w-full h-full object-cover opacity-30 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>
          </div>
          <div className={`relative z-10 text-center ${animateIn(isHeroVisible)}`}>
            <h2 className="text-red-600 font-bold tracking-[0.5em] uppercase mb-4 text-sm md:text-base">Our Legacy</h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              FORGING <span className="text-neutral-500">LEGENDS</span>
            </h1>
          </div>
        </section>

        {/* BAAQI SECTIONS - inke piche animation dikhegi (bg-transparent ya halka black hoga) */}
        <div className="relative z-10 w-full bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            
            <section ref={originRef} className="w-full flex items-center bg-transparent py-16 relative">
              <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 ${animateIn(isOriginVisible)}`}>
                <div className="h-[400px] md:h-[550px] border border-neutral-800 rounded-sm overflow-hidden group shadow-2xl relative bg-black">
                  <img src="/Media/origin.webp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" alt="Origin" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
                
                <div>
                  <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase mb-6 tracking-tighter">The <span className="text-red-600">Origin</span></h2>
                  <div className="w-20 h-1 bg-red-600 mb-8 skew-x-[-15deg]"></div>
                  <p className="text-gray-200 text-lg mb-10 leading-relaxed font-light">Started in a small garage, Steel Core Fitness was built on the belief that everyone has a legend within them waiting to be forged. We stripped away the gimmicks; we provide the raw tools, the atmosphere, and the expert guidance.</p>
                  
                  <div className="grid grid-cols-2 gap-6">

                    <div className={`bg-black/80 p-6 border border-red-900 hover:border-red-950  rounded-sm ${cardGlow} group cursor-default`}><span className="block text-5xl font-black text-white italic group-hover:text-red-500 duration-100  transition-colors">10+</span><span className="text-sm text-gray-300 uppercase tracking-widest font-bold">Years Active</span></div>

                    <div className={`bg-black/80 p-6 border border-red-900 hover:border-red-950 rounded-sm ${cardGlow} group cursor-default`}><span className="block text-5xl font-black text-white italic group-hover:text-red-500 duration-100 transition-colors">5k+</span><span className="text-sm text-gray-300  uppercase tracking-widest font-bold">Members Transformed</span></div>
                  </div>
                </div>
              </div>
            </section>

            <section ref={chooseRef} className="w-full flex items-center bg-transparent py-16 relative">
              <div className={`w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 ${animateIn(isChooseVisible)}`}>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase mb-8 tracking-tighter">Why <span className="text-red-600">Choose Us?</span></h2>
                  <div className="w-20 h-1 bg-red-600 mb-10 skew-x-[-15deg]"></div>
                  <ul className="space-y-8">
                    {[{ t: "Elite Coaches", d: "Certified experts dedicated to forging your path to greatness." }, { t: "Modern Equipment", d: "Top-tier machinery selected for maximum muscle activation." }, { t: "24/7 Access", d: "Your legend doesn't sleep. Train on your schedule, anytime." }, { t: "Custom Plans", d: "Personalized nutrition and workout regimes tailored to your goals." }].map((item, i) => (
                      <li key={i} className="flex items-start gap-5 group">
                        <div className="mt-1 bg-red-600 p-1.5 rounded-full text-white shadow-[0_0_10px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg></div>
                        <div><h5 className="text-white font-bold text-lg uppercase tracking-wide group-hover:text-red-500 transition-colors">{item.t}</h5><p className="text-gray-300 text-base font-light">{item.d}</p></div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative group overflow-hidden rounded-sm border border-neutral-800 shadow-2xl h-[400px] bg-black">
                   <img src="/Media/image2.jpg" alt="Gym" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
              </div>
            </section>

            <section ref={valuesRef} className="w-full flex items-center bg-transparent py-16 relative">
              <div className={`w-full relative z-10 ${animateIn(isValuesVisible)}`}>
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter">Core <span className="text-red-600">Values</span></h2>
                  <div className="w-24 h-1 bg-red-600 mx-auto mt-4 skew-x-[-15deg]"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {coreValues.map((val, i) => (
                    <div key={i} className={`bg-black/80 border border-red-900 hover:border-red-950  p-10 rounded-sm text-center group ${cardGlow}`}>
                      <div className="text-red-600 flex justify-center mb-8 group-hover:scale-110 transition-all duration-300">{val.icon}</div>
                      <h4 className="text-white font-bold text-3xl uppercase mb-5 tracking-wide">{val.title}</h4>
                      <p className="text-gray-100 text-lg font-light leading-relaxed">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section ref={visionRef} className="w-full flex items-center bg-transparent py-16 relative">
              <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 ${animateIn(isVisionVisible)}`}>
                <div className={`p-12 bg-black/80 border border-red-900 hover:border-red-950 rounded-sm ${cardGlow} relative overflow-hidden group`}>
                  <div className="absolute -bottom-10 -right-10 text-red-600/10 group-hover:scale-110 transition-transform duration-500"><svg className="w-40 h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                  <h3 className="text-white font-black italic text-3xl uppercase mb-6 tracking-tight">Our Mission</h3>
                  <p className="text-gray-200 leading-relaxed text-lg font-light relative z-10">To provide an elite training environment that empowers individuals to surpass their physical and mental limits.</p>
                </div>
                <div className={`p-12 bg-black/80 border  border-red-900 hover:border-red-950  rounded-sm ${cardGlow} relative overflow-hidden group`}>
                  <div className="absolute -bottom-10 -right-10 text-red-600/10 group-hover:scale-110 transition-transform duration-500"><svg className="w-40 h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></div>
                  <h3 className="text-white font-black italic text-3xl uppercase mb-6 tracking-tight">Our Vision</h3>
                  <p className="text-gray-200 leading-relaxed text-lg font-light relative z-10">To become the global benchmark for fitness excellence, creating a movement where discipline defines a new standard.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <div className="relative z-20 bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Aboutpage;