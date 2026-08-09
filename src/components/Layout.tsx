import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Footer from './Footer';

export default function Layout() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogoClick = () => {
    if (isLogoAnimating) return;
    setIsLogoAnimating(true);
    setTimeout(() => {
      setIsLogoAnimating(false);
      setShowPopup(true);
    }, 1500); // Matches the sweep animation duration
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-950">
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
              <img src="/logo.png" alt="UHM Logo" className={`w-full h-full object-contain transition-all duration-500 ${isLogoAnimating ? 'drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]' : 'drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]'}`} />
              
              {/* Sweep light effect on click */}
              <div className="absolute inset-0 pointer-events-none logo-mask">
                <div className={`absolute top-0 bottom-0 left-0 w-[50%] bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-[150%] skew-x-[-20deg] ${isLogoAnimating ? 'block animate-sweep-hover' : 'hidden'}`} />
              </div>
            </div>
          </NavLink>
          
          <nav className="flex items-center gap-6 md:gap-10 overflow-x-auto pl-28 md:pl-40">
            <NavLink 
              to="/" 
              className={({ isActive }) => `whitespace-nowrap text-sm md:text-base font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'}`}
              end
            >
              Trang Chủ
            </NavLink>
            <NavLink 
              to="/schedule" 
              className={({ isActive }) => `whitespace-nowrap text-sm md:text-base font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'}`}
            >
              Lịch Trình
            </NavLink>
            <NavLink 
              to="/rewards" 
              className={({ isActive }) => `whitespace-nowrap text-sm md:text-base font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'}`}
            >
              Phần Thưởng
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-28">
        <Outlet />
      </main>

      <Footer />

      {/* Easter Egg Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
          <div className="bg-zinc-900/30 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-[0_8px_32px_rgba(34,211,238,0.2)] transform animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-3 flex items-center justify-center gap-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              <span className="text-2xl">✨</span> Thông báo
            </h3>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed mb-8 text-center">
              Logo tràn ra khỏi thanh menu là do mình cố tình làm vậy, đó là tính năng không phải lỗi nha! 😉
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:-translate-y-0.5"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
