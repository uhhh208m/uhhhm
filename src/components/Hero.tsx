import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import contentData from '../data/contentData.json';

type Article = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background subtle zoom
      gsap.from(bgRef.current, {
        scale: 1.1,
        duration: 3,
        ease: 'power2.out',
      });

      // Title reveal animation
      gsap.fromTo(titleRef.current, 
        { y: 40, opacity: 0, scale: 0.95, letterSpacing: "-0.05em" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          letterSpacing: "normal",
          duration: 1.5,
          ease: 'expo.out',
          delay: 0.3,
        }
      );

      // Cards stagger reveal
      const cards = gridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(cards, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedArticle && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { scale: 0.95, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [selectedArticle]);

  const handleArticleClick = (e: React.MouseEvent<HTMLDivElement>, article: Article) => {
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
          setSelectedArticle(article);
        }
      }
    );
  };

  return (
    <section ref={heroRef} className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Overlay */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-zinc-950"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-zinc-950" />

      {/* Content */}
      <div 
        className="relative z-20 flex flex-col w-full max-w-7xl mx-auto px-6 mt-20"
      >
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-10 text-center drop-shadow-2xl">
          Sự Kiện
        </h2>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {contentData.articles?.map((article) => (
          <div 
            key={article.id} 
            onClick={(e) => handleArticleClick(e, article)}
            className="relative group flex flex-col overflow-hidden rounded-3xl bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-[0_8px_32px_rgba(34,211,238,0.2)] hover:-translate-y-2"
          >
            <div className="aspect-[4/3] overflow-hidden shrink-0">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 p-6 flex flex-col pointer-events-none">
              <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2 drop-shadow-md">{article.date}</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors drop-shadow-lg">{article.title}</h3>
              <p className="text-zinc-300 text-sm line-clamp-2 drop-shadow-md">{article.summary}</p>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedArticle(null)}
          />
          <div 
            ref={modalRef}
            className="relative w-full max-w-4xl bg-zinc-900/60 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col md:flex-row"
          >
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-full md:w-2/5 h-64 md:h-auto shrink-0 relative">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="w-full p-8 md:p-12 flex flex-col justify-center relative z-10">
              <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 drop-shadow-md">{selectedArticle.date}</p>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 drop-shadow-lg leading-tight">{selectedArticle.title}</h3>
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">{selectedArticle.summary}</p>
              
              <div className="mt-8">
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
