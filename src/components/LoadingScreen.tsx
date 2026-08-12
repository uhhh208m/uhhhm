import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const { t } = useLanguage();
  const loadingTexts = t.ui.loading;

  useEffect(() => {
    // Change text every 600ms
    const textInterval = setInterval(() => {
      setTextIndex(prev => {
        if (prev < loadingTexts.length - 1) return prev + 1;
        clearInterval(textInterval);
        return prev;
      });
    }, 650);

    // Total load time = ~2.6s + exit animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(onComplete, 1200); // Wait 1.2s for the curtain split exit animation
    }, 2800);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden">
          {/* Top Curtain */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-black z-0 border-b border-white/5"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Bottom Curtain */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-black z-0 border-t border-white/5"
            initial={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Curtain split flash (appears right before exit) */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-white z-0 -translate-y-1/2 pointer-events-none"
            initial={{ scaleX: 0, opacity: 0 }}
            exit={{ scaleX: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Ambient Center Glow */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)] z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Main Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center w-full"
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Cinematic Logo Focus Reveal */}
            <motion.div
              initial={{ filter: "brightness(0) blur(30px)", scale: 1.3, opacity: 0 }}
              animate={{ filter: "brightness(1) blur(0px)", scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-32 md:w-48 aspect-square mb-12 relative"
            >
              <img
                src="/logo.png"
                alt="Loading"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              />
              {/* Subtle breathing glow behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/10 blur-[40px] -z-10"
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Ultra-Minimalist Progress Line */}
            <div className="w-64 md:w-80 h-[1px] bg-white/10 relative overflow-hidden mb-8">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.6, ease: [0.76, 0, 0.24, 1] }}
              />
              {/* Trailing glow */}
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-white blur-[3px] opacity-70"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.6, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>

            {/* Status Typography Sequence */}
            <div className="h-6 relative w-full flex justify-center items-center">
              <AnimatePresence>
                {loadingTexts.map((text, idx) => (
                  textIndex === idx && (
                    <motion.div
                      key={idx}
                      initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute text-zinc-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs"
                    >
                      {text}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
