import React, { createContext, useContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { MotionConfig } from 'motion/react';

type AnimationContextType = {
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  snowEnabled: boolean;
  setSnowEnabled: (enabled: boolean) => void;
  rainEnabled: boolean;
  setRainEnabled: (enabled: boolean) => void;
  petalsEnabled: boolean;
  setPetalsEnabled: (enabled: boolean) => void;
  lettersEnabled: boolean;
  setLettersEnabled: (enabled: boolean) => void;
  tiltEnabled: boolean;
  setTiltEnabled: (enabled: boolean) => void;
  fourDEnabled: boolean;
  setFourDEnabled: (enabled: boolean) => void;
};

const AnimationContext = createContext<AnimationContextType>({
  animationsEnabled: true,
  setAnimationsEnabled: () => {},
  snowEnabled: false,
  setSnowEnabled: () => {},
  rainEnabled: false,
  setRainEnabled: () => {},
  petalsEnabled: false,
  setPetalsEnabled: () => {},
  lettersEnabled: false,
  setLettersEnabled: () => {},
  tiltEnabled: false,
  setTiltEnabled: () => {},
  fourDEnabled: false,
  setFourDEnabled: () => {},
});

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [snowEnabled, setSnowEnabled] = useState(false);
  const [rainEnabled, setRainEnabled] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(false);
  const [lettersEnabled, setLettersEnabled] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(true);
  const [fourDEnabled, setFourDEnabled] = useState(false);

  // Disable GSAP animations globally by forcing them to complete instantly
  useEffect(() => {
    if (!animationsEnabled) {
      // Force all GSAP animations to complete instantly
      gsap.globalTimeline.timeScale(9999);
    } else {
      gsap.globalTimeline.timeScale(1);
    }
  }, [animationsEnabled]);

  return (
    <AnimationContext.Provider value={{ 
      animationsEnabled, setAnimationsEnabled,
      snowEnabled, setSnowEnabled,
      rainEnabled, setRainEnabled,
      petalsEnabled, setPetalsEnabled,
      lettersEnabled, setLettersEnabled,
      tiltEnabled, setTiltEnabled,
      fourDEnabled, setFourDEnabled
    }}>
      <MotionConfig transition={animationsEnabled ? undefined : { duration: 0 }}>
        {children}
      </MotionConfig>
    </AnimationContext.Provider>
  );
};
