
import React, { useState, useEffect } from 'react';
import { X, Bot, Zap, ShieldCheck, Headphones, Mic, Volume2 } from 'lucide-react';

export const AIAvatarChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Configuration
  const BEYOND_PRESENCE_URL = "https://bey.chat/5af16319-57a0-474c-96f2-647a6fc3d573";

  useEffect(() => {
    if (isOpen && !isConnected) {
      setIsConnecting(true);
      // Simulating context syncing for the menu items
      const timer = setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isConnected]);

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end">
      {/* Compact Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[340px] h-[520px] bg-black rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden flex flex-col animate-slide-up origin-bottom-right">
          
          {/* Compact Floating Header */}
          <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full pointer-events-auto">
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                   <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[11px] text-white leading-none">QuickBite AI</h3>
                <span className="text-[8px] text-green-400 font-bold uppercase tracking-widest mt-0.5">Live</span>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors pointer-events-auto"
            >
              <X className="w-4 h-4 text-white/80" />
            </button>
          </div>

          {/* Avatar Interaction Area */}
          <div className="flex-1 bg-black relative">
            {isConnecting && (
                <div className="absolute inset-0 z-20 bg-gray-950 flex flex-col items-center justify-center text-center p-6">
                    <div className="relative w-16 h-16 mb-4">
                        <div className="absolute inset-0 border-3 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-3 border-t-primary rounded-full animate-spin"></div>
                        <Bot className="absolute inset-0 m-auto w-6 h-6 text-primary opacity-50" />
                    </div>
                    <h4 className="text-white text-base font-bold mb-1">Connecting</h4>
                    <p className="text-gray-500 text-[10px] font-medium tracking-wide">Syncing Menu & Combos...</p>
                </div>
            )}

            {isConnected ? (
                <iframe 
                    src={BEYOND_PRESENCE_URL} 
                    className="w-full h-full border-none animate-fade-in"
                    allow="camera; microphone; fullscreen; autoplay; display-capture"
                    title="QuickBite AI Assistant"
                ></iframe>
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-gray-900 to-black">
                    <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <Bot className="w-12 h-12 text-primary/20" />
                    </div>
                </div>
            )}

            {/* Compact Overlays */}
            {isConnected && (
              <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between items-center pointer-events-none">
                 <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl pointer-events-auto">
                    <Mic className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[9px] font-bold text-white/80 uppercase tracking-wider">Voice</span>
                 </div>
                 <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl pointer-events-auto">
                    <Volume2 className="w-3.5 h-3.5 text-white/60" />
                    <span className="text-[9px] font-bold text-white/80 uppercase tracking-wider">Audio</span>
                 </div>
              </div>
            )}
          </div>

          {/* Minimal Bottom Strip */}
          <div className="p-3 bg-black border-t border-white/5 flex items-center justify-center">
             <p className="text-[9px] text-gray-500 font-bold tracking-widest uppercase flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-primary" /> 
                Menu Integrated AI Assistant
             </p>
          </div>
        </div>
      )}

      {/* Smaller Action Button */}
      <div className="relative group">
          <div className={`absolute inset-0 rounded-full bg-primary/20 animate-ping -z-10 ${isOpen ? 'hidden' : 'block'}`}></div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-90 relative overflow-hidden ${isOpen ? 'bg-white' : 'bg-primary'}`}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <div className="flex flex-col items-center">
                <Bot className="w-7 h-7 text-white" />
                <div className="w-1 h-1 bg-white rounded-full animate-bounce mt-0.5"></div>
              </div>
            )}
          </button>

          {!isOpen && (
            <div className="absolute bottom-full right-0 mb-4 bg-white px-4 py-3 rounded-2xl shadow-2xl border border-gray-100 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        <span className="text-xs font-bold text-gray-900">Talk to AI Concierge</span>
                    </div>
                </div>
                <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100"></div>
            </div>
          )}
      </div>
    </div>
  );
};
