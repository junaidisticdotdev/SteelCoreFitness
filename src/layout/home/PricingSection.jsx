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
  }, []); 

  return [ref, isVisible];
};

// --- Single Plan Card ---
const PricingCard = ({ plan }) => {
  const isPopular = plan.isPopular;

  // --- WhatsApp Submit Logic ---
  const handleChoosePlan = () => {
    // Yahan apna WhatsApp number likhein (bina + ke)
    const whatsappNumber = "923232662295"; 
    
    // Message jismein plan ka naam aur price auto-fill hogi
    const message = `*New Plan Request - Steel Core Fitness*%0a%0aHi, I am interested in joining the *${plan.name}* plan for $${plan.price}/month. Please guide me on how to proceed.`;
    
    // WhatsApp URL banana aur naye tab mein open karna
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className={`relative flex flex-col p-5 lg:p-6 rounded-sm transition-all duration-500  transform group
        ${
          isPopular 
            ? 'bg-neutral-950 border-2 border-neutral-600 hover:border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)] scale-100 md:scale-105 z-10' 
            : 'bg-black border border-gray-500 hover:border-red-600 duration-300 '
        }
      `}
    >
      {/* --- Popular Badge --- */}
      {isPopular && (
        <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] lg:text-xs font-bold px-2 py-1 uppercase tracking-widest transform translate-x-2 -translate-y-2 shadow-lg">
          Best Value
        </div>
      )}

      {/* --- Header --- */}
      <div className="mb-4">
        <h3 className="text-base lg:text-lg font-bold text-gray-400 uppercase tracking-widest mb-1">{plan.name}</h3>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-red-600">$</span>
          <span className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter">{plan.price}</span>
          <span className="ml-1 text-gray-500 text-xs font-medium">/ month</span>
        </div>
      </div>

      {/* --- Divider --- */}
      <div className={`h-px w-full mb-5 ${isPopular ? 'bg-red-600/30' : 'bg-red-700'}`}></div>

      {/* --- Features List --- */}
      <ul className="flex-1 space-y-2 mb-6">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <svg className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isPopular ? 'text-red-600' : 'text-white transition-colors'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300 text-xs lg:text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* --- Button --- */}
      {/* onClick event add kar diya hai WhatsApp wale function ke liye */}
      <button 
        onClick={handleChoosePlan}
        className={`cursor-pointer w-full py-3 font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-sm
          ${
            isPopular 
              ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
              : 'bg-transparent border border-neutral-600 text-white hover:border-white hover:bg-white hover:text-black'
          }
        `}
      >
        Choose Plan
      </button>

    </div>
  );
};

// --- Main Section ---
const PricingSection = () => {
  const [contentRef, isVisible] = useOnScreen({ threshold: 0.1, rootMargin: "50px" });

  const plans = [
    {
      name: "Beginner",
      price: "29",
      isPopular: false,
      features: [
        "Access to Gym Floor",
        "Free Locker Access",
        "1 Group Class per Week",
        "Free WiFi",
        "Water Station Access"
      ]
    },
    {
      name: "Pro Athlete",
      price: "59",
      isPopular: true,
      features: [
        "All Beginner Features",
        "Unlimited Group Classes",
        "Personal Trainer (2x Month)",
        "Nutrition Guide App",
        "Sauna & Spa Access",
        "Free Merchandise T-Shirt"
      ]
    },
    {
      name: "Elite Alpha",
      price: "99",
      isPopular: false,
      features: [
        "All Pro Features",
        "Unlimited Personal Training",
        "Private Locker Room",
        "Massage Therapy (1x Month)",
        "Diet Plan Customization",
        "Priority Support 24/7"
      ]
    }
  ];

  return (
    <section id="pricing" className="bg-neutral-950 min-h-screen lg:min-h-0 lg:h-[100vh] flex flex-col justify-center relative overflow-hidden py-10 lg:py-0">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div 
          className={`transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* --- Header --- */}
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-2">
              Invest In <span className="text-red-600">Yourself</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-xs md:text-sm">
              Choose the plan that fits your goals. No hidden fees. Cancel anytime.
            </p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          {/* --- Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-center px-0 lg:px-4">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default PricingSection;