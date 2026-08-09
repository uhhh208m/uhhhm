import React, { useState } from 'react';
import contentData from '../data/contentData.json';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<{ title: string; content: string } | null>(null);
  const [showDevInfo, setShowDevInfo] = useState(false);

  return (
    <>
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div 
            className="text-zinc-500 text-sm font-medium text-center md:text-left max-w-md cursor-pointer hover:text-cyan-400 transition-colors duration-300"
            onClick={() => setShowDevInfo(true)}
          >
            {contentData.footer.text}
          </div>
          
          <ul className="flex flex-wrap justify-center gap-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            {contentData.footer.links.map((link, index) => (
              <li key={index}>
                <button 
                  onClick={() => setActiveModal(link)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {link.title}
                </button>
              </li>
            ))}
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
              <h3 className="text-xl font-bold text-cyan-400 uppercase italic tracking-tight mb-4 pr-8">
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
              className="relative w-full max-w-lg bg-zinc-900/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col items-center text-center"
            >
              <button 
                onClick={() => setShowDevInfo(false)}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <span className="text-3xl font-black text-cyan-400">Dev</span>
              </div>
              
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2 drop-shadow-lg">
                Thông Tin Website
              </h3>
              <p className="text-cyan-400 font-bold tracking-widest text-sm uppercase mb-6">
                Phiên Bản 1.0.0
              </p>
              
              <div className="text-zinc-300 leading-relaxed text-sm md:text-base space-y-4">
                <p>
                  Một sản phẩm được thiết kế độc quyền với giao diện <span className="text-white font-bold">Glassmorphism</span> và <span className="text-white font-bold">Cyberpunk</span>.
                </p>
                <p>
                  Phát triển bởi lập trình viên <span className="text-cyan-400 font-bold">uhhhm</span>. Mọi bản quyền hình ảnh, sự kiện và nội dung đều tuân thủ theo các quy định của ban tổ chức.
                </p>
              </div>
              
              <div className="mt-8 w-full border-t border-white/10 pt-6">
                <p className="text-xs text-zinc-500 font-medium">© 2026 Bản quyền thuộc về uhhhm. All rights reserved.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
