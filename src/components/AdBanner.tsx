import React, { useEffect, useRef } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdBannerProps {
  format?: 'native' | 'banner-728' | 'social-bar' | 'direct-cta';
  directLinkUrl?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format = 'native',
  directLinkUrl = '#',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamically inject Adsterra Native Ad script into the component lifecycle
  useEffect(() => {
    if (format !== 'native') return;

    const scriptSrc = 'https://brijmohan.org/21/3a604443ad36d86d2d1f80e17d7c66bb';
    
    // Check if script is already present in document
    let scriptElement = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.src = scriptSrc;
      scriptElement.async = true;
      scriptElement.setAttribute('data-cfasync', 'false');
      document.body.appendChild(scriptElement);
    }
  }, [format]);

  if (format === 'direct-cta') {
    return (
      <a
        href={directLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF007F] to-[#9B5CFF] hover:opacity-90 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-[#FF2D95]/25"
      >
        <span>⚡ Fast 4K Mirror (Direct)</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    );
  }

  if (format === 'banner-728') {
    return (
      <div className={`w-full my-6 flex flex-col items-center ${className}`}>
        <div className="w-full max-w-[728px] min-h-[90px] bg-[#14141D] border border-[#302333] hover:border-[#FF2D95]/40 rounded-xl p-2 flex flex-col items-center justify-center relative overflow-hidden transition">
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#A8A1B3]/60 mb-1">
            Advertisement &middot; Adsterra 728x90 / Responsive
          </div>
          <div className="flex items-center gap-4 text-xs text-[#A8A1B3]">
            <span className="text-[#FF2D95] font-semibold">Pink Aura Sponsor Stream</span>
            <span>&middot;</span>
            <span className="text-[11px] text-[#A8A1B3]/80">Connected with Adsterra network</span>
          </div>
        </div>
      </div>
    );
  }

  // Native In-Feed Adsterra Banner with user's exact container ID
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 ${className}`}>
      <div className="bg-[#14141D] border border-[#302333] rounded-2xl p-4 sm:p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 text-[10px] uppercase font-bold tracking-widest text-[#A8A1B3]">
          <span className="flex items-center gap-1.5 text-[#FF2D95]">
            <span className="w-2 h-2 rounded-full bg-[#FF2D95] animate-pulse"></span>
            Sponsored Native Discoveries
          </span>
          <span className="bg-[#101016] border border-[#302333] px-2 py-0.5 rounded text-[#A8A1B3]">
            Adsterra Native Ad
          </span>
        </div>

        {/* User's Exact Adsterra Container Target */}
        <div ref={containerRef} className="w-full min-h-[140px] flex flex-col justify-center">
          <div id="container-3a604443ad36d86d2d1f80e17d7c66bb" className="w-full text-center">
            {/* Fallback styling shown before Adsterra populates the container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-[#101016] border border-[#302333] rounded-xl p-3 flex flex-col justify-between"
                >
                  <div className="aspect-video bg-[#14141D] rounded-lg mb-2 relative overflow-hidden flex items-center justify-center border border-[#302333]/50">
                    <Sparkles className="w-4 h-4 text-[#FF2D95]" />
                  </div>
                  <div className="text-xs font-semibold text-[#F8F5FA] truncate">
                    Adsterra Native Stream #{item}
                  </div>
                  <div className="text-[10px] text-[#A8A1B3] mt-1">Sponsored content</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
