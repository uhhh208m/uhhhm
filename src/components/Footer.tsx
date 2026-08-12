import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<{ title: string; content: string } | null>(null);
  const [showDevInfo, setShowDevInfo] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <footer className="bg-black border-t border-white/5 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div 
            className="text-zinc-500 text-sm font-medium text-center md:text-left max-w-md cursor-pointer hover:text-white transition-colors duration-300"
            onClick={() => setShowDevInfo(true)}
          >
            {t.footer.text}
          </div>
          
          <ul className="flex flex-wrap justify-center gap-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            {t.footer.links.map((link, index) => (
              <li key={index}>
                <button 
                  onClick={() => setActiveModal(link)}
                  className="hover:text-white transition-colors"
                >
                  {link.title}
                </button>
              </li>
            ))}
            <li>
              <NavLink to="/404" className="hover:text-white transition-colors">
                404
              </NavLink>
            </li>
          </ul>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 pr-8">
                {activeModal.title}
              </h3>
              <p className="text-zinc-300 leading-relaxed text-sm">
                {activeModal.content}
              </p>
            </motion.div>
          </motion.div>
        )}

        {showDevInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-lg bg-zinc-900/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col items-center text-center overflow-hidden"
            >
              {/* Sweep Effect */}
              <motion.div
                animate={{ x: ["-200%", "300%"] }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 8.5 }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-0 pointer-events-none"
              />

              <button 
                onClick={() => setShowDevInfo(false)}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-xl z-10">
                <span className="text-3xl font-black text-white">Dev</span>
              </div>
              
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 z-10">
                {t.ui.footer.info}
              </h3>
              <p className="text-zinc-400 font-bold tracking-widest text-sm uppercase mb-6 z-10">
                {t.ui.footer.version}
              </p>
              
              <div className="text-zinc-300 leading-relaxed text-sm md:text-base space-y-4 z-10">
                <p>
                  {t.ui.footer.dev1} <span className="text-white font-bold">{t.ui.footer.dev2}</span> {t.ui.footer.dev3}
                </p>
                <p>
                  {t.ui.footer.dev4} <span className="text-white font-bold">uhhhm</span>.
                </p>
              </div>
              
              <div className="mt-8 w-full border-t border-white/10 pt-6 z-10">
                <p className="text-xs text-zinc-500 font-medium">{t.footer.text}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
