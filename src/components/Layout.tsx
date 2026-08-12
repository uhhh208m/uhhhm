import React, { useState, useRef } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Footer from './Footer';
import FloatingMenu from './FloatingMenu';
import { useLanguage } from '../context/LanguageContext';

export default function Layout() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleLogoClick = () => {
    if (isLogoAnimating) return;
    setIsLogoAnimating(true);
    setTimeout(() => {
      setIsLogoAnimating(false);
      setShowPopup(true);
    }, 1500); // Matches the sweep animation duration
  };

  return (
    <div ref={constraintsRef} className="flex flex-col min-h-screen w-full bg-zinc-950 relative overflow-hidden">
      {/* Navigation Bar */}
      <header className="fixed top-4 left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-6xl z-50 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <div className="mx-auto px-6 h-16 md:h-20 flex items-center justify-end relative">
          {/* Logo overlapping the header */}
          <NavLink 
            to="/" 
            onClick={handleLogoClick}
            className={`absolute left-0 md:left-2 top-1/2 -translate-y-1/2 w-28 h-28 md:w-40 md:h-40 flex items-center justify-center transition-all duration-500 z-10 ${isLogoAnimating ? 'scale-110' : ''}`} 
            style={{ transformOrigin: 'center center' }}
          >
            <div className={`relative w-full h-full flex items-center justify-center transition-transform duration-500 ${isLogoAnimating ? '-translate-y-2' : ''}`}>
              <img src="/logo.png" alt="UHM Logo" className={`w-full h-full object-contain transition-all duration-500 ${isLogoAnimating ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]'}`} />
              
              {/* Sweep light effect on click */}
              <div className="absolute inset-0 pointer-events-none logo-mask">
                <div className={`absolute top-0 bottom-0 left-0 w-[50%] bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-[150%] skew-x-[-20deg] ${isLogoAnimating ? 'block animate-sweep-hover' : 'hidden'}`} />
              </div>
            </div>
          </NavLink>
          
          <nav className="flex items-center gap-6 md:gap-10 overflow-x-auto pl-28 md:pl-40">
            <NavLink 
              to="/" 
              className={({ isActive }) => `whitespace-nowrap text-sm md:text-base font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              end
            >
              {t.ui.nav.home}
            </NavLink>
            <NavLink 
              to="/schedule" 
              className={({ isActive }) => `whitespace-nowrap text-sm md:text-base font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {t.ui.nav.schedule}
            </NavLink>
            <NavLink 
              to="/chat" 
              className={({ isActive }) => `whitespace-nowrap text-sm md:text-base font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {t.ui.nav.chat}
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-28">
        <Outlet />
      </main>

      <Footer />
      
      {/* Draggable Floating Menu */}
      <div className="fixed inset-4 pointer-events-none z-[100]">
        <FloatingMenu constraintsRef={constraintsRef} />
      </div>

      {/* Easter Egg Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl transform animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl md:text-2xl font-black text-white mb-3 flex items-center justify-center gap-2 uppercase tracking-tight">
              <span className="text-2xl">✨</span> {t.ui.notice.title}
            </h3>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8 text-center">
              {t.ui.notice.message}
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-all duration-300 uppercase tracking-widest text-sm"
            >
              {t.ui.notice.button}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
