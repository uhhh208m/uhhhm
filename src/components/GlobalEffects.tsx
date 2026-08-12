import React, { useMemo } from 'react';
import { useAnimation } from '../context/AnimationContext';

export default function GlobalEffects() {
  const { snowEnabled, rainEnabled, petalsEnabled, lettersEnabled } = useAnimation();
  
  // Memoize random letters so they don't change on every re-render (which causes flickering if state updates)
  // Actually, keeping them dynamic is fine, but to be stable during component lifetime:
  const randomChars = useMemo(() => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 40 }).map(() => charset[Math.floor(Math.random() * charset.length)]);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      <style>{`
        @keyframes fall-snow {
          0% { transform: translateY(-10vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(20px); opacity: 0; }
        }
        @keyframes fall-rain {
          0% { transform: translateY(-10vh) rotate(15deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(15deg); opacity: 0; }
        }
        @keyframes fall-petals {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(-50px) rotate(720deg) scale(1.2); opacity: 0; }
        }
        @keyframes fall-letters {
          0% { transform: translateY(-10vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        .particle { position: absolute; top: -10%; }
      `}</style>
      
      {snowEnabled && Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={`snow-${i}`}
          className="particle w-1.5 h-1.5 bg-white rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `fall-snow ${Math.random() * 5 + 5}s linear infinite`,
            animationDelay: `-${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.3
          }}
        />
      ))}

      {rainEnabled && Array.from({ length: 80 }).map((_, i) => (
        <div 
          key={`rain-${i}`}
          className="particle w-[1px] h-12 bg-gradient-to-b from-transparent via-blue-200/50 to-white/80"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `fall-rain ${Math.random() * 0.5 + 0.5}s linear infinite`,
            animationDelay: `-${Math.random()}s`
          }}
        />
      ))}

      {petalsEnabled && Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={`petal-${i}`}
          className="particle w-3 h-3 bg-pink-300/80 rounded-tl-full rounded-br-full shadow-[0_0_10px_rgba(244,114,182,0.4)]"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `fall-petals ${Math.random() * 6 + 6}s ease-in-out infinite`,
            animationDelay: `-${Math.random() * 6}s`,
          }}
        />
      ))}
      
      {lettersEnabled && randomChars.map((char, i) => (
        <div 
          key={`letter-${i}`}
          className="particle text-cyan-400 font-mono font-bold text-lg md:text-xl shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `fall-letters ${Math.random() * 4 + 4}s linear infinite`,
            animationDelay: `-${Math.random() * 4}s`,
            opacity: Math.random() * 0.5 + 0.3,
            textShadow: '0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4)'
          }}
        >
          {char}
        </div>
      ))}
    </div>
  );
}
