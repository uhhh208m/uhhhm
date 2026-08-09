import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import contentData from '../data/contentData.json';

gsap.registerPlugin(ScrollTrigger);

type Reward = {
  id: string;
  name: string;
  image: string;
  type: string;
};

export default function Rewards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedReward && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { scale: 0.95, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [selectedReward]);

  const handleRewardClick = (e: React.MouseEvent<HTMLDivElement>, reward: Reward) => {
    const card = e.currentTarget;
    
    // Create a light beam element
    const lightBeam = document.createElement('div');
    lightBeam.className = 'absolute top-0 left-0 h-[150%] w-24 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 -skew-x-12 blur-sm z-30 pointer-events-none transform -translate-y-10';
    card.appendChild(lightBeam);

    // Animate the light beam
    gsap.fromTo(lightBeam, 
      { x: -150 },
      {
        x: card.offsetWidth + 150,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          card.removeChild(lightBeam);
          setSelectedReward(reward);
        }
      }
    );
  };

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100vh-5rem)] py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #a855f7 0%, transparent 50%)' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 
          ref={headerRef} 
          className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tight mb-16 text-center"
        >
          {contentData.rewards.title}
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentData.rewards.items.map((reward) => (
            <div 
              key={reward.id} 
              onClick={(e) => handleRewardClick(e, reward)}
              className="group relative bg-zinc-900 border border-zinc-800 p-4 rounded-2xl overflow-hidden hover:border-cyan-400 transition-colors duration-500 cursor-pointer"
            >
              <div className="pointer-events-none">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6 bg-zinc-800">
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-zinc-950/80 backdrop-blur-sm border border-zinc-700 rounded-full text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    {reward.type}
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center pb-2">
                  <h3 className="text-xl text-white font-bold uppercase italic tracking-wide group-hover:text-cyan-300 transition-colors">
                    {reward.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedReward(null)}
          />
          <div 
            ref={modalRef}
            className="relative w-full max-w-lg bg-zinc-900/60 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col p-6"
          >
            <button 
              onClick={() => setSelectedReward(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-6 z-10">
              <img 
                src={selectedReward.image} 
                alt={selectedReward.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-50" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-zinc-950/80 backdrop-blur-sm border border-zinc-700 rounded-full text-xs font-bold text-cyan-300 uppercase tracking-wider">
                {selectedReward.type}
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center pb-2">
              <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg leading-tight italic uppercase mb-4">
                {selectedReward.name}
              </h3>
              
              <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                Nhận Ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
