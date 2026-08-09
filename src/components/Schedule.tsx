import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import contentData from '../data/contentData.json';

type ScheduleEvent = {
  id: string;
  date: string;
  name: string;
  description: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function Schedule() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
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

      // Schedule Items Animation
      const items = itemsRef.current?.children;
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 75%',
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedEvent && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { scale: 0.95, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [selectedEvent]);

  const handleEventClick = (e: React.MouseEvent<HTMLDivElement>, event: ScheduleEvent) => {
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
          setSelectedEvent(event);
        }
      }
    );
  };

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100vh-5rem)] py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={headerRef} 
          className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tight mb-16 border-l-4 border-cyan-400 pl-6"
        >
          {contentData.schedule.title}
        </h2>

        <div ref={itemsRef} className="flex flex-col gap-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-cyan-400/50 before:to-transparent">
          {contentData.schedule.events.map((event, index) => (
            <div key={event.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-zinc-950 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
              
              {/* Content Card */}
              <div 
                onClick={(e) => handleEventClick(e, event)}
                className="relative cursor-pointer overflow-hidden w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-xl shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:border-cyan-400/50"
              >
                <div className="pointer-events-none">
                  <div className="text-cyan-400 font-bold tracking-widest text-sm mb-2">
                    {event.date}
                  </div>
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-3 uppercase italic">
                    {event.name}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedEvent(null)}
          />
          <div 
            ref={modalRef}
            className="relative w-full max-w-2xl bg-zinc-900/60 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col p-8 md:p-12"
          >
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="relative z-10 flex flex-col justify-center text-center">
              <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 drop-shadow-md">{selectedEvent.date}</p>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 drop-shadow-lg leading-tight italic uppercase">{selectedEvent.name}</h3>
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">{selectedEvent.description}</p>
              
              <div className="mt-8 flex justify-center">
                <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-full transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
