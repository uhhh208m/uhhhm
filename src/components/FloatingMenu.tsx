import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Sparkles, Languages } from 'lucide-react';
import { useAnimation } from '../context/AnimationContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

function ToggleRow({ label, desc, enabled, setEnabled }: { label: string, desc: string, enabled: boolean, setEnabled: (val: boolean) => void }) {
  return (
    <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/5 hover:bg-black/60 transition-colors">
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm tracking-wide">{label}</span>
        <span className="text-zinc-500 text-[11px] mt-0.5 uppercase tracking-wider">{desc}</span>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 flex items-center shrink-0 ${enabled ? 'bg-white' : 'bg-zinc-700'}`}
      >
        <motion.div 
          className={`w-3 h-3 rounded-full mx-1 shadow-sm ${enabled ? 'bg-black' : 'bg-zinc-300'}`}
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}

export default function FloatingMenu({ constraintsRef }: { constraintsRef: React.RefObject<HTMLDivElement> }) {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    animationsEnabled, setAnimationsEnabled,
    snowEnabled, setSnowEnabled,
    rainEnabled, setRainEnabled,
    petalsEnabled, setPetalsEnabled,
    lettersEnabled, setLettersEnabled,
    tiltEnabled, setTiltEnabled,
    fourDEnabled, setFourDEnabled
  } = useAnimation();
  const { language, setLanguage, t } = useLanguage();

  const cycleLanguage = () => {
    const langs: Language[] = ['en', 'vi', 'ja', 'zh'];
    const nextIndex = (langs.indexOf(language) + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  const langDisplay = {
    'en': 'EN',
    'vi': 'VN',
    'ja': 'JP',
    'zh': 'CN'
  };

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragMomentum={false}
      className="absolute bottom-6 right-6 flex flex-col items-end gap-4 pointer-events-auto"
      style={{ zIndex: 100 }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-72 bg-zinc-900/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex flex-col gap-4 overflow-hidden relative"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-2 relative z-10">
              <h3 className="text-white font-black uppercase tracking-tight flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-400" />
                {t.ui.settings.title}
              </h3>
            </div>

            <div className="flex flex-col gap-2 relative z-10">
              <ToggleRow 
                label={t.ui.settings.webAnim} 
                desc={t.ui.settings.animDesc} 
                enabled={animationsEnabled} 
                setEnabled={setAnimationsEnabled} 
              />
              <div className="w-full h-px bg-white/5 my-1" />
              <ToggleRow 
                label={t.ui.settings.snow} 
                desc={t.ui.settings.snowDesc} 
                enabled={snowEnabled} 
                setEnabled={setSnowEnabled} 
              />
              <ToggleRow 
                label={t.ui.settings.rain} 
                desc={t.ui.settings.rainDesc} 
                enabled={rainEnabled} 
                setEnabled={setRainEnabled} 
              />
              <ToggleRow 
                label={t.ui.settings.petal} 
                desc={t.ui.settings.petalDesc} 
                enabled={petalsEnabled} 
                setEnabled={setPetalsEnabled} 
              />
              <ToggleRow 
                label={t.ui.settings.letters} 
                desc={t.ui.settings.lettersDesc} 
                enabled={lettersEnabled} 
                setEnabled={setLettersEnabled} 
              />
              <ToggleRow 
                label={t.ui.settings.tilt} 
                desc={t.ui.settings.tiltDesc} 
                enabled={tiltEnabled} 
                setEnabled={setTiltEnabled} 
              />
              <ToggleRow 
                label={t.ui.settings.fourD} 
                desc={t.ui.settings.fourDDesc} 
                enabled={fourDEnabled} 
                setEnabled={setFourDEnabled} 
              />
              <div className="w-full h-px bg-white/5 my-1" />
              <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/5 hover:bg-black/60 transition-colors">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm tracking-wide">{t.ui.settings.language}</span>
                  <span className="text-zinc-500 text-[11px] mt-0.5 uppercase tracking-wider">{t.ui.settings.langDesc}</span>
                </div>
                <button
                  onClick={cycleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs font-bold"
                >
                  <Languages size={14} />
                  {langDisplay[language]}
                </button>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest text-center mt-2 relative z-10">
              {t.ui.settings.warning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow"
      >
        {isOpen ? <X size={24} /> : <Settings size={24} />}
      </motion.button>
    </motion.div>
  );
}
