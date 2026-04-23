import React from 'react'
import Header from '../modules/header/Header'
import Services from '../layout/home/Services'
import TrainersSection from '../layout/home/TrainersSection'
import PricingSection from '../layout/home/PricingSection.jsx' 
import GallerySection from '../layout/home/GallerySection'
import ContactSection from '../layout/home/ContactSection'
import Footer from '../modules/footer/Footer'
import HeroSection from '../layout/home/HeroSection' 
import GymStats from '../layout/home/GymStats'

// --- FIXED BACKGROUND ANIMATION (SAB SE PEECHAY) ---
const BackgroundAnimation = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-red-600/15 rounded-full blur-[100px] animate-blob"></div>
    <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[60vh] bg-red-900/15 rounded-full blur-[120px] animate-blob" style={{animationDelay: '-5s'}}></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vh] bg-neutral-600/20 rounded-full blur-[120px] animate-blob" style={{animationDelay: '-10s'}}></div>
    <div className="absolute inset-0 bg-[radial-gradient(#555_1.5px,transparent_1.5px)] [background-size:30px_30px] opacity-40 animate-pan-dots"></div>
    <style>
      {`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 15s infinite alternate ease-in-out; }
        @keyframes pan-dots {
          0% { background-position: 0px 0px; }
          100% { background-position: 30px 30px; }
        }
        .animate-pan-dots { animation: pan-dots 5s linear infinite; }

        /* Imported sections ka background transparent karne ke liye */
        .transparent-sections > section, .transparent-sections > div {
          background-color: transparent !important;
        }
      `}
    </style>
  </div>
);

function Homepage() {
  return (
    <div className="bg-black min-h-screen font-sans relative">
      <Header/>
      
      {/* ANIMATION SAB SE PEECHAY (z-0) */}
      <BackgroundAnimation />
      
      <main className="relative z-10">
        {/* HERO SECTION - iska background black hoga taake piche animation na dikhe */}
        <div className="relative bg-black z-20">
          <HeroSection/>
        </div>
        
        {/* BAAQI SECTIONS - inke piche animation dikhegi */}
        <div className="relative z-10 transparent-sections bg-black/40 backdrop-blur-sm">
          <GymStats/>
          <Services/>
          <TrainersSection/>
          <PricingSection/>
          <GallerySection/>
          <ContactSection/> 
        </div>
      </main>

      <div className="relative z-20 bg-black">
        <Footer/>
      </div>
    </div>
  )
}

export default Homepage