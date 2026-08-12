import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="relative min-h-[calc(100vh-5rem)] w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <h1 className="text-8xl md:text-[150px] font-black uppercase tracking-tighter mb-4 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          404
        </h1>
        <div className="w-16 h-1 bg-white mb-8" />
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-4">
          {t.ui.notfound.title}
        </h2>
        <p className="text-zinc-500 text-sm md:text-base max-w-md mb-10 uppercase tracking-widest leading-relaxed">
          {t.ui.notfound.message}
        </p>
        
        <NavLink to="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white hover:bg-zinc-200 text-black font-black rounded-full transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            {t.ui.notfound.button}
          </motion.button>
        </NavLink>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] border border-white/5 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] border border-white/10 rounded-full border-dashed opacity-50"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
      </div>
    </div>
  );
}
