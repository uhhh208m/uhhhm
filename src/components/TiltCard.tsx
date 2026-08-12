import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { useAnimation } from '../context/AnimationContext';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  key?: React.Key;
};

export default function TiltCard({ children, className = '', onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { tiltEnabled, fourDEnabled } = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // 4D Glare logic
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    if (tiltEnabled) {
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
    
    if (fourDEnabled) {
      glareX.set((mouseX / width) * 100);
      glareY.set((mouseY / height) * 100);
      glareOpacity.set(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{ perspective: "1000px" }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={fourDEnabled && !isHovered ? { y: [0, -10, 0] } : { y: 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          rotateX: tiltEnabled ? rotateX : 0,
          rotateY: tiltEnabled ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {/* Holographic Glare Layer */}
        {fourDEnabled && (
          <motion.div 
            className="absolute inset-0 z-50 pointer-events-none rounded-3xl mix-blend-overlay"
            style={{
              background: glareBackground,
              opacity: glareOpacity,
              transition: "opacity 0.3s ease"
            }}
          />
        )}
        
        <div 
          style={{ transform: tiltEnabled || fourDEnabled ? "translateZ(40px)" : "none", transition: "transform 0.3s ease" }}
          className="w-full h-full"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

