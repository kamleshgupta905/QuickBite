
import React, { useState, useEffect } from 'react';
import { X, Bot, Zap, ShieldCheck, Headphones, Mic, Volume2, Sparkles, MessageSquareQuote } from 'lucide-react';

export const AIAvatarChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Beyond Presence Configuration for QuickBite
  // Ensure the ID matches your specific Beyond Presence avatar instance
  const BEYOND_PRESENCE_URL = "https://bey.chat/5af16319-57a0-474c-96f2-647a6fc3d573";

  useEffect(() => {
    if (isOpen && !isConnected) {
      setIsConnecting(true);
      const timer = setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isConnected]);

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end select-none">
      {/* Premium Avatar Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[300px] h-[500px] bg-neutral-950 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden flex flex-col animate-slide-up origin-bottom-right">
          
          {/* Transparent Floating Header */}
          <div className="absolute top-0 left-0 right-0 z-30 p-5 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-2xl border border-white/20 px-4 py-2 rounded-full pointer-events-auto shadow-xl">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                   <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[11px] text-white leading-none tracking-tight">AI Concierge</h3>
                <span className="text-[7px] text-primary font-bold uppercase tracking-widest mt-1">Hinglish Core Active</span>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 bg-black/60 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all pointer-events-auto hover:rotate-90"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Avatar Interaction Frame */}
          <div className="flex-1 bg-neutral-900 relative">
            {isConnecting && (
                <div className="absolute inset-0 z-20 bg-neutral-950 flex flex-col items-center justify-center text-center p-8">
                    <div className="relative w-16 h-16 mb-6">
                        <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-2 border-t-primary rounded-full animate-spin"></div>
                        <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <h4 className="text-white text-sm font-bold mb-2">Connecting to Concierge</h4>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Loading Knowledge Base...</p>
                    
                    <div className="mt-8 flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce delay-${i}00`}></div>
                        ))}
                    </div>
                </div>
            )}

            {isConnected ? (
                <iframe 
                    src={BEYOND_PRESENCE_URL} 
                    className="w-full h-full border-none animate-fade-in"
                    allow="camera; microphone; fullscreen; autoplay; display-capture"
                    title="QuickBite AI Concierge"
                ></iframe>
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-neutral-900 to-black">
                    <Bot className="w-12 h-12 text-white/5" />
                </div>
            )}

            {/* Micro Interaction Overlays */}
            {isConnected && (
              <div className="absolute bottom-6 left-0 right-0 px-5 flex justify-between items-center pointer-events-none">
                 <div className="flex items-center gap-2 bg-primary/80 backdrop-blur-lg border border-white/20 px-3 py-1.5 rounded-xl pointer-events-auto shadow-lg">
                    <Mic className="w-3.5 h-3.5 text-white" />
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">Listening</span>
                 </div>
                 <div className="w-10 h-10 bg-black/60 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center pointer-events-auto shadow-lg hover:bg-white/10 transition-colors">
                    <Volume2 className="w-4 h-4 text-white/70" />
                 </div>
              </div>
            )}
          </div>

          {/* Minimal Bottom Status Bar */}
          <div className="py-3 bg-black border-t border-white/5 flex items-center justify-center gap-4">
             <div className="flex items-center gap-2 opacity-50">
                <ShieldCheck className="w-3 h-3 text-primary" /> 
                <p className="text-[8px] text-white font-bold tracking-[0.2em] uppercase">Encrypted</p>
             </div>
             <div className="flex items-center gap-2 opacity-50">
                <MessageSquareQuote className="w-3 h-3 text-blue-400" /> 
                <p className="text-[8px] text-white font-bold tracking-[0.2em] uppercase">Hinglish</p>
             </div>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <div className="relative group">
          <div className={`absolute -inset-1 rounded-full bg-primary/20 animate-pulse -z-10 ${isOpen ? 'hidden' : 'block'}`}></div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(255,76,36,0.4)] transition-all duration-500 transform hover:scale-110 active:scale-90 relative overflow-hidden ${isOpen ? 'bg-white' : 'bg-primary'}`}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <div className="flex flex-col items-center">
                <Bot className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
                <div className="flex gap-1 mt-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
          </button>

          {!isOpen && (
            <div className="absolute bottom-full right-0 mb-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center gap-4">
                    <div className="bg-red-50 p-2 rounded-xl">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-gray-900 tracking-tight leading-none">QuickBite Concierge</span>
                        <span className="text-[9px] text-green-600 font-bold uppercase mt-1">Aapki madad ke liye tayyar!</span>
                    </div>
                </div>
                {/* Speech Bubble Tail */}
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100"></div>
            </div>
          )}
      </div>
    </div>
  );
};
