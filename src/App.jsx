import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/Aboutpage' 
import WorkoutPlans from './pages/WorkoutPlans'
import CoachesPage from './pages/CoachesPage'
import ShopSection from './pages/ShopSection' // <-- YAHAN IMPORT MISSING THA, YE ADD KIYA HAI

// --- Smart Scroll To Top Component ---
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Agar URL mein # (hash) mojood hai (jese #contact ya #pricing)
    if (hash) {
      // setTimeout isliye lagaya taake page render hone ka thora waqt mil jaye
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Agar simple naya page hai (bina # ke), to bilkul top par chale jao
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <div>
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<WorkoutPlans/>} /> 
        <Route path="/trainers" element={<CoachesPage />} /> 
        <Route path="/shop" element={<ShopSection />} /> 
      </Routes>
    </div>
  )
}

export default App