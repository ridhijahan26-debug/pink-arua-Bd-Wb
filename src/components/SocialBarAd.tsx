import React, { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface SocialBarAdProps {
  directLinkUrl?: string;
}

export const SocialBarAd: React.FC<SocialBarAdProps> = ({ directLinkUrl = '#' }) => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-4 right-4 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-80 bg-[#14141D]/95 backdrop-blur-md border border-[#FF2D95]/50 rounded-2xl p-3.5 shadow-2xl shadow-[#FF2D95]/20 animate-fade-in transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF007F] to-[#9B5CFF] flex items-center justify-center shrink-0 pabd-glow-pink">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] uppercase font-bold text-[#FF2D95] tracking-wider">Adsterra Social Bar</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D95] animate-ping"></span>
            </div>
            <h4 className="text-xs font-bold text-white leading-tight">
              Exclusive 4K Secret Content Available
            </h4>
          </div>
        </div>

        <button
          onClick={() => setClosed(true)}
          className="text-[#A8A1B3] hover:text-white p-1 rounded-md transition"
          aria-label="Close social bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#302333]">
        <span className="text-[10px] text-[#A8A1B3]">Sponsored partner stream</span>
        <a
          href={directLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF2D95] hover:text-white transition"
        >
          <span>Explore Now</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
