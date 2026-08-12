import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, UserCircle, Globe, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import TiltCard from './TiltCard';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type ChatMessage = {
  id: string;
  senderName: string;
  senderColor: string;
  content: string;
  timestamp: number;
};

type Profile = {
  name: string;
  color: string;
};

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Connect to the same host as the Vite app
    const newSocket = io({
      path: "/socket.io",
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    newSocket.on("init", (data: { profile: Profile, history: ChatMessage[] }) => {
      setProfile(data.profile);
      setMessages(data.history);
      scrollToBottom();
    });

    newSocket.on("new_message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && socket) {
      socket.emit("send_message", inputValue);
      setInputValue('');
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-black overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950/60 via-black to-black" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-14rem)]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <Globe className="text-cyan-400 w-8 h-8 md:w-12 md:h-12" />
              {t.ui.chat.title}
            </h2>
            <p className="text-zinc-400 font-bold tracking-widest text-sm uppercase mt-2">
              {t.ui.chat.subtitle}
            </p>
          </div>
          
          {profile ? (
            <div className="flex items-center gap-3 bg-zinc-900/60 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: profile.color }} />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{t.ui.chat.identity}</span>
                <span className="text-sm font-bold text-white tracking-wide">{profile.name}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-bold">
              <Terminal className="w-4 h-4 animate-pulse" />
              {t.ui.chat.connecting}
            </div>
          )}
        </div>

        {/* Chat Area */}
        <TiltCard className="flex-1 min-h-0 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-center p-6 text-zinc-500 font-medium">
                {t.ui.chat.empty}
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isMe = profile?.name === msg.senderName;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={cn(
                      "flex flex-col max-w-[85%] md:max-w-[70%]",
                      isMe ? "self-end items-end" : "self-start items-start"
                    )}
                  >
                    {!isMe && (
                      <span className="text-xs font-bold mb-1 ml-2 tracking-wide" style={{ color: msg.senderColor }}>
                        {msg.senderName}
                      </span>
                    )}
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-sm md:text-base shadow-lg",
                      isMe 
                        ? "bg-white text-black rounded-tr-sm" 
                        : "bg-zinc-800/80 text-white border border-white/5 rounded-tl-sm backdrop-blur-md"
                    )}>
                      {msg.content}
                    </div>
                  </motion.div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/40 border-t border-white/10">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.ui.chat.placeholder}
                disabled={!isConnected}
                className="w-full bg-zinc-900/80 text-white placeholder-zinc-500 text-sm md:text-base px-6 py-4 pr-16 rounded-full border border-white/10 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all disabled:opacity-50"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || !isConnected}
                className="absolute right-2 p-3 bg-white text-black hover:bg-zinc-200 rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-white"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
